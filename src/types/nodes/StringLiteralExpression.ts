import { NodeBase } from './NodeBase'

/*
 * StringLiteralExpression type.
 */
export type StringLiteralExpression = NodeBase<'string_literal_expression'> & {
  /**
   * String value.
   */
  value: string
}
