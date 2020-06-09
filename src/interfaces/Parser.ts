import { Token, Root } from '../types'

/*
 * Parser interface.
 */
export interface IParser {
  /**
   * Parse tokens and return AST.
   */
  parse(tokens: Token[]): Root
}
