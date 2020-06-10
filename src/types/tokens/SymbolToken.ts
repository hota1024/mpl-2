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
import { MinusEqualsToken } from './MinusEqualsToken'
import { AsteriskEqualsToken } from './AsteriskEqualsToken'
import { SlashEqualsToken } from './SlashEqualsToken'

/*
 * SymbolToken type.
 */
export type SymbolToken =
  | EqualsToken
  | PlusEqualsToken
  | MinusEqualsToken
  | AsteriskEqualsToken
  | SlashEqualsToken
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
