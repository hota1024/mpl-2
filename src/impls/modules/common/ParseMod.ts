import { Module } from '../../../abstracts'
import { IRuntime } from '../../../interfaces'

/*
 * ParseMod class.
 */
export class ParseMod extends Module {
  id = 'parse'

  onLoad(runtime: IRuntime): void {
    const p = this.usePrefix('parse_')

    runtime.addFunction(p('int'), (arg: string) => {
      return parseInt(arg)
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onUnload(): void {}
}
