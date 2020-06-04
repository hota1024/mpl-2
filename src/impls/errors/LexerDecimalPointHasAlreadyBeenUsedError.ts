import { LocatedError } from '../../abstracts'
import { ILoc } from '../../interfaces'

/*
 * LexerDecimalPointHasAlreadyBeenUsedError class.
 */
export class LexerDecimalPointHasAlreadyBeenUsedError extends LocatedError {
  name = 'LexerDecimalPointHasAlreadyBeenUsedError'

  /**
   * LexerDecimalPointHasAlreadyBeenUsedError constructor.
   *
   * @param loc Loc.
   */
  constructor(loc: ILoc) {
    super(`decimal point has already been used'`, loc)
  }
}
