import { ILexerRule } from '../../interfaces'
import { Walker } from '../../classes'
import { BooleanLiteralToken } from '../../types'

/*
 * BooleanLiteralLexerRule class.
 */
export class BooleanLiteralLexerRule implements ILexerRule {
  validate(walker: Walker<string>): boolean {
    return walker.match('true') || walker.match('false')
  }

  execute(walker: Walker<string>): BooleanLiteralToken {
    const start = walker.index()

    if (walker.match('true')) {
      walker.next(4)

      return {
        kind: 'boolean_literal',
        value: true,
        loc: walker.locFrom(start),
      }
    } else {
      walker.next(5)

      return {
        kind: 'boolean_literal',
        value: false,
        loc: walker.locFrom(start),
      }
    }
  }
}
