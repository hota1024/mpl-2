import { NodeBase } from './NodeBase'
import { ExpressionNode } from './ExpressionNode'
import { IdentifierExpression } from './IdentifierExpression'

/*
 * CallExpression type.
 */
export type CallExpression = NodeBase<'call_expression'> & {
  /**
   * Callee.
   */
  callee: IdentifierExpression

  /**
   * Arguments.
   */
  arguments: ExpressionNode[]
}
