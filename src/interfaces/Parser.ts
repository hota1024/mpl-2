import { Token, Node } from '../types'

/*
 * Parser interface.
 */
export interface IParser {
  /**
   * Parse tokens and return AST.
   */
  parse(tokens: Token[]): Node
}
