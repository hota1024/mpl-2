import { IScope } from '../interfaces'
import { Variable, Func } from '../types'

/*
 * Scope class.
 */
export class Scope implements IScope {
  /**
   * Variables array.
   */
  private variables: Variable[] = []

  /**
   * Functions array.
   */
  private functions: Func[] = []

  /**
   * Parent scope.
   */
  private parentScope?: IScope

  addVariable(variable: Variable): void {
    if (this.variables.find((v) => v.name === variable.name)) {
      throw new Error(`cannot redelare block-scoped variable `)
    }

    this.variables.push(variable)
  }

  resolveVariable(name: string): Variable {
    const variable = this.variables.find((v) => v.name === name)

    if (variable) {
      return variable
    }

    if (this.parentScope) {
      return this.parentScope.resolveVariable(name)
    }

    throw new Error(`undefined variable: ${name}`)
  }

  setParent(scope: IScope): void {
    this.parentScope = scope
  }

  addFunction(func: Func): void {
    this.functions.push(func)
  }

  resolveFunction(name: string): Func {
    const func = this.functions.find((v) => v.name === name)

    if (func) {
      return func
    }

    if (this.parentScope) {
      return this.parentScope.resolveFunction(name)
    }

    throw new Error(`undefined function: ${name}`)
  }
}
