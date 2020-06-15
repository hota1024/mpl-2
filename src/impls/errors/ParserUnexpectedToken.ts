import { LocatedError } from '../../abstracts'
import { ILoc } from '../../interfaces'

/*
 * ParserUnexpectedToken class.
 */
export class ParserUnexpectedToken extends LocatedError {
  name = 'ParserUnexpectedToken'

  /**
   * ParserUnexpectedToken constructor.
   *
   * @param loc Loc.
   */
  constructor(loc: ILoc) {
    super(`unexpected token`, loc)
  }
}
