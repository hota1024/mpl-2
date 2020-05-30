import { TokenBase } from '.'

/*
 * LiteralTokenBase type.
 */
export type LiteralTokenBase<T> = TokenBase & {
  /**
   * Literal value.
   */
  value: T
}
