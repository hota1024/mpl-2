import { IRuntime } from './Runtime'
import { IModule } from './Module'

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
  register(id: string, module: IModule)

  /**
   * Register a module.
   *
   * @param module Module.
   */
  register(module: IModule)

  /**
   * Load module to runtime.
   *
   * @param id Module ID.
   * @param runtime Runtime.
   */
  loadTo(id: string, runtime: IRuntime): void

  /**
   * Unload module from runtime.
   *
   * @param id Module ID.
   * @param runtime Runtime.
   */
  unloadFrom(id: string, runtime: IRuntime): void
}
