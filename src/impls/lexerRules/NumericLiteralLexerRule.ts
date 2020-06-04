import { ILexerRule } from '../../interfaces'
import { Walker } from '../../classes'
import { LexerDecimalPointHasAlreadyBeenUsedError } from '../errors'
import { NumericLiteralToken } from '../../types'

/*
 * NumericLiteralLexerRuleParams type.
 */
export type NumericLiteralLexerRuleParams = {
  /**
   * Number prefix regexp.
   */
  prefix: RegExp

  /**
   * Number regexp.
   */
  number: RegExp

  /**
   * Decimal point regexp.
   */
  decimalPoint: RegExp
}

/*
 * NumericLiteralLexerRule class.
 */
export class NumericLiteralLexerRule implements ILexerRule {
  /**
   * Number prefix regexp.
   */
  readonly prefix = /^\d|\./

  /**
   * Number regexp.
   */
  readonly number = /\d/

  /**
   * Decimal point regexp.
   */
  readonly decimalPoint = /\./

  /**
   * NumericLiteralLexerRule constructor.
   *
   * @param params Rule params.
   */
  constructor(params?: Partial<NumericLiteralLexerRuleParams>) {
    this.prefix = params?.prefix ?? this.prefix
    this.number = params?.number ?? this.number
    this.decimalPoint = params?.decimalPoint ?? this.decimalPoint
  }

  validate(walker: Walker<string>): boolean {
    return this.prefix.test(walker.value())
  }

  execute(walker: Walker<string>): NumericLiteralToken {
    const start = walker.index()
    let hasDecimalPoint = false

    while (
      !walker.done() &&
      (this.number.test(walker.value()) ||
        this.decimalPoint.test(walker.value()))
    ) {
      if (this.decimalPoint.test(walker.value())) {
        if (hasDecimalPoint) {
          throw new LexerDecimalPointHasAlreadyBeenUsedError(walker.locTo(1))
        } else {
          hasDecimalPoint = true
        }
      }

      walker.next()
    }

    return {
      kind: 'numeric_literal',
      value: Number(walker.sliceFrom(start).join('')),
      loc: walker.locFrom(start),
    }
  }
}
