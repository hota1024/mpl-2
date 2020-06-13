import { Variable, FunctionDeclarationStatement } from '../types'

/*
 * Scope interface.
 */
export interface IScope {
  /**
   * Add variable.
   *
   * @param variable Variable.
   */
  addVariable(variable: Variable): void

  /**
   * Returns variable by name.
   *
   * @param name Variable name.
   */
  getVariable(name: string): Variable

  /**
   * Add function.
   *
   * @param func Function declaration statement.
   */
  addFunction(func: FunctionDeclarationStatement): void

  /**
   * Returns function by name.
   *
   * @param name Function name.
   */
  getFunction(name: string): FunctionDeclarationStatement

  /**
   *
   * @param scope
   */
  addScope(scope: IScope): void

  removeScope(scope: IScope): void
}
