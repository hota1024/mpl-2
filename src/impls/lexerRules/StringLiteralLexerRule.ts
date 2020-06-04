import { ILexerRule } from '../../interfaces'
import { Walker } from '../../classes'
import { StringLiteralToken } from '../../types'
import { LexerUnterminatedStringLiteralError } from '../errors'

/*
 * StringLiteralCap type.
 */
export type StringLiteralCap = {
  /**
   * Start cap.
   */
  start: string

  /**
   * End cap.
   */
  end: string

  /**
   * Whether allow new line.
   */
  allowNewLine: boolean
}

/*
 * StringLiteralLexerRuleParams type.
 */
export type StringLiteralLexerRuleParams = {
  /**
   * String literal caps.
   */
  caps: StringLiteralCap[]

  /**
   * Escape chars.
   */
  escapes: string[]
}

/*
 * StringLiteralLexerRule class.
 */
export class StringLiteralLexerRule implements ILexerRule {
  /**
   * String literal caps.
   */
  caps: StringLiteralCap[] = [
    {
      start: `"`,
      end: `"`,
      allowNewLine: false,
    },
  ]

  /**
   * Escape chars.
   */
  escapes = ['\\']

  /**
   * StringLiteralLexerRule constructor.
   *
   * @param params Rule paramas.
   */
  constructor(params?: Partial<StringLiteralLexerRuleParams>) {
    this.caps = params?.caps ?? this.caps
    this.escapes = params?.escapes ?? this.escapes
  }

  validate(walker: Walker<string>): boolean {
    return !!this.getCap(walker)
  }

  execute(walker: Walker<string>): StringLiteralToken {
    const cap = this.getCap(walker)
    const start = walker.index()

    let escape = false
    let value = ''

    walker.next(cap.start.length)

    while (true as const) {
      if (walker.done() || (walker.value() === '\n' && !cap.allowNewLine)) {
        throw new LexerUnterminatedStringLiteralError(walker.locFrom(start))
      } else if (walker.match(cap.end) && !escape) {
        console.log(escape)
        walker.next(cap.end.length)
        break
      } else if (this.isEscape(walker.value())) {
        escape = !escape
      } else {
        value += walker.value()
        escape = false
      }

      walker.next()
    }

    return {
      kind: 'string_literal',
      value,
      loc: walker.locFrom(start),
    }
  }

  /**
   * Returns cap by walker's match.
   *
   * @param walker Source walker.
   */
  private getCap(walker: Walker<string>) {
    return this.caps.find((cap) => !!walker.match(cap.start))
  }

  /**
   * Returns whether char is a escape char.
   *
   * @param char Char.
   */
  private isEscape(char: string) {
    return !!this.escapes.find((escape) => escape === char)
  }
}
