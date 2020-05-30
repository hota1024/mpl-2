import { TokenBase } from './TokenBase'
import { ILoc } from '../../interfaces'

/*
 * LiteralTokenBase type.
 */
export abstract class LiteralTokenBase<T> extends TokenBase {
  /**
   * Literal value.
   */
  value: T

  /**
   * LiteralTokenBase constructor.
   *
   * @param value Literal value.
   * @param loc Token location.
   */
  constructor(value: T, loc: ILoc) {
    super(loc)
    this.value = value
  }
}
