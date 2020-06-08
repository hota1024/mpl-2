import { ExpressionStatement } from './ExpressionStatement'
import { BlockStatement } from './BlockStatement'

export * from './ExpressionNode'

/*
 * StatementNode type.
 */
export type StatementNode = ExpressionStatement | BlockStatement
