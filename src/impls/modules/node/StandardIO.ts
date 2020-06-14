import * as readline from 'readline'
import * as readlineSync from 'readline-sync'
import { IRuntime } from '../../../interfaces'
import { KuroType } from '../../../types'
import { Module } from '../../../abstracts'

/*
 * StandardIO class.
 */
export class StandardIO extends Module {
  id = 'std_io'

  readline: readline.Interface

  onLoad(runtime: IRuntime): void {
    const p = this.usePrefix('io_')

    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    runtime.addFunction(p('println'), (content: KuroType) => {
      this.readline.write(content + '\n')
    })

    runtime.addFunction(p('print'), (content: KuroType) => {
      this.readline.write(content + '')
    })

    runtime.addFunction(p('input'), (message: KuroType = '') => {
      return readlineSync.question(message)
    })
  }

  onUnload(): void {
    this.readline.close()
  }
}
