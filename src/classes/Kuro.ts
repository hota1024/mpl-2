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
        console.log(error.loc)
      }

      throw error
    }
  }
}
