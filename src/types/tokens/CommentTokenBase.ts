import { TokenBase } from './TokenBase'
import { TokenKind } from '../TokenKind'

/*
 * CommentTokenBase type.
 */
export type CommentTokenBase<Kind extends TokenKind> = TokenBase<Kind> & {
  /**
   * Comment content.
   */
  content: string
}
