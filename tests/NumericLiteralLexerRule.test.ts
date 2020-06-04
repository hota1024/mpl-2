import {
  NumericLiteralLexerRule,
  NumericLiteralLexerRuleParams,
  LexerDecimalPointHasAlreadyBeenUsedError,
} from '../src/impls'
import { Walker, Loc } from '../src/classes'

describe('NumericLiteralLexerRule class', () => {
  test('NumericLiteralLexerRule#constructor', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rule = new NumericLiteralLexerRule()
  })

  test('NumericLiteralLexerRule#constructor(params)', () => {
    const params: NumericLiteralLexerRuleParams = {
      prefix: /$/,
      number: /\d/,
      decimalPoint: /_/,
    }
    const rule = new NumericLiteralLexerRule(params)

    expect(rule.prefix).toBe(params.prefix)
    expect(rule.number).toBe(params.number)
    expect(rule.decimalPoint).toBe(params.decimalPoint)
  })

  test('NumericLiteralLexerRule#validate', () => {
    const rule = new NumericLiteralLexerRule()

    expect(rule.validate(new Walker('10'))).toBeTruthy()
    expect(rule.validate(new Walker('.3'))).toBeTruthy()

    expect(rule.validate(new Walker('test'))).toBeFalsy()
  })

  test('NumericLiteralLexerRule#execute', () => {
    const rule = new NumericLiteralLexerRule()

    expect(rule.execute(new Walker('10'))).toMatchObject({
      kind: 'numeric_literal',
      value: 10,
      loc: new Loc(0, 2),
    })
    expect(rule.execute(new Walker('0.3'))).toMatchObject({
      kind: 'numeric_literal',
      value: 0.3,
      loc: new Loc(0, 3),
    })

    expect(() => {
      rule.execute(new Walker('0.0.2'))
    }).toThrow(LexerDecimalPointHasAlreadyBeenUsedError)
  })
})
