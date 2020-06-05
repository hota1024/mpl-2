import { NewLineToken } from './NewLineToken'
import { IdentifierToken } from './IdentifierToken'
import { LiteralToken } from './LiteralToken'
import { CommentToken } from './CommentToken'
import { SymbolToken } from './SymbolToken'
import { ReservedKeywordToken } from './ReservedKeywordToken'
import { KeywordToken } from './KeywordToken'

/*
 * Token type.
 */
export type Token =
  | LiteralToken
  | CommentToken
  | SymbolToken
  | ReservedKeywordToken
  | KeywordToken
  // Others
  | NewLineToken
  | IdentifierToken
