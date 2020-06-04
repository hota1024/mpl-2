import { ILexer, ILexerRule } from '../interfaces'
import { Token } from '../types/tokens'

/*
 * Lexer class.
 */
export class Lexer implements ILexer {
  /**
   * Lexer rules.
   */
  rules: ILexerRule[] = []

  tokenize(source: string): Token[] {
    const tokens: Token[] = []

    return tokens
  }
}
