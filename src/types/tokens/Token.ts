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
  // Others
  | NewLineToken
  | IdentifierToken

declare const t: Token
t.kind
