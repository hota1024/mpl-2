import { IToken, ILoc } from '../../interfaces'
import { TokenKind } from '../../types'

/*
 * TokenBase class.
 */
export class TokenBase implements IToken {
  type: TokenKind

  loc: ILoc

  constructor(loc: ILoc) {
    this.loc = loc
  }
}
