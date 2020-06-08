import { NodeBase } from './NodeBase'
import { Token } from '../tokens'
import { ExpressionNode } from './ExpressionNode'

/*
 * UnaryExpression type.
 */
export type UnaryExpression = NodeBase<'unary_expression'> & {
  /**
   * Operator token.
   */
  operator: Token

  /**
   * Target expression node.
   */
  node: ExpressionNode
}
