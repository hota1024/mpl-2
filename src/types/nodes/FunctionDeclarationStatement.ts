import { NodeBase } from './NodeBase'
import { IdentifierExpression } from './IdentifierExpression'
import { Parameter } from './Parameter'
import { BlockStatement } from './BlockStatement'

/*
 * FunctionDeclarationStatement type.
 */
export type FunctionDeclarationStatement = NodeBase<
  'function_declaration_statement'
> & {
  /**
   * Name expression.
   */
  name: IdentifierExpression

  /**
   * Parameters array.
   */
  parameters: Parameter[]

  /**
   * Block.
   */
  body: BlockStatement
}
