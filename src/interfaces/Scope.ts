import { Variable, FunctionDeclarationStatement, Func } from '../types'

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
  resolveVariable(name: string): Variable

  /**
   * Add function.
   *
   * @param func Function.
   */
  addFunction(func: Func): void

  /**
   * Returns function by name.
   *
   * @param name Function name.
   */
  resolveFunction(name: string): Func

  /**
   * Set parent scope.
   *
   * @param scope Scope.
   */
  setParent(scope: IScope): void
}
