import { LocatedError } from '../../abstracts'
import { ILoc } from '../../interfaces'

/*
 * ParserNoIdentifier class.
 */
export class ParserNoIdentifier extends LocatedError {
  name = 'ParserNoIdentifier'

  /**
   * ParserNoIdentifier constructor.
   *
   * @param loc Loc.
   */
  constructor(loc: ILoc) {
    super(`no identifier.`, loc)
  }
}
