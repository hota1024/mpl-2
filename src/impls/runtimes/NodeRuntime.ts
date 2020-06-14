import { Runtime, ModuleManager } from '../../classes'
import { StandardIO } from '../modules'

/*
 * NodeRuntime class.
 */
export class NodeRuntime extends Runtime {
  /**
   * Loaded module id array.
   */
  private loadedModules: string[] = []

  /**
   * Modules.
   */
  private modules = new ModuleManager()

  constructor() {
    super()
    this.modules.register(new StandardIO())

    this.addFunction('use_mod', (id: string) => {
      this.modules.loadTo(id, this)
      this.loadedModules.push(id)
    })
  }

  onEnd(): void {
    for (const id of this.loadedModules) {
      this.modules.unloadFrom(id, this)
    }
  }
}
