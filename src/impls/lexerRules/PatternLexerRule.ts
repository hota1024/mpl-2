import { ILexerRule } from '../../interfaces'
import { NoDataToken, NoDataTokenKind } from '../../types'
import { Walker } from '../../classes'

/*
 * PatternLexerPattern type.
 */
export type PatternLexerPattern = {
  /**
   * Pattern.
   */
  pattern: string

  /**
   * Token kind.
   */
  kind: NoDataTokenKind
}

/*
 * PatternMakerFn type.
 */
export type PatternMakerFn = (
  pattern: string,
  kind: NoDataTokenKind
) => PatternLexerPattern

/*
 * PatternMakerUserFn type.
 */
export type PatternMakerUserFn = (
  pattern: PatternMakerFn
) => PatternLexerPattern[]

/*
 * PatternLexerRule class.
 */
export class PatternLexerRule implements ILexerRule {
  /**
   * Patterns.
   */
  patterns: PatternLexerPattern[]

  /**
   * PatternLexerRule constructor.
   *
   * @param patterns Pattern maker user function.
   */
  constructor(patterns: PatternMakerUserFn)

  /**
   * PatternLexerRule constructor.
   *
   * @param patterns Pattern array.
   */
  constructor(patterns: PatternLexerPattern[])

  /**
   * PatternLexerRule constructor.
   *
   * @param patterns Patterns.
   */
  constructor(patterns: PatternLexerPattern[] | PatternMakerUserFn) {
    let patternsArray: PatternLexerPattern[] = []

    if (typeof patterns === 'function') {
      patternsArray = patterns((pattern: string, kind: NoDataTokenKind) => ({
        pattern,
        kind,
      }))
    } else {
      patternsArray = patterns
    }

    this.patterns = patternsArray.sort(({ pattern: a }, { pattern: b }) =>
      a.length < b.length ? 1 : -1
    )
  }

  validate(walker: Walker<string>): boolean {
    return !!this.getPattern(walker)
  }

  execute(walker: Walker<string>): NoDataToken {
    const pattern = this.getPattern(walker)
    const start = walker.index()
    walker.next(pattern.pattern.length)

    return {
      kind: pattern.kind,
      loc: walker.locFrom(start),
    } as NoDataToken
  }

  /**
   * Returns pattern by walker's match.
   *
   * @param walker Source walker.
   */
  private getPattern(walker: Walker<string>) {
    return this.patterns.find((pattern) => walker.match(pattern.pattern))
  }
}
