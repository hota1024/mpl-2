import { NodeBase } from './NodeBase'
import { ExpressionNode } from './ExpressionNode'
import { BlockStatement } from './BlockStatement'

/*
 * WhileStatement type.
 */
export type WhileStatement = NodeBase<'while_statement'> & {
  /**
   * Expression.
   */
  expression: ExpressionNode

  /**
   * Statement.
   */
  statement: BlockStatement
}
