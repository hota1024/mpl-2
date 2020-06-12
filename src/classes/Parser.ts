import { IParser } from '../interfaces'
import chalk from 'chalk'
import {
  Token,
  Root,
  StatementNode,
  IfStatement,
  ExpressionNode,
  SymbolToken,
  UnaryExpression,
  IdentifierExpression,
  CallExpression,
  BlockStatement,
  VariableDeclarationStatement,
  FunctionDeclarationStatement,
  Parameter,
} from '../types'
import { Walker } from './Walker'
import { Loc } from './Loc'
import { ExpressionStatement } from '../types/nodes/ExpressionStatement'
import { Lexer } from './Lexer'

/*
 * TokenWalker type.
 */
export type TokenWalker = Walker<Token>

/*
 * Parser class.
 */
export class Parser implements IParser {
  parse(tokens: Token[]): Root {
    const walker = new Walker(tokens, -1)

    return this.parseRoot(walker)
  }

  /**
   * Parse root node.
   *
   * @param walker Token walker.
   */
  private parseRoot(walker: TokenWalker): Root {
    const statements: StatementNode[] = []

    while (!walker.done() && walker.peek()) {
      statements.push(this.parseStatement(walker))
      const peek = walker.peek()
      if (peek && peek.kind === 'new_line') {
        walker.next()
      }
    }

    return {
      kind: 'root',
      statements,
      loc: statements.reduce((loc, node) => loc.merge(node.loc), new Loc(0, 0)),
    }
  }

  /**
   * Parse statement.
   *
   * @param walker Token walker.
   */
  private parseStatement(walker: TokenWalker): StatementNode {
    const peek = walker.peek()

    if (!peek) {
      throw new Error('no statement')
    }

    if (peek.kind === 'left_curly_braces') {
      return this.parseBlockStatement(walker)
    }

    if (peek.kind === 'if') {
      return this.parseIfStatement(walker)
    }

    if (peek.kind === 'let' || peek.kind === 'const') {
      return this.parseVariableDeclarationStatement(walker)
    }

    if (peek.kind === 'fn') {
      return this.parseFunctionDeclarationStatement(walker)
    }

    return this.parseExpressionStatement(walker)
  }

  private parseFunctionDeclarationStatement(
    walker: TokenWalker
  ): FunctionDeclarationStatement {
    walker.next()
    const declarationToken = walker.value()

    walker.next()
    const name = this.parseIdentifier(walker)

    walker.next()
    if (walker.value().kind !== 'left_parenthesis') {
      throw new Error('unexpected token')
    }

    const parameters: Parameter[] = []

    while (true as const) {
      const peek = walker.peek()

      if (!peek) {
        throw new Error('peek error')
      }

      if (peek.kind === 'right_parenthesis') {
        break
      }

      if (peek.kind === 'comma' || peek.kind === 'new_line') {
        walker.next()
      }

      walker.next()
      const identifier = this.parseIdentifier(walker)
      parameters.push({
        kind: 'parameter',
        name: identifier,
        loc: identifier.loc,
      })
    }
    walker.next()

    const body = this.parseBlockStatement(walker)

    return {
      kind: 'function_declaration_statement',
      name,
      parameters,
      body,
      loc: declarationToken.loc.merge(walker.value().loc),
    }
  }

  /**
   * Parse variable declaration statement.
   *
   * @param walker Token walker.
   */
  private parseVariableDeclarationStatement(
    walker: TokenWalker
  ): VariableDeclarationStatement {
    walker.next()
    const declarationToken = walker.value()
    const name = this.parseIdentifier(walker)

    const peek = walker.peek()

    if (peek && peek.kind === 'equals') {
      walker.next()
      const initializer = this.parseExpression(walker)

      return {
        kind: 'variable_declaration_statement',
        declaratoin: declarationToken,
        name,
        loc: declarationToken.loc.merge(name.loc),
        initializer,
      }
    }

    return {
      kind: 'variable_declaration_statement',
      declaratoin: declarationToken,
      name,
      loc: declarationToken.loc.merge(name.loc),
    }
  }

  /**
   * Parse `if` statement.
   *
   * @param walker Token walker.
   */
  private parseIfStatement(walker: TokenWalker): IfStatement {
    walker.next()
    const ifToken = walker.value()

    const expression = this.parseExpression(walker)
    const thenStatement = this.parseBlockStatement(walker)

    const peek = walker.peek()

    if (peek && peek.kind === 'else') {
      walker.next()
      const elseStatement = this.parseStatement(walker)

      if (
        elseStatement.kind !== 'block_statement' &&
        elseStatement.kind !== 'if_statement'
      ) {
        throw new Error('invalid else statement')
      }

      return {
        kind: 'if_statement',
        condition: expression,
        then: thenStatement,
        else: elseStatement,
        loc: thenStatement.loc.merge(ifToken.loc),
      }
    }

    return {
      kind: 'if_statement',
      condition: expression,
      then: thenStatement,
      loc: thenStatement.loc.merge(ifToken.loc),
    }
  }

  /**
   * Parse block statement.
   *
   * @param walker Token walker.
   */
  private parseBlockStatement(walker: TokenWalker): BlockStatement {
    const body: StatementNode[] = []
    walker.next()

    while (true as const) {
      const peek = walker.peek()
      if (!peek) {
        throw new Error('peek error')
      }

      if (peek.kind === 'new_line') {
        walker.next()
      } else if (peek.kind === 'right_curly_braces') {
        walker.next()
        break
      }

      body.push(this.parseStatement(walker))
    }

    return {
      kind: 'block_statement',
      body: body,
      loc: body.reduce((loc, node) => loc.merge(node.loc), new Loc(0, 0)),
    }
  }

  /**
   * Parse expression statement.
   *
   * @param walker Token walker.
   */
  private parseExpressionStatement(walker: TokenWalker): ExpressionStatement {
    const expression = this.parseExpression(walker)

    return {
      kind: 'expression_statement',
      expression,
      loc: expression.loc,
    }
  }

  /**
   * Parse expression node.
   *
   * @param walker Token walker.
   */
  private parseExpression(walker: TokenWalker): ExpressionNode {
    return this.parseExpressionSubstitution(walker)
  }

  /**
   * Parse `a = b` and `a += b` and `a -= b` and `a *= b` and `a **= b` and `a /= b` and `a %= b` expression.
   *
   * @param walker Token walker.
   */
  private parseExpressionSubstitution(walker: TokenWalker): ExpressionNode {
    return this.parseBinaryExpression(
      walker,
      this.parseExpressionLogicalOr.bind(this),
      ({ kind }) =>
        kind === 'equals' ||
        kind === 'plus_equals' ||
        kind === 'minus_equals' ||
        kind === 'asterisk_equals' ||
        kind === 'asterisk_asterisk_equals' ||
        kind === 'slash_equals' ||
        kind === 'percent_equals'
    )
  }

  /**
   * Parse `a || b` expression.
   * @param walker Token walker.
   */
  private parseExpressionLogicalOr(walker: TokenWalker): ExpressionNode {
    return this.parseBinaryExpression(
      walker,
      this.parseExpressionLogicalAnd.bind(this),
      ({ kind }) => kind === 'bar_bar'
    )
  }

  /**
   * Parse `a && b` expression.
   * @param walker Token walker.
   */
  private parseExpressionLogicalAnd(walker: TokenWalker): ExpressionNode {
    return this.parseBinaryExpression(
      walker,
      this.parseExpressionEquality.bind(this),
      ({ kind }) => kind === 'ampersand_ampersand'
    )
  }

  /**
   * Parse `a == b` and `a != b` expression.
   * @param walker Token walker.
   */
  private parseExpressionEquality(walker: TokenWalker): ExpressionNode {
    return this.parseBinaryExpression(
      walker,
      this.parseExpressionRelational.bind(this),
      ({ kind }) => kind === 'equals_equals' || kind === 'exclamation_equals'
    )
  }

  /**
   * Parse `a == b` and `a != b` expression.
   * @param walker Token walker.
   */
  private parseExpressionRelational(walker: TokenWalker): ExpressionNode {
    return this.parseBinaryExpression(
      walker,
      this.parseExpressionPlusAndMinus.bind(this),
      ({ kind }) =>
        kind === 'greater_than' ||
        kind === 'greater_than_equals' ||
        kind === 'less_than' ||
        kind === 'less_than_equals'
    )
  }

  /**
   * Parse `a + b` and `a - b` expression.
   *
   * @param walker Token walker.
   */
  private parseExpressionPlusAndMinus(walker: TokenWalker): ExpressionNode {
    return this.parseBinaryExpression(
      walker,
      this.parseExpressionMultiplicationAndDivisonAndPercent.bind(this),
      ({ kind }) => kind === 'plus' || kind === 'minus'
    )
  }

  /**
   * Parse `a * b` and `a / b` and `a % b` expression.
   *
   * @param walker Token walker.
   */
  private parseExpressionMultiplicationAndDivisonAndPercent(
    walker: TokenWalker
  ): ExpressionNode {
    return this.parseBinaryExpression(
      walker,
      this.parseExpressionExponentiation.bind(this),
      ({ kind }) =>
        kind === 'asterisk' || kind === 'slash' || kind === 'percent'
    )
  }

  /**
   * Parse `a ** b` expression.
   *
   * @param walker Token walker.
   */
  private parseExpressionExponentiation(walker: TokenWalker): ExpressionNode {
    return this.parseBinaryExpression(
      walker,
      this.parseExpressionLiteralPrefix.bind(this),
      ({ kind }) => kind === 'asterisk_asterisk'
    )
  }

  /**
   * Parse binary expression.
   *
   * @param walker Token walker.
   * @param subParser Sub parser.
   * @param operatorChecker Operator checker.
   */
  private parseBinaryExpression(
    walker: TokenWalker,
    subParser: (walker: TokenWalker) => ExpressionNode,
    operatorChecker: (token: Token) => boolean
  ) {
    let expression = subParser(walker)

    while (true as const) {
      const peek = walker.peek()

      if (!peek) {
        return expression
      }

      if (operatorChecker(peek)) {
        walker.next()
        const right = subParser(walker)

        expression = {
          kind: 'binary_expression',
          operator: peek,
          left: expression,
          right,
          loc: expression.loc.merge(right.loc),
        }
      } else {
        return expression
      }
    }
  }

  /**
   * Parse `+a` and `-a` and `!a` expression.
   *
   * @param walker Token walker.
   */
  private parseExpressionLiteralPrefix(walker: TokenWalker): ExpressionNode {
    const peek = walker.peek()

    if (peek) {
      if (
        peek.kind === 'plus' ||
        peek.kind === 'minus' ||
        peek.kind === 'exclamation_equals'
      ) {
        walker.next()
        const node = this.parseAtom(walker)

        return {
          kind: 'unary_expression',
          operator: peek,
          node,
          loc: peek.loc.merge(node.loc),
        }
      } else {
        return this.parseAtom(walker)
      }
    } else {
      throw new Error('peek error')
    }
  }

  /**
   * Parse atoms.
   *
   * @param walker Token walker.
   */
  private parseAtom(walker: TokenWalker): ExpressionNode {
    const token = walker.next()

    if (!token) {
      throw new Error('peek error')
    }

    if (token.kind === 'numeric_literal') {
      return {
        kind: 'numeric_literal_expression',
        value: token.value,
        loc: token.loc,
      }
    }

    if (token.kind === 'string_literal') {
      return {
        kind: 'string_literal_expression',
        value: token.value,
        loc: token.loc,
      }
    }

    if (token.kind === 'boolean_literal') {
      return {
        kind: 'boolean_literal_expression',
        value: token.value,
        loc: token.loc,
      }
    }

    if (token.kind === 'identifier') {
      const identifier = this.parseIdentifier(walker)

      const peek = walker.peek()

      if (peek && peek.kind === 'left_parenthesis') {
        const args: ExpressionNode[] = []
        let callExpression: CallExpression
        walker.next()

        while (true as const) {
          const peek = walker.peek()

          if (!peek) {
            throw new Error('peek error')
          }

          if (peek.kind === 'right_parenthesis') {
            walker.next()

            callExpression = {
              kind: 'call_expression',
              callee: identifier,
              arguments: args,
              loc: identifier.loc.merge(walker.value().loc),
            }

            break
          } else if (peek.kind === 'comma' || peek.kind === 'new_line') {
            walker.next()
          }

          const arg = this.parseExpression(walker)
          if (arg) {
            args.push(arg)
          }
        }

        return callExpression
      }

      return identifier
    }

    if (token.kind === 'left_parenthesis') {
      const expression = this.parseExpression(walker)
      const token = walker.value()

      if (token.kind === 'right_parenthesis') {
        return expression
      }

      throw new Error('missing )')
    }
  }

  /**
   * Parse identifier.
   *
   * @param walker Token walker.
   */
  private parseIdentifier(walker: TokenWalker): IdentifierExpression {
    const token = walker.value()

    if (token.kind !== 'identifier') {
      throw new Error('no identifier')
    }

    const identifierToken = token
    const identifier: IdentifierExpression = {
      kind: 'identifier_expression',
      identifier: token.identifier,
      loc: identifierToken.loc,
    }

    return identifier
  }
}

class Logger {
  constructor(private ignoreKeys: string[] = []) {}

  log(object: unknown): void {
    console.log(this.getObjectString(object, 0))
  }

  private getObjectString(object: unknown, offset: number, keyRight = false) {
    if (typeof object === 'number') {
      return chalk.blue(object)
    }

    if (typeof object === 'boolean') {
      return chalk.blue(object)
    }

    if (typeof object === 'string') {
      return chalk.red(`"${object}"`)
    }

    if (Array.isArray(object)) {
      let string = (keyRight ? '' : this.getSpaces(offset)) + '[\n'

      Object.keys(object).forEach((key) => {
        if (this.ignoreKeys.find((k) => k === key)) {
          return
        }
        string += this.getObjectString(object[key], offset + 1)
        string += '\n'
      })

      string += this.getSpaces(offset) + ']'
      return string
    }

    if (typeof object === 'object') {
      let string = (keyRight ? '' : this.getSpaces(offset)) + '{\n'

      Object.keys(object).forEach((key) => {
        if (this.ignoreKeys.find((k) => k === key)) {
          return
        }
        string += this.getSpaces(offset + 1) + chalk.green(key) + ' '
        string += this.getObjectString(object[key], offset + 1, true)
        string += '\n'
      })

      string += this.getSpaces(offset) + '}'
      return string
    }

    if (typeof object === 'undefined') {
      return chalk.grey('undefined')
    }

    return chalk.red.bold('<error>')
  }

  private getSpaces(offset: number) {
    let string = ''
    const colors = [chalk.gray]
    const space = '¬'

    for (let i = 0; i < offset; ++i) {
      string += colors[i % colors.length](space)
    }

    return string
  }
}

console.clear()
const lexer = new Lexer()
const parser = new Parser()
const logger = new Logger(['loc'])
const source = 'fn test(a, b) { print("Hello world") }'

console.log('============Input===========')
console.log('> Input:', source)
console.log()

console.log('==========Tokenize==========')
const tokens = lexer.tokenize(source)
logger.log(tokens)
console.log()

console.log('============Parse===========')
const ast = parser.parse(tokens)
logger.log(ast)
console.log()
