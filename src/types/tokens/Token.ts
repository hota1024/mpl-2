import { NewLineToken } from './NewLineToken'
import { IdentifierToken } from './IdentifierToken'
import { LiteralToken } from './LiteralToken'
import { CommentToken } from './CommentToken'
import { SymbolToken } from './SymbolToken'
import { ReservedKeywordToken } from './ReservedKeywordToken'
import { SpaceToken } from './SpaceToken'

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
  | SpaceToken
