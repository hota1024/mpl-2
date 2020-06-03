import { ILoc } from '../interfaces'

/*
 * Loc class.
 */
export class Loc implements ILoc {
  /**
   * Loc constructor.
   *
   * @param start Start.
   * @param end End.
   */
  constructor(public start: number, public end: number) {}

  merge(loc: ILoc): Loc {
    return new Loc(Math.min(this.start, loc.start), Math.max(this.end, loc.end))
  }

  extract(string: string): string {
    return string.slice(this.start, this.end)
  }
}
