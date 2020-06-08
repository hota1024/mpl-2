import { NodeBase } from './NodeBase'
import { ExpressionNode } from './ExpressionNode'

/*
 * ExpressionStatement type.
 */
export type ExpressionStatement = NodeBase<'expression_statement'> & {
  /**
   * Expression.
   */
  expression: ExpressionNode
}
