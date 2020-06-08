import { ExpressionStatement } from './ExpressionStatement'
import { BlockStatement } from './BlockStatement'
import { IfStatement } from './IfStatement'
import { VariableDeclarationStatement } from './VariableDeclarationStatement'

export * from './ExpressionNode'
export * from './BlockStatement'
export * from './IfStatement'
export * from './VariableDeclarationStatement'

/*
 * StatementNode type.
 */
export type StatementNode =
  | ExpressionStatement
  | BlockStatement
  | IfStatement
  | VariableDeclarationStatement
