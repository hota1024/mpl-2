import { KuroType } from './KuroType'

/*
 * Func type.
 */
export type Func = {
  /**
   * Function name.
   */
  name: string

  /**
   * Function body.
   */
  call: (...args: unknown[]) => KuroType
}
