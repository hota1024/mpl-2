import { NodeBase } from './NodeBase'
import { ExpressionNode } from './ExpressionNode'
import { StatementNode } from './StatementNode'

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
  statement: StatementNode
}
