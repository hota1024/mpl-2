/*
 * WalkerPatternFn type.
 */
export type WalkerPatternFn<T> = (value: T) => boolean

/*
 * WalkerPattern type.
 */
export type WalkerPattern<T> = T | WalkerPatternFn<T>

/*
 * Walker interface.
 */
export interface IWalker<T> {
  /**
   * Returns current index.
   */
  index(): number

  /**
   * Returns value.
   */
  value(): T

  /**
   * Forward index and returns value.
   *
   * @param steps Steps.
   */
  next(steps?: number): T

  /**
   * Returns value of the number of steps ahead.
   *
   * @param steps Steps.
   */
  peek(steps?: number): T | void

  /**
   * Returns whether next values matches patterns.
   *
   * @param patterns Patterns.
   */
  match(patterns: Iterable<WalkerPattern<T>>): boolean
}
