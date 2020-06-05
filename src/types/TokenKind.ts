/*
 * LiteralTokenKind type.
 */
export type LiteralTokenKind = 'numeric_literal' | 'string_literal'

/*
 * CommentTokenKind type.
 */
export type CommentTokenKind = 'inline_comment' | 'range_comment'

/*
 * SymbolTokenKind type.
 */
export type SymbolTokenKind =
  | 'equals_equals'
  | 'exclamation_equals'
  | 'greater_than'
  | 'greater_than_equals'
  | 'less_than'
  | 'less_than_equals'
  | 'plus'
  | 'minus'
  | 'asterisk'
  | 'asterisk_asterisk'
  | 'slash'
  | 'equals'
  | 'left_parenthesis'
  | 'right_parenthesis'
  | 'left_curly_braces'
  | 'right_curly_braces'
  | 'left_square_brackets'
  | 'right_square_brackets'
  | 'comma'
  | 'dot'
  | 'semicolon'
  | 'colon'
  | 'question'

/*
 * ReservedKeywordTokenKind type.
 */
export type ReservedKeywordTokenKind = 'if' | 'else' | 'const' | 'let'

/*
 * KeywordTokenKind type.
 */
export type KeywordTokenKind = 'true' | 'false'

/*
 * NoDataTokenKind type.
 */
export type NoDataTokenKind = ReservedKeywordTokenKind | KeywordTokenKind

/*
 * TokenKind type.
 */
export type TokenKind =
  | LiteralTokenKind
  | CommentTokenKind
  | NoDataTokenKind
  // Others
  | 'new_line'
  | 'identifier'
