import { Token } from '../types/tokens'
import { IWalker } from './Walker'
import { LexerRuleExecuteContext } from '../types'

/*
 * LexerRule interface.
 */
export interface ILexerRule {
  /**
   * Validate rule.
   *
   * @param walker String walker.
   */
  validate(walker: IWalker<string>): boolean

  /**
   * Execute rule.
   *
   * @param walker String walker.
   * @param context Execute context.
   */
  execute(walker: IWalker<string>, context?: LexerRuleExecuteContext): Token
}
