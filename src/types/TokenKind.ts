/*
 * TokenKind type.
 */
export type TokenKind =
  // Literal
  | 'numeric_literal'
  | 'string_literal'
  // Comments
  | 'inline_comment'
  | 'range_comment'
  // Symbols
  | 'equals_equals'
  | 'exclamation_equals'
  | 'greater_than'
  | 'greater_than_equals'
  | 'less_than'
  | 'less_than_equals'
  | 'plus'
  | 'minus'
  | 'astersik'
  | 'astersik_asterisk'
  | 'slash'
  | 'equals'
  | 'left_parenthesis'
  | 'right_parenthesis'
  | 'left_curly_braces'
  | 'right_curly_braces'
  | 'left_square_brackets'
  | 'right_square_brackets'
  | 'comma'
  | 'semicolon'
  // Keywords
  | 'if'
  | 'else'
  | 'const'
  | 'let'
  | 'true'
  | 'false'
  // Others
  | 'new_line'
  | 'identifier'
