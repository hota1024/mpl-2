import { TokenKind } from '../TokenKind'
import { TokenBase } from './TokenBase'

/*
 * LiteralTokenBase type.
 */
export type LiteralTokenBase<Kind extends TokenKind, T> = TokenBase<Kind> & {
  /**
   * Literal value.
   */
  value: T
}
