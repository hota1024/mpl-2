import {
  RangeCommentLexerRule,
  LexerUnterminatedCommentError,
} from '../src/impls'
import { Walker, Loc } from '../src/classes'

describe('RangeCommentLexerRule class', () => {
  test('RangeCommentLexerRule#constructor', () => {
    const rule = new RangeCommentLexerRule()

    expect(rule.caps).toMatchObject([
      {
        start: '/*',
        end: '*/',
      },
    ])
  })

  test('RangeCommentLexerRule#constructor(params)', () => {
    const rule = new RangeCommentLexerRule({
      caps: [
        {
          start: '###',
          end: '###',
        },
      ],
    })

    expect(rule.caps).toMatchObject([
      {
        start: '###',
        end: '###',
      },
    ])
  })

  test('RangeCommentLexerRule#validate', () => {
    const rule = new RangeCommentLexerRule()

    expect(rule.validate(new Walker('/*'))).toBeTruthy()
    expect(rule.validate(new Walker('/+'))).toBeFalsy()
  })

  test('RangeCommentLexerRule#execute', () => {
    const rule = new RangeCommentLexerRule()

    expect(rule.execute(new Walker('/* hello world */'))).toMatchObject({
      kind: 'range_comment',
      content: ' hello world ',
      loc: new Loc(0, 17),
    })
    expect(() => {
      rule.execute(new Walker('/* hello world'))
    }).toThrow(LexerUnterminatedCommentError)
  })
})
