import { IEvaluator, IRuntime } from '../interfaces'
import {
  KuroType,
  Node,
  ExpressionNode,
  BinaryExpression,
  Variable,
  VariableDeclarationStatement,
  IfStatement,
  BlockStatement,
  WhileStatement,
  FunctionDeclarationStatement,
} from '../types'
import { Scope } from './Scope'
import { ExpressionStatement } from '../types/nodes/ExpressionStatement'
import { Runtime } from './Runtime'

/*
 * Evaluator class.
 */
export class Evaluator implements IEvaluator {
  /**
   * Runtime.
   */
  readonly runtime: IRuntime

  /**
   * Evaluator constructor.
   *
   * @param runtime Runtime.
   */
  constructor(runtime?: IRuntime) {
    if (runtime) {
      this.runtime = runtime
    } else {
      this.runtime = new Runtime()
    }
  }

  evaluate(ast: Node): KuroType {
    this.runtime.onStart()
    const scope = this.runtime.buildScope()

    const result = this.evaluateAST(ast, scope)

    this.runtime.onEnd()

    return result
  }

  /**
   * Evaluate AST.
   *
   * @param ast AST.
   * @param scope Scope.
   */
  private evaluateAST(ast: Node, scope: Scope): KuroType {
    if (ast.kind === 'root') {
      let lastValue: KuroType

      for (const statement of ast.statements) {
        lastValue = this.evaluateAST(statement, scope)
      }

      return lastValue
    }

    if (ast.kind === 'block_statement') {
      return this.evaluateBlockStatement(ast, scope)
    }

    if (ast.kind === 'expression_statement') {
      return this.evaluateExpressionStatement(ast, scope)
    }

    if (ast.kind === 'variable_declaration_statement') {
      return this.evaluateVariableDeclarationStatement(ast, scope)
    }

    if (ast.kind === 'if_statement') {
      return this.evaluateIfStatement(ast, scope)
    }

    if (ast.kind === 'while_statement') {
      this.evaluateWhileStatement(ast, scope)
    }

    if (ast.kind === 'function_declaration_statement') {
      this.evaluateFnctionDeclarationStatement(ast, scope)
    }
  }

  /**
   * Evaluate function declaration statement.
   *
   * @param ast AST.
   * @param scope Scope.
   */
  private evaluateFnctionDeclarationStatement(
    ast: FunctionDeclarationStatement,
    scope: Scope
  ) {
    const jsFunc = this.createJavaScriptFunction(ast, scope)

    scope.addFunction({
      name: ast.name.identifier,
      call: jsFunc,
    })
  }

  /**
   * Create JavaScript function from AST.
   *
   * @param ast AST.
   * @param scope Scope.
   */
  private createJavaScriptFunction(
    ast: FunctionDeclarationStatement,
    scope: Scope
  ) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return (...args: unknown[]) => {
      const subScope = new Scope()
      subScope.setParent(scope)

      for (const [key, param] of Object.entries(ast.parameters)) {
        subScope.addVariable({
          name: param.name.identifier,
          value: args[key],
          mutable: false,
        })
      }

      const result = this.evaluateBlockStatement(ast.body, subScope)
      return result
    }
  }

  /**
   * Evaluate while statement.
   *
   * @param ast AST.
   * @param scope Scope.
   */
  private evaluateWhileStatement(ast: WhileStatement, scope: Scope) {
    while (this.evaluateExpression(ast.expression, scope)) {
      this.evaluateBlockStatement(ast.statement, scope)
    }
  }

  /**
   * Evaluate if statement.
   *
   * @param ast AST.
   * @param scope Scope.
   */
  private evaluateIfStatement(ast: IfStatement, scope: Scope) {
    const condition = this.evaluateExpression(ast.condition, scope)

    if (condition) {
      return this.evaluateBlockStatement(ast.then, scope)
    }

    if (ast.else) {
      if (ast.else.kind === 'if_statement') {
        return this.evaluateIfStatement(ast.else, scope)
      }

      if (ast.else.kind === 'block_statement') {
        return this.evaluateBlockStatement(ast.else, scope)
      }
    }
  }

  /**
   * Evaluate block statement.
   *
   * @param ast AST.
   * @param scope Scope.
   */
  private evaluateBlockStatement(ast: BlockStatement, scope: Scope) {
    let lastValue: KuroType
    const blockScope = new Scope()
    blockScope.setParent(scope)

    for (const statement of ast.body) {
      lastValue = this.evaluateAST(statement, blockScope)
    }

    return lastValue
  }

  /**
   * Evaluate variable declaration statement.
   *
   * @param ast AST.
   * @param scope Scope.
   */
  private evaluateVariableDeclarationStatement(
    ast: VariableDeclarationStatement,
    scope: Scope
  ) {
    const initialValue = ast.initializer
      ? this.evaluateExpression(ast.initializer, scope)
      : undefined

    const variable: Variable = {
      name: ast.name.identifier,
      mutable: ast.declaratoin.kind === 'let',
      value: initialValue,
    }
    scope.addVariable(variable)

    return variable.value
  }

  /**
   * Evaluate expression statement.
   *
   * @param ast AST.
   * @param scope Scope.
   */
  private evaluateExpressionStatement(
    ast: ExpressionStatement,
    scope: Scope
  ): KuroType {
    return this.evaluateExpression(ast.expression, scope)
  }

  /**
   * Evaluate expression node.
   *
   * @param ast AST.
   * @param scope Scope.
   */
  private evaluateExpression(ast: ExpressionNode, scope: Scope): KuroType {
    if (ast.kind === 'binary_expression') {
      return this.evaluateBinaryExpression(ast, scope)
    }

    if (
      ast.kind === 'numeric_literal_expression' ||
      ast.kind === 'string_literal_expression' ||
      ast.kind === 'boolean_literal_expression'
    ) {
      return ast.value
    }

    if (ast.kind === 'identifier_expression') {
      return scope.resolveVariable(ast.identifier).value
    }

    if (ast.kind === 'call_expression') {
      return scope
        .resolveFunction(ast.callee.identifier)
        .call(...ast.arguments.map((a) => this.evaluateExpression(a, scope)))
    }
  }

  /**
   * Evaluate binary expression.
   *
   * @param ast AST.
   * @param scope Scope.
   */
  private evaluateBinaryExpression(
    ast: BinaryExpression,
    scope: Scope
  ): KuroType {
    const operator = ast.operator.kind
    const addition = (l, b) => l + b
    const subtraction = (l, b) => l - b
    const multiplication = (l, b) => l * b
    const power = (l, b) => l ** b
    const division = (l, b) => l / b
    const surplus = (l, b) => l % b
    const equals = (l, r) => l === r
    const notEquals = (l, r) => l !== r
    const lessThan = (l, r) => l < r
    const lessThanEquals = (l, r) => l <= r
    const greaterThan = (l, r) => l > r
    const greaterThanEquals = (l, r) => l >= r

    if (
      operator === 'equals' ||
      operator === 'plus_equals' ||
      operator === 'minus_equals' ||
      operator === 'asterisk_equals' ||
      operator === 'asterisk_asterisk_equals' ||
      operator === 'slash_equals' ||
      operator === 'percent_equals'
    ) {
      if (ast.left.kind !== 'identifier_expression') {
        throw new Error('value cannot assignable to value')
      }

      const variable = scope.resolveVariable(ast.left.identifier)

      if (!variable.mutable) {
        throw new Error(
          `cannot assign to ${ast.left.identifier} because it is a immutable.`
        )
      }

      const right = this.evaluateExpression(ast.right, scope)

      if (operator === 'equals') {
        variable.value = right
        return variable.value
      }

      let calculator: (l, b) => KuroType

      if (operator === 'plus_equals') {
        calculator = addition
      }

      if (operator === 'minus_equals') {
        calculator = subtraction
      }

      if (operator === 'asterisk_equals') {
        calculator = multiplication
      }

      if (operator === 'asterisk_asterisk_equals') {
        calculator = power
      }

      if (operator === 'slash_equals') {
        calculator = division
      }

      if (operator === 'percent_equals') {
        calculator = surplus
      }

      variable.value = calculator(variable.value, right)
      return variable.value
    }

    const left = this.evaluateExpression(ast.left, scope)
    const right = this.evaluateExpression(ast.right, scope)

    let calculator: (l, b) => KuroType

    if (operator === 'plus') {
      calculator = addition
    }

    if (operator === 'minus') {
      calculator = subtraction
    }

    if (operator === 'asterisk') {
      calculator = multiplication
    }

    if (operator === 'asterisk_asterisk') {
      calculator = power
    }

    if (operator === 'slash') {
      calculator = division
    }

    if (operator === 'percent') {
      calculator = surplus
    }

    if (operator === 'equals_equals') {
      calculator = equals
    }

    if (operator === 'exclamation_equals') {
      calculator = notEquals
    }

    if (operator === 'less_than') {
      calculator = lessThan
    }

    if (operator === 'less_than_equals') {
      calculator = lessThanEquals
    }

    if (operator === 'greater_than') {
      calculator = greaterThan
    }

    if (operator === 'greater_than_equals') {
      calculator = greaterThanEquals
    }

    return calculator(left, right)
  }
}
