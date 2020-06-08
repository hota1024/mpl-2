import { NodeBase } from './NodeBase'

/*
 * BooleanLiteralExpression type.
 */
export type BooleanLiteralExpression = NodeBase<
  'boolean_literal_expression'
> & {
  /**
   * Boolean value.
   */
  value: boolean
}
