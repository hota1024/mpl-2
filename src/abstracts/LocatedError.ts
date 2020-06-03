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
   * @param message Message string.
   * @param loc Loc.
   */
  constructor(message: string, loc: ILoc) {
    super(message)
    this.loc = loc
  }

  /**
   * To string.
   */
  toString(): string {
    return `${this.name}(${this.loc.start}-${this.loc.end}) ${this.message} `
  }
}
