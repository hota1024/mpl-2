import { IToken, ILoc } from '../../interfaces'
import { TokenKind } from '../../types'

/*
 * TokenBase class.
 */
export class TokenBase implements IToken {
  type: TokenKind

  loc: ILoc

  /**
   * TokenBase constructor.
   *
   * @param loc Token location.
   */
  constructor(loc: ILoc) {
    this.loc = loc
  }
}
