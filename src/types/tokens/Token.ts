import { EqualsToken } from './EqualsToken'
import { ExclamationEqualsToken } from './ExclamationEqualsToken'
import { GreaterThanToken } from './GreaterThanToken'
import { GreaterThanEqualsToken } from './GreaterThanEqualsToken'
import { LessThanToken } from './LessThanToken'
import { LessThanEqualsToken } from './LessThanEqualsToken'
import { PlusToken } from './PlusToken'
import { MinusToken } from './MinusToken'
import { AsteriskToken } from './AsteriskToken'
import { AsteriskAsteriskToken } from './AsteriskAsteriskToken'
import { SlashToken } from './SlashToken'
import { LeftParenthesisToken } from './LeftParenthesisToken'
import { RightParenthesisToken } from './RightParenthesisToken'
import { LeftCurlyBracesToken } from './LeftCurlyBracesToken'
import { RightCurlyBracesToken } from './RightCurlyBracesToken'
import { LeftSquareBracketsToken } from './LeftSquareBracketsToken'
import { RightSquareBracketsToken } from './RightSquareBracketsToken'
import { CommaToken } from './CommaToken'
import { SemicolonToken } from './SemicolonToken'
import { ColonToken } from './ColonToken'
import { QuestionToken } from './QuestionToken'
import { IfToken } from './IfToken'
import { ElseToken } from './ElseToken'
import { ConstToken } from './ConstToken'
import { LetToken } from './LetToken'
import { TrueKeywordToken } from './TrueKeywordToken'
import { FalseKeywordToken } from './FalseKeywordToken'
import { NewLineToken } from './NewLineToken'
import { IdentifierToken } from './IdentifierToken'
import { DotToken } from './DotToken'
import { LiteralToken } from './LiteralToken'
import { CommentToken } from './CommentToken'

/*
 * Token type.
 */
export type Token =
  | LiteralToken
  | CommentToken
  // Symbols
  | EqualsToken
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
  | EqualsToken
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
  // Reserved keywords
  | IfToken
  | ElseToken
  | ConstToken
  | LetToken
  // Keywords
  | TrueKeywordToken
  | FalseKeywordToken
  // Others
  | NewLineToken
  | IdentifierToken
