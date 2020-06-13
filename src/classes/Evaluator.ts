import { IEvaluator } from '../interfaces'
import { AST } from 'prettier'
import { KuroType } from '../types'
import { Parser } from './Parser'
import { Lexer } from './Lexer'

/*
 * Evaluator class.
 */
export class Evaluator implements IEvaluator {
  evaluate(ast: AST): KuroType {
    /**
     *
     *
     * とりあえずTODOメモ。
     *
     * - 変数のスコープの解決をどうするか。
     * - 関数の return 省略をどう実装するか。
     *
     *
     */
    return undefined
  }
}

const lexer = new Lexer()
const parser = new Parser()
const evaluator = new Evaluator()
const source = `
10 + 20
`.trim()

const tokens = lexer.tokenize(source)
const ast = parser.parse(tokens)
const result = evaluator.evaluate(ast)

console.log('Result:', result)
