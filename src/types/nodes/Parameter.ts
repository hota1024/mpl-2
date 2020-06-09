import { NodeBase } from './NodeBase'
import { IdentifierExpression } from './IdentifierExpression'

/*
 * Parameter type.
 */
export type Parameter = NodeBase<'parameter'> & {
  /**
   * Name.
   */
  name: IdentifierExpression

  /**
   * Type.
   */
  type?: IdentifierExpression
}
