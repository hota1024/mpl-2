/*
 * ExpressionKind type.
 */
export type ExpressionKind =
  | 'binary_expression'
  | 'unary_expression'
  | 'call_expression'
  | 'object_expression'
  | 'identifier_expression'
  | 'numeric_literal_expression'
  | 'string_literal_expression'
  | 'boolean_literal_expression'

/**
 * StatementKind type.
 */
export type StatementKind =
  | 'expression_statement'
  | 'block_statement'
  | 'if_statement'
  | 'variable_declaration_statement'
  | 'function_declaration_statement'

/*
 * NodeKindtype.
 */
export type NodeKind = ExpressionKind | StatementKind | 'parameter'
