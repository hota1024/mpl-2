import { NodeBase } from './NodeBase'
import { BlockStatement } from './BlockStatement'
import { ExpressionNode } from './ExpressionNode'

/*
 * IfStatement type.
 */
export type IfStatement = NodeBase<'if_statement'> & {
  /**
   * Condition expression.
   */
  condition: ExpressionNode

  /**
   * Then statement.
   */
  then: BlockStatement

  /**
   * Else statement.
   */
  else?: BlockStatement | IfStatement
}
