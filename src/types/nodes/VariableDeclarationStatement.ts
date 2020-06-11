import { NodeBase } from './NodeBase'
import { IdentifierExpression } from './IdentifierExpression'
import { ExpressionNode } from './ExpressionNode'
import { Token } from '../tokens'

/*
 * VariableDeclarationStatement type.
 */
export type VariableDeclarationStatement = NodeBase<
  'variable_declaration_statement'
> & {
  /**
   * Name expression.
   */
  name: IdentifierExpression

  /**
   * Declaration token.
   */
  declaratoin: Token

  /**
   * Initializer expression.
   */
  initializer?: ExpressionNode
}
