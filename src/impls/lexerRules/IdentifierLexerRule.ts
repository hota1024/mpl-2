import { ILexerRule } from '../../interfaces'
import { Walker } from '../../classes'
import { IdentifierToken } from '../../types'

/*
 * IdentifierLexerRuleParams type.
 */
export type IdentifierLexerRuleParams = {
  /**
   * Identifier prefix regexp.
   */
  prefix: RegExp

  /**
   * Identifier char regexp.
   */
  identifierChar: RegExp
}

/*
 * IdentifierLexerRule class.
 */
export class IdentifierLexerRule implements ILexerRule {
  /**
   * Identifier prefix regexp.
   */
  prefix = /[a-zA-Z]|_/

  /**
   * Identifier char regexp.
   */
  identifierChar = /[a-zA-Z0-9]|_/

  /**
   * IdentifierLexerRule constructor.
   *
   * @param params Rule params.
   */
  constructor(params?: IdentifierLexerRuleParams) {
    this.prefix = params?.prefix ?? this.prefix
    this.identifierChar = params?.identifierChar ?? this.identifierChar
  }

  validate(walker: Walker<string>): boolean {
    return this.prefix.test(walker.value())
  }

  execute(walker: Walker<string>): IdentifierToken {
    const start = walker.index()

    while (!walker.done() && this.identifierChar.test(walker.value())) {
      walker.next()
    }

    return {
      kind: 'identifier',
      identifier: walker.sliceFrom(start).join(''),
      loc: walker.locFrom(start),
    }
  }
}
