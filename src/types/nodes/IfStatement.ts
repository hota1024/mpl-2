import { NodeBase } from './NodeBase'
import { ExpressionStatement } from './ExpressionStatement'
import { BlockStatement } from './BlockStatement'

/*
 * IfStatement type.
 */
export type IfStatement = NodeBase<'if_statement'> & {
  /**
   * Condition expression.
   */
  condition: ExpressionStatement

  /**
   * Then statement.
   */
  then: BlockStatement

  /**
   * Else statement.
   */
  else?: BlockStatement | IfStatement
}
