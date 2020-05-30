import { IToken, ILoc } from '../../interfaces'
import { TokenKind } from '../../types'

/*
 * TokenBase class.
 */
export abstract class TokenBase implements IToken {
  kind: TokenKind

  loc: ILoc

  /**
   * TokenBase class.
   *
   * @param loc Token location.
   */
  constructor(loc: ILoc) {
    this.loc = loc
  }
}
