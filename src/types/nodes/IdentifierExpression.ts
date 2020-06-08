import { NodeBase } from './NodeBase'

/*
 * IdentifierExpression type.
 */
export type IdentifierExpression = NodeBase<'identifier_expression'> & {
  /**
   * Identifier string.
   */
  identifier: string
}
