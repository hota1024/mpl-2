import { TokenBase } from '.'
import { TokenKind } from '../TokenKind'

/*
 * LiteralTokenBase type.
 */
export type LiteralTokenBase<T> = TokenBase & {
  kind: TokenKind

  /**
   * Literal value.
   */
  value: T
}
