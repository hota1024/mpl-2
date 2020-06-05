import { TokenBase } from './TokenBase'

/*
 * IdentifierToken type.
 */
export type IdentifierToken = TokenBase<'identifier'> & {
  /**
   * Identifier string.
   */
  identifier: string
}
