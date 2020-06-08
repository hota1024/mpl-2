import { NodeBase } from './NodeBase'
import { Token } from '../tokens'
import { ExpressionNode } from './ExpressionNode'

/*
 * BinaryExpression type.
 */
export type BinaryExpression = NodeBase<'binary_expression'> & {
  /**
   * Operator token.
   */
  operator: Token

  /**
   * Left side expression node.
   */
  left: ExpressionNode

  /**
   * Right side expression node.
   */
  right: ExpressionNode
}
