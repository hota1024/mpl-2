import { IRuntime } from './Runtime'
import { KuroType } from '../types'

/*
 * Module interface.
 */
export interface IModule {
  /**
   * Module id.
   */
  id: string

  /**
   * Call on module load.
   *
   * @param runtime Runtime.
   * @param args Module args.
   */
  onLoad(runtime: IRuntime, ...args: KuroType[]): void
}
