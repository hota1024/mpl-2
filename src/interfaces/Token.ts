import { TokenKind } from '../types'
import { ILoc } from './Loc'

/*
 * Token interface.
 */
export interface IToken {
  /**
   * Token kind.
   */
  kind: TokenKind

  /**
   * Token location.
   */
  loc: ILoc
}
