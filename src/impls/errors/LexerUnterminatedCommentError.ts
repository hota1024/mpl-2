import { LocatedError } from '../../abstracts'
import { ILoc } from '../../interfaces'

/*
 * LexerUnterminatedCommentError class.
 */
export class LexerUnterminatedCommentError extends LocatedError {
  name = 'LexerUnterminatedCommentError'

  /**
   * LexerUnterminatedCommentError constructor.
   *
   * @param loc Loc.
   */
  constructor(loc: ILoc) {
    super(`unterminated comment`, loc)
  }
}
