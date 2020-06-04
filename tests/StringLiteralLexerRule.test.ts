import {
  StringLiteralLexerRule,
  LexerUnterminatedStringLiteralError,
} from '../src/impls'
import { Walker, Loc } from '../src/classes'

describe('StringLiteralLexerRule class', () => {
  test('StringLiteralLexerRule#constructor', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rule = new StringLiteralLexerRule()
  })

  test('StringLiteralLexerRule#constructor(params)', () => {
    const rule = new StringLiteralLexerRule({
      caps: [
        {
          start: '<',
          end: '>',
          allowNewLine: false,
        },
      ],
      escapes: ['%'],
    })

    expect(rule.caps).toEqual([
      {
        start: '<',
        end: '>',
        allowNewLine: false,
      },
    ])
    expect(rule.escapes).toEqual(['%'])
  })

  test('StringLiteralLexerRule#validate', () => {
    const rule = new StringLiteralLexerRule()

    expect(rule.validate(new Walker('"a string"'))).toBeTruthy()
    expect(rule.validate(new Walker('not a string'))).toBeFalsy()
  })

  test('StringLiteralLexerRule#execute', () => {
    const rule = new StringLiteralLexerRule()

    expect(rule.execute(new Walker('"hello world"'))).toMatchObject({
      kind: 'string_literal',
      value: 'hello world',
      loc: new Loc(0, 13),
    })
    expect(
      rule.execute(new Walker('"the program says \\"hello world\\""'))
    ).toMatchObject({
      kind: 'string_literal',
      value: 'the program says "hello world"',
      loc: new Loc(0, 34),
    })

    expect(() => {
      rule.execute(new Walker('"hello world'))
    }).toThrow(LexerUnterminatedStringLiteralError)
  })

  test('StringLiteralLexerRule#execute with option', () => {
    const rule = new StringLiteralLexerRule({
      caps: [
        {
          start: '"""',
          end: '"""',
          allowNewLine: true,
        },
      ],
    })

    expect(rule.execute(new Walker('"""hello\nworld"""'))).toMatchObject({
      kind: 'string_literal',
      value: 'hello\nworld',
      loc: new Loc(0, 17),
    })
  })
})
