import { NodeBase } from './NodeBase'
import { ExpressionNode } from './ExpressionNode'

/*
 * ReturnStatement type.
 */
export type ReturnStatement = NodeBase<'return_statement'> & {
  /**
   * Expression node.
   */
  expression: ExpressionNode
}
