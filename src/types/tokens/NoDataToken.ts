import {
  SymbolToken,
  ReservedKeywordToken,
  KeywordToken,
  NewLineToken,
  IdentifierToken,
} from '../'

/*
 * NoDataToken type.
 */
export type NoDataToken =
  | SymbolToken
  | ReservedKeywordToken
  | KeywordToken
  | NewLineToken
  | IdentifierToken
