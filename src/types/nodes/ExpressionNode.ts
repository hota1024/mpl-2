import { NumericLiteralExpression } from './NumericLiteralExpression'
import { StringLiteralExpression } from './StringLiteralExpression'
import { BooleanLiteralExpression } from './BooleanLiteralExpression'

export * from './NumericLiteralExpression'
export * from './StringLiteralExpression'
export * from './BooleanLiteralExpression'

/*
 * ExpressionNode type.
 */
export type ExpressionNode =
  | NumericLiteralExpression
  | StringLiteralExpression
  | BooleanLiteralExpression
