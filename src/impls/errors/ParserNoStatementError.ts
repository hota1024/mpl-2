import { LocatedError } from '../../abstracts'
import { ILoc } from '../../interfaces'

/*
 * ParserNoStatementError class.
 */
export class ParserNoStatementError extends LocatedError {
  name = 'ParserNoStatementError'

  /**
   * ParserNoStatementError constructor.
   *
   * @param loc Loc.
   */
  constructor(loc: ILoc) {
    super(`no statement`, loc)
  }
}
