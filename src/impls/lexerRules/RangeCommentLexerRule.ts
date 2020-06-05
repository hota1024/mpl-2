import { ILexerRule } from '../../interfaces'
import { Walker } from '../../classes'
import { RangeCommentToken } from '../../types'
import { LexerUnterminatedCommentError } from '../'

/*
 * RangeCommentCap type.
 */
export type RangeCommentCap = {
  /**
   * Start cap.
   */
  start: string

  /**
   * End cap.
   */
  end: string
}

/*
 * RangeCommentLexerRuleParams type.
 */
export type RangeCommentLexerRuleParams = {
  /**
   * Range comment caps.
   */
  caps: RangeCommentCap[]
}

/*
 * RangeCommentLexerRule class.
 */
export class RangeCommentLexerRule implements ILexerRule {
  /**
   * Comment caps.
   */
  caps: RangeCommentCap[] = [
    {
      start: '/*',
      end: '*/',
    },
  ]

  /**
   * RangeCommentLexerRule constructor.
   *
   * @param params Rule params.
   */
  constructor(params?: RangeCommentLexerRuleParams) {
    this.caps = params?.caps ?? this.caps
  }

  validate(walker: Walker<string>): boolean {
    return !!this.getCap(walker)
  }

  execute(walker: Walker<string>): RangeCommentToken {
    const cap = this.getCap(walker)
    const start = walker.index()
    const commentStart = start + cap.start.length

    walker.next(cap.start.length)

    while (!walker.match(cap.end)) {
      if (walker.done()) {
        throw new LexerUnterminatedCommentError(walker.locFrom(start))
      }
      walker.next()
    }

    walker.next(cap.end.length)

    return {
      kind: 'range_comment',
      content: walker
        .slice(commentStart, walker.index() - cap.end.length)
        .join(''),
      loc: walker.locFrom(start),
    }
  }

  /**
   * Returns cap by walker's match.
   *
   * @param walker Source walker.
   */
  private getCap(walker: Walker<string>) {
    return this.caps.find((cap) => walker.match(cap.start))
  }
}
