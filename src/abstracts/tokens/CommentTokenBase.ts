import { TokenBase } from './TokenBase'
import { ILoc } from '../../interfaces'

/*
 * CommentTokenBase class.
 */
export abstract class CommentTokenBase extends TokenBase {
  /**
   * Comment content.
   */
  content: string

  /**
   * CommentTokenBase constructor.
   *
   * @param content Comment content.
   * @param loc Token location.
   */
  constructor(content: string, loc: ILoc) {
    super(loc)
    this.content = content
  }
}
