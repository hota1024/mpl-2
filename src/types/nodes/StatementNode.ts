import { ExpressionStatement } from './ExpressionStatement'
import { BlockStatement } from './BlockStatement'
import { IfStatement } from './IfStatement'
import { VariableDeclarationStatement } from './VariableDeclarationStatement'
import { FunctionDeclarationStatement } from './FunctionDeclarationStatement'
import { WhileStatement } from './WhileStatement'

export * from './ExpressionNode'
export * from './BlockStatement'
export * from './IfStatement'
export * from './VariableDeclarationStatement'
export * from './FunctionDeclarationStatement'
export * from './WhileStatement'

/*
 * StatementNode type.
 */
export type StatementNode =
  | ExpressionStatement
  | BlockStatement
  | IfStatement
  | VariableDeclarationStatement
  | FunctionDeclarationStatement
  | WhileStatement
