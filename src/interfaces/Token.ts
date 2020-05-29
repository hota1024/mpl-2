import { TokenKind } from '../types'
import { ILoc } from './Loc'

/*
 * Token interface.
 */
export interface IToken {
  /**
   * Token type.
   */
  type: TokenKind

  /**
   * Token location
   */
  loc: ILoc
}
