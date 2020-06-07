import { BooleanLiteralLexerRule } from '../src/impls'
import { Walker } from '../src/classes'

describe('BooleanLiteraLexerRule class', () => {
  test('BooleanLiteralLexerRule#validate', () => {
    const rule = new BooleanLiteralLexerRule()

    expect(rule.validate(new Walker('true'))).toBeTruthy()
    expect(rule.validate(new Walker('on'))).toBeFalsy()
  })

  test('BooleanLiteralLexerRule#execute', () => {
    const rule = new BooleanLiteralLexerRule()

    expect(rule.execute(new Walker('true'))).toMatchObject({
      kind: 'boolean_literal',
      value: true,
    })
    expect(rule.execute(new Walker('false'))).toMatchObject({
      kind: 'boolean_literal',
      value: false,
    })
  })
})
