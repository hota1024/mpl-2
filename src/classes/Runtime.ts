import { IRuntime } from '../interfaces'
import { Variable, Func, KuroType, FuncCall } from '../types'
import { Scope } from './Scope'

/*
 * Runtime class.
 */
export class Runtime implements IRuntime {
  /**
   * Scope.
   */
  private scope = new Scope()

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onStart(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onEnd(): void {}

  addVariable(name: string, value: KuroType): void {
    this.scope.addVariable({
      name,
      value,
      mutable: true,
    })
  }

  addConstant(name: string, value: KuroType): void {
    this.scope.addVariable({
      name,
      value,
      mutable: false,
    })
  }

  addFunction(func: FuncCall): void

  addFunction(name: string, call: FuncCall): void

  addFunction(nameOrFunc: string | FuncCall, func?: FuncCall): void {
    if (typeof nameOrFunc === 'function') {
      this.scope.addFunction({
        name: nameOrFunc.name,
        call: nameOrFunc as (...args: KuroType[]) => KuroType,
      })
      return
    }

    this.scope.addFunction({
      name: nameOrFunc,
      call: func,
    })
  }

  buildScope(): Scope {
    return this.scope
  }
}
