import { IfToken, ElseToken, ConstToken, LetToken } from '../'
import { FnToken } from './FnToken'

/*
 * ReservedKeywordToken type.
 */
export type ReservedKeywordToken =
  | IfToken
  | ElseToken
  | ConstToken
  | LetToken
  | FnToken
