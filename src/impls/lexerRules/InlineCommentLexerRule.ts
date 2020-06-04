import { ILexerRule } from '../../interfaces'
import { Walker } from '../../classes'
import { InlineCommentToken } from '../../types'

/*
 * InlineCommentLexerRuleParams type.
 */
export type InlineCommentLexerRuleParams = {
  /**
   * Comment prefixes.
   */
  prefixes: string[]
}

/*
 * InlineCommentLexerRule class.
 */
export class InlineCommentLexerRule implements ILexerRule {
  /**
   * Comment prefixes.
   */
  prefixes: string[] = ['//']

  /**
   * InlineCommentLexerRule constructor.
   *
   * @param params Rule params.
   */
  constructor(params?: InlineCommentLexerRuleParams) {
    this.prefixes = params?.prefixes ?? this.prefixes
  }

  validate(walker: Walker<string>): boolean {
    return !!this.getPrefix(walker)
  }

  execute(walker: Walker<string>): InlineCommentToken {
    const prefix = this.getPrefix(walker)
    const start = walker.index()
    const commentStart = start + prefix.length

    walker.next(prefix.length)

    while (!walker.done() && walker.value() !== '\n') {
      walker.next()
    }

    return {
      kind: 'inline_comment',
      content: walker.sliceFrom(commentStart).join(''),
      loc: walker.locFrom(start),
    }
  }

  /**
   * Returns prefix by walker's match.
   *
   * @param walker Source walker.
   */
  getPrefix(walker: Walker<string>): string {
    return this.prefixes.find((prefix) => walker.match(prefix))
  }
}
