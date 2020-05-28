/*
 * Location interface.
 */
export interface ILoc {
  /**
   * Start location.
   */
  start: number

  /**
   * End location.
   */
  end: number

  /**
   * Merge location.
   * 
   * @param loc Other location.
   */
  merge(loc: ILoc): ILoc
}
