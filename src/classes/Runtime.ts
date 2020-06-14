import { IRuntime } from '../interfaces'
import { Variable, Func, KuroType, FuncCall } from '../types'
import { Scope } from './Scope'

/*
 * Runtime class.
 */
export class Runtime implements IRuntime {
  /**
   * Variables array.
   */
  private variables: Variable[] = []

  /**
   * Functions array.
   */
  private functions: Func[] = []

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onStart(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onEnd(): void {}

  addVariable(name: string, value: KuroType): void {
    this.variables.push({
      name,
      value,
      mutable: true,
    })
  }

  addConstant(name: string, value: KuroType): void {
    this.variables.push({
      name,
      value,
      mutable: false,
    })
  }

  addFunction(func: FuncCall): void

  addFunction(name: string, call: FuncCall): void

  addFunction(nameOrFunc: string | FuncCall, func?: FuncCall): void {
    if (typeof nameOrFunc === 'function') {
      this.functions.push({
        name: nameOrFunc.name,
        call: nameOrFunc as (...args: KuroType[]) => KuroType,
      })
      return
    }

    this.functions.push({
      name: nameOrFunc,
      call: func,
    })
  }

  buildScope(): Scope {
    const scope = new Scope()

    this.variables.forEach((v) => scope.addVariable(v))
    this.functions.forEach((f) => scope.addFunction(f))

    return scope
  }
}
