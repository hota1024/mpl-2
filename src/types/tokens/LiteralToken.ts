import { NumericLiteralToken, StringLiteralToken } from '../'
import { BooleanLiteralToken } from './BooleanLiteralToken'

/*
 * LiteralToken type.
 */
export type LiteralToken =
  | NumericLiteralToken
  | StringLiteralToken
  | BooleanLiteralToken
