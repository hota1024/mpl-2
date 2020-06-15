import chalk from 'chalk'
import { IKuro, IRuntime } from '../interfaces'
import { KuroType } from '../types'
import { Lexer } from './Lexer'
import { Parser } from './Parser'
import { LocatedError } from '../abstracts'
import { Evaluator } from './Evaluator'

/*
 * Kuro class.
 */
export class Kuro implements IKuro {
  /**
   * Runtime.
   */
  readonly runtime: IRuntime

  /**
   * Kuro constructor.
   *
   * @param runtime Runtime.
   */
  constructor(runtime?: IRuntime) {
    this.runtime = runtime
  }

  run(source: string): KuroType {
    const lexer = new Lexer()
    const parser = new Parser()
    const evaluator = new Evaluator(this.runtime)

    try {
      const tokens = lexer.tokenize(source)
      const ast = parser.parse(tokens)

      return evaluator.evaluate(ast)
    } catch (error) {
      if (error instanceof LocatedError) {
        const errorSource = error.loc.extract(source)
        let line = 0
        let lineHead = 0
        let i
        const lines = source.split('\n')

        for (i = 0; i < source.length; ++i) {
          if (source[i] === '\n') {
            lineHead = i + 1
            ++line
          }

          if (i === error.loc.start) {
            break
          }
        }

        const beforeSource = lines[line].slice(lineHead, i)
        const displaySource = beforeSource + chalk.red(errorSource)

        console.log(error.name + `(${error.loc.start}, ${error.loc.end})`)
        console.log(`  at line ${line + 1}`)
        console.log(line + 1 + ' | ' + displaySource)
        console.log(
          ' '.repeat((line + 1).toString().length + 3 + beforeSource.length) +
            '^'.repeat(errorSource.length) +
            ' <-' +
            error.message
        )
      } else {
        throw error
      }
    }
  }
}
