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

  /**
   * Extract a specified range from a string.
   *
   * @param string String.
   */
  extract(string: string): string
}
