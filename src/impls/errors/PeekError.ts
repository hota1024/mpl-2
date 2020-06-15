import { LocatedError } from '../../abstracts'
import { ILoc } from '../../interfaces'

/*
 * PeekError class.
 */
export class PeekError extends LocatedError {
  name = 'PeekError'

  /**
   * PeekError constructor.
   *
   * @param loc Loc.
   */
  constructor(loc: ILoc) {
    super(`peek error`, loc)
  }
}
