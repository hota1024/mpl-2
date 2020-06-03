import { LocatedError } from '../../abstracts'
import { ILoc } from '../../interfaces'

/*
 * LexerInvalidCharError class.
 */
export class LexerInvalidCharError extends LocatedError {
  name = 'LexerInvalidCharError'

  /**
   * LexerInvalidCharError constructor.
   *
   * @param char Char.
   * @param loc Loc.
   */
  constructor(char: string, loc: ILoc) {
    super(`invalid char '${char}'`, loc)
  }
}
