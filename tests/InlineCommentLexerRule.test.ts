import { InlineCommentLexerRule } from '../src/impls'
import { Walker, Loc } from '../src/classes'

describe('InlineCommentLexerRule class', () => {
  test('InlineCommentLexerRule#constructor', () => {
    const rule = new InlineCommentLexerRule()

    expect(rule.prefixes).toEqual(['//'])
  })

  test('InlineCommentLexerRule#constructor(params)', () => {
    const rule = new InlineCommentLexerRule({
      prefixes: ['//', '#'],
    })

    expect(rule.prefixes).toEqual(['//', '#'])
  })

  test('InlineCommentLexerRule#validate', () => {
    const rule = new InlineCommentLexerRule()

    expect(rule.validate(new Walker('// a comment'))).toBeTruthy()
    expect(rule.validate(new Walker('not a comment'))).toBeFalsy()
  })

  test('InlineCommentLexerRule#execute', () => {
    const rule = new InlineCommentLexerRule()

    expect(rule.execute(new Walker('// hello world'))).toMatchObject({
      kind: 'inline_comment',
      content: ' hello world',
      loc: new Loc(0, 14),
    })
  })
})
