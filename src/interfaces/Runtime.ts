import { KuroType } from '../types'
import { Scope } from '../classes/Scope'

/*
 * Runtime interface.
 */
export interface IRuntime {
  /**
   * Add variable.
   *
   * @param name Name.
   * @param value Value.
   */
  addVariable(name: string, value: KuroType): void

  /**
   * Add named function.
   *
   * @param func Function.
   */
  addFunction(func: (...args: KuroType[]) => KuroType): void

  /**
   * Add function.
   *
   * @param name Name.
   * @param call Function.
   */
  addFunction(name: string, call: (...args: KuroType[]) => KuroType): void

  /**
   * Build scope.
   */
  buildScope(): Scope
}
