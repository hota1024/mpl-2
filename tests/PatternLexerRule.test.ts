import { PatternLexerRule } from '../src/impls'
import { Walker, Loc } from '../src/classes'

describe('PatternLexerRule class', () => {
  test('PatternLexerRule#constructor(Pattern[])', () => {
    const rule = new PatternLexerRule([
      {
        pattern: '+',
        kind: 'plus',
      },
      {
        pattern: '==',
        kind: 'equals_equals',
      },
    ])

    expect(rule.patterns).toMatchObject([
      {
        pattern: '==',
        kind: 'equals_equals',
      },
      {
        pattern: '+',
        kind: 'plus',
      },
    ])
  })

  test('PatternLexerRule#constructor(PatternMaker)', () => {
    const rule = new PatternLexerRule((pattern) => [
      pattern('==', 'equals_equals'),
      pattern('+', 'plus'),
    ])

    expect(rule.patterns).toMatchObject([
      {
        pattern: '==',
        kind: 'equals_equals',
      },
      {
        pattern: '+',
        kind: 'plus',
      },
    ])
  })

  test('PatternLexerRule#validate', () => {
    const rule = new PatternLexerRule([
      {
        pattern: '+',
        kind: 'plus',
      },
    ])

    expect(rule.validate(new Walker('+'))).toBeTruthy()
    expect(rule.validate(new Walker('!!!'))).toBeFalsy()
  })

  test('PatternLexerRule#execute', () => {
    const rule = new PatternLexerRule([
      {
        pattern: '+',
        kind: 'plus',
      },
      {
        pattern: '-',
        kind: 'minus',
      },
      {
        pattern: '==',
        kind: 'equals_equals',
      },
    ])

    expect(rule.execute(new Walker('+'))).toMatchObject({
      kind: 'plus',
      loc: new Loc(0, 1),
    })
    expect(rule.execute(new Walker('-'))).toMatchObject({
      kind: 'minus',
      loc: new Loc(0, 1),
    })
    expect(rule.execute(new Walker('=='))).toMatchObject({
      kind: 'equals_equals',
      loc: new Loc(0, 2),
    })
  })
})
