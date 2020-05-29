import { TokenBase } from '.'
import { ILoc } from '../../interfaces'

/*
 * LiteralTokenBase class.
 */
export class LiteralTokenBase<T> extends TokenBase {
  type: 'numeric_literal' | 'string_literal'

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
