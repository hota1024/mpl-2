import { Lexer } from '../src/classes'

describe('Lexer class', () => {
  test('Lexer#tokenize', () => {
    const lexer = new Lexer()

    expect(lexer.tokenize('const a = 10')).toMatchObject([
      {
        kind: 'const',
      },
      {
        kind: 'identifier',
        identifier: 'a',
      },
      {
        kind: 'equals',
      },
      {
        kind: 'numeric_literal',
        value: 10,
      },
    ])
    expect(
      lexer.tokenize('if a == "hello" {\n  print("world")\n}')
    ).toMatchObject([
      {
        kind: 'if',
      },
      {
        kind: 'identifier',
        identifier: 'a',
      },
      {
        kind: 'equals_equals',
      },
      {
        kind: 'string_literal',
        value: 'hello',
      },
      {
        kind: 'left_curly_braces',
      },
      {
        kind: 'new_line',
      },
      {
        kind: 'identifier',
        identifier: 'print',
      },
      {
        kind: 'left_parenthesis',
      },
      {
        kind: 'string_literal',
        value: 'world',
      },
      {
        kind: 'right_parenthesis',
      },
      {
        kind: 'new_line',
      },
      {
        kind: 'right_curly_braces',
      },
    ])
  })
})
