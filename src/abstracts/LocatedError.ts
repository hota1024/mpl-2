import { ILoc } from '../interfaces'

/*
 * LocatedError class.
 */
export abstract class LocatedError extends Error {
  /**
   * Error name.
   */
  name = 'LocatedError'

  /**
   * Loc.
   */
  loc: ILoc

  /**
   * LocatedError constructor.
   *
   * @param loc Loc.
   */
  constructor(loc: ILoc) {
    super()
    this.loc = loc
  }

  /**
   * To string.
   */
  toString(): string {
    return `${this.name} ${this.message} (${this.loc.start}, ${this.loc.end})`
  }
}
