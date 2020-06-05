import {
  SymbolToken,
  ReservedKeywordToken,
  KeywordToken,
  NewLineToken,
} from '../'

/*
 * NoDataToken type.
 */
export type NoDataToken =
  | SymbolToken
  | ReservedKeywordToken
  | KeywordToken
  | NewLineToken
