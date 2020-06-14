import { KuroType, FuncCall } from '../types'
import { Scope } from '../classes/Scope'

/*
 * Runtime interface.
 */
export interface IRuntime {
  /**
   * Call on runtime start.
   */
  onStart(): void

  /**
   * Call on runtime end.
   */
  onEnd(): void

  /**
   * Add variable.
   *
   * @param name Name.
   * @param value Value.
   */
  addVariable(name: string, value: KuroType): void

  /**
   * Add constant.
   *
   * @param name Name.
   * @param value Value.
   */
  addConstant(name: string, value: KuroType): void

  /**
   * Add named function.
   *
   * @param func Function.
   */
  addFunction(func: FuncCall): void

  /**
   * Add function.
   *
   * @param name Name.
   * @param call Function.
   */
  addFunction(name: string, call: FuncCall): void

  /**
   * Build scope.
   */
  buildScope(): Scope
}
