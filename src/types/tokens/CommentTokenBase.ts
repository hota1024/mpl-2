import { TokenBase } from './TokenBase'

/*
 * CommentTokenBase type.
 */
export type CommentTokenBase = TokenBase<'inline_comment'> & {
  /**
   * Comment content.
   */
  content: string
}
