import { IWalker, WalkerPattern } from '../interfaces'
import { Loc } from './Loc'

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
   * @param values Values array.
   */
  constructor(values: T[])

  /**
   * Walker constructor.
   *
   * @param values Values iterator.
   */
  constructor(values: Iterable<T>)

  /**
   * Walker constructor.
   *
   * @param values Values.
   */
  constructor(values: T[] | Iterable<T>) {
    this.mValues = Array.isArray(values) ? values : Array.from(values)
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
    let index = this.mIndex

    for (const pattern of patterns) {
      if (pattern !== this.mValues[index]) {
        return false
      }

      ++index
    }

    return true
  }

  done(): boolean {
    return this.mIndex >= this.mValues.length
  }

  locTo(steps: number): Loc {
    return new Loc(this.index(), this.index() + steps)
  }

  locFrom(start: number): Loc {
    return new Loc(start, this.index())
  }
}
