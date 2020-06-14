import { Module } from '../abstracts'
import { IRuntime } from './Runtime'

/*
 * ModuleManager interface.
 */
export interface IModuleManager {
  /**
   * Register a module.
   *
   * @param id Module ID.
   * @param module Module.
   */
  register(id: string, module: Module)

  /**
   * Register a module.
   *
   * @param module Module.
   */
  register(module: Module)

  /**
   * Load module to runtime.
   *
   * @param id Module ID.
   * @param runtime Runtime.
   */
  loadTo(id: string, runtime: IRuntime): this
}
