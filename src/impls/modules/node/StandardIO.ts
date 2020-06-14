import * as readlineSync from 'readline-sync'
import { IRuntime } from '../../../interfaces'
import { KuroType } from '../../../types'
import { Module } from '../../../abstracts'

/*
 * StandardIO class.
 */
export class StandardIO extends Module {
  id = 'std_io'

  onLoad(runtime: IRuntime): void {
    const p = this.usePrefix('io_')
    readlineSync.setPrompt('')

    runtime.addFunction(p('println'), (content: KuroType) => {
      process.stdout.write(content + '\n')
    })

    runtime.addFunction(p('print'), (content: KuroType) => {
      process.stdin.write(content + '')
    })

    runtime.addFunction(p('input'), () => {
      return readlineSync.prompt()
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onUnload(): void {}
}
