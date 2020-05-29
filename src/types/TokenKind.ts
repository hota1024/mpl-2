/*
 * TokenKind type.
 */
export type TokenKind =
  | 'numeric_literal'
  | 'string_literal'
  | 'symbol' // symbols(with operators)
  | 'identifier' // names
  | 'reserved' // reserved keywords
  | 'new_line'
  | 'inline_comment'
  | 'range_comment'
