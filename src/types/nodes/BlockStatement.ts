import { NodeBase } from './NodeBase'
import { Node } from './Node'

/*
 * BlockStatement type.
 */
export type BlockStatement = NodeBase<'block_statement'> & {
  /**
   * Body nodes.
   */
  body: Node[]
}
