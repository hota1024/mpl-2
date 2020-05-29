import { TokenKind } from '../types'

/*
 * Token interface.
 */
export interface IToken {
  /**
   * Token type.
   */
  type: TokenKind

  /**
   * Returns token full text in source.
   */
  getFullText(): string
}
