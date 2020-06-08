import { NumericLiteralExpression } from './NumericLiteralExpression'
import { StringLiteralExpression } from './StringLiteralExpression'
import { BooleanLiteralExpression } from './BooleanLiteralExpression'
import { BinaryExpression } from './BinaryExpression'
import { UnaryExpression } from './UnaryExpression'
import { IdentifierExpression } from './IdentifierExpression'
import { CallExpression } from './CallExpression'

export * from './NumericLiteralExpression'
export * from './StringLiteralExpression'
export * from './BooleanLiteralExpression'

/*
 * ExpressionNode type.
 */
export type ExpressionNode =
  | BinaryExpression
  | UnaryExpression
  | CallExpression
  | NumericLiteralExpression
  | StringLiteralExpression
  | BooleanLiteralExpression
  | IdentifierExpression
