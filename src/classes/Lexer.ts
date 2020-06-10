import { ILexer, ILexerRule } from '../interfaces'
import { Token } from '../types/tokens'
import {
  InlineCommentLexerRule,
  RangeCommentLexerRule,
  IdentifierLexerRule,
  NumericLiteralLexerRule,
  StringLiteralLexerRule,
  PatternLexerRule,
  LexerInvalidCharError,
  BooleanLiteralLexerRule,
} from '../impls'
import { Walker } from './Walker'
import { Loc } from './Loc'

/*
 * Lexer class.
 */
export class Lexer implements ILexer {
  /**
   * Lexer rules.
   */
  rules: ILexerRule[] = [
    new InlineCommentLexerRule(),
    new RangeCommentLexerRule(),
    new NumericLiteralLexerRule(),
    new StringLiteralLexerRule(),
    new BooleanLiteralLexerRule(),
    new PatternLexerRule((pattern) => [
      pattern('==', 'equals_equals'),
      pattern('!=', 'exclamation_equals'),
      pattern('>', 'greater_than'),
      pattern('>=', 'greater_than_equals'),
      pattern('<', 'less_than'),
      pattern('<=', 'less_than_equals'),
      pattern('&&', 'ampersand_ampersand'),
      pattern('||', 'bar_bar'),
      pattern('+', 'plus'),
      pattern('+=', 'plus_equals'),
      pattern('-', 'minus'),
      pattern('-=', 'minus_equals'),
      pattern('*', 'asterisk'),
      pattern('*=', 'asterisk_equals'),
      pattern('**', 'asterisk_asterisk'),
      pattern('**=', 'asterisk_asterisk_equals'),
      pattern('/', 'slash'),
      pattern('/=', 'slash_equals'),
      pattern('=', 'equals'),
      pattern('%=', 'percent_equals'),
      pattern('%', 'percent'),
      pattern('(', 'left_parenthesis'),
      pattern(')', 'right_parenthesis'),
      pattern('{', 'left_curly_braces'),
      pattern('}', 'right_curly_braces'),
      pattern('[', 'left_square_brackets'),
      pattern(']', 'right_square_brackets'),
      pattern(',', 'comma'),
      pattern('.', 'dot'),
      pattern(';', 'semicolon'),
      pattern(':', 'colon'),
      pattern('?', 'question'),
      pattern('if', 'if'),
      pattern('else', 'else'),
      pattern('const', 'const'),
      pattern('let', 'let'),
      pattern('\n', 'new_line'),
    ]),
    new IdentifierLexerRule(),
  ]

  tokenize(source: string): Token[] {
    const tokens: Token[] = []
    const walker = new Walker(source)

    while (!walker.done()) {
      if (walker.value() === ' ') {
        walker.next()
      } else {
        const rule = this.rules.find((rule) => rule.validate(walker))

        if (typeof rule === 'undefined') {
          throw new LexerInvalidCharError(
            walker.value(),
            new Loc(walker.index(), walker.index() + 1)
          )
        } else {
          tokens.push(rule.execute(walker))
        }
      }
    }

    return tokens
  }
}
