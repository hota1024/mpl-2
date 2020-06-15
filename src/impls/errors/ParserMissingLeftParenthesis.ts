import { LocatedError } from '../../abstracts'
import { ILoc } from '../../interfaces'

/*
 * ParserMissingLeftParenthesis class.
 */
export class ParserMissingLeftParenthesis extends LocatedError {
  name = 'ParserMissingLeftParenthesis'

  /**
   * ParserMissingLeftParenthesis constructor.
   *
   * @param loc Loc.
   */
  constructor(loc: ILoc) {
    super(`missing ')'`, loc)
  }
}
