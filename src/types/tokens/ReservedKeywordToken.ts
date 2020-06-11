import { IfToken, ElseToken, ConstToken, LetToken } from '../'
import { FnToken } from './FnToken'
import { WhileToken } from './WhileToken'

/*
 * ReservedKeywordToken type.
 */
export type ReservedKeywordToken =
  | IfToken
  | ElseToken
  | ConstToken
  | LetToken
  | FnToken
  | WhileToken
