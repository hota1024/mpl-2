import { NumericLiteralExpression } from './NumericLiteralExpression'
import { StringLiteralExpression } from './StringLiteralExpression'
import { BooleanLiteralExpression } from './BooleanLiteralExpression'
import { BinaryExpression } from './BinaryExpression'

export * from './NumericLiteralExpression'
export * from './StringLiteralExpression'
export * from './BooleanLiteralExpression'

/*
 * ExpressionNode type.
 */
export type ExpressionNode =
  | BinaryExpression
  | NumericLiteralExpression
  | StringLiteralExpression
  | BooleanLiteralExpression
