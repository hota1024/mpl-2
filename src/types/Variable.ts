import { KuroType } from './KuroType'

/*
 * Variable type.
 */
export type Variable = {
  /**
   * Variable name.
   */
  name: string

  /**
   * Whether mutable variable.
   */
  mutable: boolean

  /**
   * Variable value.
   */
  value: KuroType
}
