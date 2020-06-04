import { LocatedError } from '../../abstracts'
import { ILoc } from '../../interfaces'

/*
 * LexerUnterminatedStringLiteralError class.
 */
export class LexerUnterminatedStringLiteralError extends LocatedError {
  name = 'LexerUnterminatedStringLiteralError'

  /**
   * LexerUnterminatedStringLiteralError constructor.
   *
   * @param loc Loc.
   */
  constructor(loc: ILoc) {
    super(`unterminated string literal`, loc)
  }
}
