import { ExpressionStatement } from './ExpressionStatement'
import { BlockStatement } from './BlockStatement'
import { IfStatement } from './IfStatement'

export * from './ExpressionNode'

/*
 * StatementNode type.
 */
export type StatementNode = ExpressionStatement | BlockStatement | IfStatement
