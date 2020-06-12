import { KuroType, Node } from '../types'

/*
 * Evaluator interface.
 */
export interface IEvaluator {
  /**
   * Evaluate AST and return result.
   *
   * @param ast AST node.
   */
  evaluate(ast: Node): KuroType
}
