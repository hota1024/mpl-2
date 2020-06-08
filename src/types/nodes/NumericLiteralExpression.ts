import { NodeBase } from './NodeBase'

/*
 * NumericLiteralExpression type.
 */
export type NumericLiteralExpression = NodeBase<
  'numeric_literal_expression'
> & {
  /**
   * Number value.
   */
  value: number
}
