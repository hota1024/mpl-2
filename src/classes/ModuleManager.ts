import { IModuleManager, IModule, IRuntime } from '../interfaces'

/*
 * ModuleData type.
 */
export type ModuleData = {
  /**
   * Module ID.
   */
  id: string

  /**
   * Module.
   */
  module: IModule
}

/*
 * ModuleManager class.
 */
export class ModuleManager implements IModuleManager {
  /**
   * Modules.
   */
  private modules: ModuleData[] = []

  register(id: string, module: IModule): void

  register(module: IModule): void

  register(idOrModule: string | IModule, module?: IModule): void {
    if (typeof idOrModule === 'string') {
      this.modules.push({
        id: idOrModule,
        module,
      })
    } else {
      this.modules.push({
        id: idOrModule.id,
        module: idOrModule,
      })
    }
  }

  loadTo(id: string, runtime: IRuntime): void {
    const module = this.getModule(id)
    if (!module) {
      throw new Error(`module '${id}' cannnot load.`)
    }

    module.module.onLoad(runtime)
  }

  unloadFrom(id: string, runtime: IRuntime): void {
    const module = this.getModule(id)
    if (!module) {
      throw new Error(`module '${id}' cannnot unload.`)
    }

    module.module.onUnload(runtime)
  }

  /**
   * Returns module.
   *
   * @param id Module ID.
   */
  private getModule(id: string) {
    return this.modules.find((m) => m.id === id)
  }
}
