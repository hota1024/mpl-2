import { IRuntime } from '../../../interfaces'
import { Module } from '../../../abstracts'

/*
 * NodeModule class.
 */
export class NodeModule extends Module {
  id = 'node'

  onLoad(runtime: IRuntime): void {
    const p = this.usePrefix('node_')

    runtime.addFunction(p('eval'), eval)

    runtime.addFunction(p('env'), (key: string, value: string) => {
      if (value) {
        process.env[key] = value
      }

      return process.env[key]
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onUnload(): void {}
}
