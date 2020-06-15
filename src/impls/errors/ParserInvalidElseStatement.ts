import { LocatedError } from '../../abstracts'
import { ILoc } from '../../interfaces'

/*
 * ParserInvalidElseStatement class.
 */
export class ParserInvalidElseStatement extends LocatedError {
  name = 'ParserInvalidElseStatement'

  /**
   * ParserInvalidElseStatement constructor.
   *
   * @param loc Loc.
   */
  constructor(loc: ILoc) {
    super(`invalid else statement`, loc)
  }
}
