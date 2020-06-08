import { NodeBase } from './NodeBase'
import { IdentifierExpression } from './IdentifierExpression'
import { ExpressionNode } from './ExpressionNode'

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
   * Initializer expression.
   */
  initializer: ExpressionNode
}
