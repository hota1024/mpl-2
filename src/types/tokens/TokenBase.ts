import { TokenKind } from '../TokenKind'
import { ILoc } from '../../interfaces'

/*
 * TokenBase type.
 */
export type TokenBase = {
  /**
   * Token kind.
   */
  kind: TokenKind

  /**
   * Token location.
   */
  loc: ILoc
}
