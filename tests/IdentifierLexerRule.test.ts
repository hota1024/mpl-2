import { IdentifierLexerRule } from '../src/impls'
import { Walker, Loc } from '../src/classes'

describe('IdentifierLexerRule class', () => {
  test('IdentifierLexerRule#constructor', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rule = new IdentifierLexerRule()
  })

  test('IdentifierLexerRule#constructor(params)', () => {
    const prefix = /\$/
    const identifierChar = /[a-z]/
    const rule = new IdentifierLexerRule({
      prefix,
      identifierChar,
    })

    expect(rule.prefix).toBe(prefix)
    expect(rule.identifierChar).toBe(identifierChar)
  })

  test('IdentifierLexerRule#validate', () => {
    const rule = new IdentifierLexerRule()

    expect(rule.validate(new Walker('abc'))).toBeTruthy()
    expect(rule.validate(new Walker('123abc'))).toBeFalsy()
  })

  test('IdentifierLexerRule#execute', () => {
    const rule = new IdentifierLexerRule()

    expect(rule.execute(new Walker('abc'))).toMatchObject({
      kind: 'identifier',
      loc: new Loc(0, 3),
    })
  })
})
