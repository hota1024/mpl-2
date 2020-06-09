import { IParser } from '../interfaces'
import { Token, Root } from '../types'
import { Walker } from './Walker'
import { Loc } from './Loc'

/*
 * TokenWalker type.
 */
export type TokenWalker = Walker<Token>

/*
 * Parser class.
 */
export class Parser implements IParser {
  parse(tokens: Token[]): Root {
    const walker = new Walker(tokens)

    return {
      kind: 'root',
      statements: [],
      loc: new Loc(0, 0),
    }
  }
}
