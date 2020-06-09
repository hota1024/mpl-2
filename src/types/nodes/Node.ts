import { ExpressionNode } from './ExpressionNode'
import { StatementNode } from './StatementNode'
import { OtherNode } from './OtherNode'

/*
 * Node type.
 */
export type Node = ExpressionNode | StatementNode | OtherNode
