import { IModule, IRuntime } from '../interfaces'
import { KuroType } from '../types'

/*
 * Module class.
 */
export abstract class Module implements IModule {
  abstract id: string

  abstract onLoad(runtime: IRuntime, ...args: KuroType[]): void

  /**
   * Returns prefix function.
   *
   * @param prefix Prefix.
   */
  protected usePrefix(prefix: string) {
    return (string: string): string => {
      return prefix + string
    }
  }
}
