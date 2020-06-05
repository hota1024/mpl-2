import { IfToken } from './IfToken'
import { ElseToken } from './ElseToken'
import { ConstToken } from './ConstToken'
import { LetToken } from './LetToken'
import { TrueKeywordToken } from './TrueKeywordToken'
import { FalseKeywordToken } from './FalseKeywordToken'
import { NewLineToken } from './NewLineToken'
import { IdentifierToken } from './IdentifierToken'
import { LiteralToken } from './LiteralToken'
import { CommentToken } from './CommentToken'
import { SymbolToken } from './SymbolToken'
import { ReservedKeywordToken } from './ReservedKeywordToken'

/*
 * Token type.
 */
export type Token =
  | LiteralToken
  | CommentToken
  | SymbolToken
  | ReservedKeywordToken
  // Keywords
  | TrueKeywordToken
  | FalseKeywordToken
  // Others
  | NewLineToken
  | IdentifierToken
