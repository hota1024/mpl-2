import { NodeBase } from './NodeBase'
import { StatementNode } from './StatementNode'

/*
 * Root type.
 */
export type Root = NodeBase<'root'> & {
  /**
   * Statements array.
   */
  statements: StatementNode[]
}
