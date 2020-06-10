import {
  EqualsToken,
  ExclamationEqualsToken,
  GreaterThanToken,
  GreaterThanEqualsToken,
  LessThanToken,
  LessThanEqualsToken,
  PlusToken,
  MinusToken,
  AsteriskToken,
  AsteriskAsteriskToken,
  SlashToken,
  LeftParenthesisToken,
  RightParenthesisToken,
  LeftCurlyBracesToken,
  RightCurlyBracesToken,
  LeftSquareBracketsToken,
  RightSquareBracketsToken,
  CommaToken,
  DotToken,
  SemicolonToken,
  ColonToken,
  QuestionToken,
} from '../'
import { EqualsEqualsToken } from './EqualsEqualsToken'
import { AmpersandAmpersandToken } from './AmpersandAmpersandToken'
import { BarBarToken } from './BarBarToken'
import { PlusEqualsToken } from './PlusEqualsToken'

/*
 * SymbolToken type.
 */
export type SymbolToken =
  | EqualsToken
  | PlusEqualsToken
  | EqualsEqualsToken
  | ExclamationEqualsToken
  | GreaterThanToken
  | GreaterThanEqualsToken
  | LessThanToken
  | LessThanEqualsToken
  | PlusToken
  | MinusToken
  | AsteriskToken
  | AsteriskAsteriskToken
  | SlashToken
  | LeftParenthesisToken
  | RightParenthesisToken
  | LeftCurlyBracesToken
  | RightCurlyBracesToken
  | LeftSquareBracketsToken
  | RightSquareBracketsToken
  | CommaToken
  | DotToken
  | SemicolonToken
  | ColonToken
  | QuestionToken
  | AmpersandAmpersandToken
  | BarBarToken
