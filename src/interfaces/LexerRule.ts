import { Token } from '../types/tokens'
import { IWalker } from './Walker'

/*
 * LexerRule interface.
 */
export interface ILexerRule {
  /**
   * Validate rule.
   *
   * @param walker Token walker.
   */
  validate(walker: IWalker<Token>): boolean

  /**
   * Execute rule.
   *
   * @param walker Token walker.
   */
  execute(walker: IWalker<Token>): Token
}
