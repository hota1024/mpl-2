import { IWalker, WalkerPattern } from '../interfaces'

/*
 * Walker class.
 */
export class Walker<T> implements IWalker<T> {
  /**
   * Current index.
   */
  private mIndex = 0

  /**
   * Values.
   */
  private mValues: T[]

  /**
   * Walker constructor.
   *
   * @param values Values.
   */
  constructor(values: T[]) {
    this.mValues = values
  }

  index(): number {
    return this.mIndex
  }

  value(): T {
    return this.mValues[this.mIndex]
  }

  next(steps = 1): T | void {
    this.mIndex += steps

    return this.mValues[this.mIndex]
  }

  peek(steps = 1): T | void {
    return this.mValues[this.mIndex + steps]
  }

  match(patterns: Iterable<WalkerPattern<T>>): boolean {
    let index = 0

    for (const pattern of patterns) {
      if (pattern !== this.mValues[index]) {
        return false
      }

      ++index
    }

    return true
  }
}
