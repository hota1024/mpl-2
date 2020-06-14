import { KuroType } from '../types'

/*
 * Kuro interface.
 */
export interface IKuro {
  /**
   * Run source.
   *
   * @param source Source.
   */
  run(source: string): KuroType
}
