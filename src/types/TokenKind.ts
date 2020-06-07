/*
 * LiteralTokenKind type.
 */
export type LiteralTokenKind =
  | 'numeric_literal'
  | 'string_literal'
  | 'boolean_literal'

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
  | 'plus_equals'
  | 'minus'
  | 'minus_equals'
  | 'asterisk'
  | 'asterisk_equals'
  | 'asterisk_asterisk'
  | 'slash'
  | 'slash_equals'
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
 * NoDataTokenKind type.
 */
export type NoDataTokenKind =
  | SymbolTokenKind
  | ReservedKeywordTokenKind
  | 'new_line'

/*
 * TokenKind type.
 */
export type TokenKind =
  | LiteralTokenKind
  | CommentTokenKind
  | NoDataTokenKind
  // Others
  | 'identifier'
