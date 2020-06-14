import { KuroType } from './KuroType'

/*
 * FuncCall type.
 */
export type FuncCall = (...args: KuroType[]) => KuroType

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
  call: (...args: KuroType[]) => KuroType
}
