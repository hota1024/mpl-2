import { TokenKind } from '../TokenKind'
import { ILoc } from '../../interfaces'

/*
 * TokenBase type.
 */
export type TokenBase<Kind extends TokenKind> = {
  /**
   * Token kind.
   */
  kind: Kind

  /**
   * Token location.
   */
  loc: ILoc
}
