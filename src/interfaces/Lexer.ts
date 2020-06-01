import { Token } from '../types/tokens/Token'

/*
 * Lexer interface.
 */
export interface ILexer {
  /**
   * Tokenize source code and returns tokens array.
   *
   * @param source Source string.
   */
  tokenize(source: string): Token[]
}
