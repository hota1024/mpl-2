import chalk from 'chalk'
import { Parser } from './classes/Parser'
import { Lexer } from './classes'

class Logger {
  constructor(private ignoreKeys: string[] = []) {}

  log(object: unknown): void {
    console.log(this.getObjectString(object, 0))
  }

  private getObjectString(object: unknown, offset: number, keyRight = false) {
    if (typeof object === 'number') {
      return chalk.blue(object)
    }

    if (typeof object === 'boolean') {
      return chalk.blue(object)
    }

    if (typeof object === 'string') {
      return chalk.red(`"${object}"`)
    }

    if (Array.isArray(object)) {
      let string = (keyRight ? '' : this.getSpaces(offset)) + '[\n'

      Object.keys(object).forEach((key) => {
        if (this.ignoreKeys.find((k) => k === key)) {
          return
        }
        string += this.getObjectString(object[key], offset + 1)
        string += '\n'
      })

      string += this.getSpaces(offset) + ']'
      return string
    }

    if (typeof object === 'object') {
      let string = (keyRight ? '' : this.getSpaces(offset)) + '{\n'

      Object.keys(object).forEach((key) => {
        if (this.ignoreKeys.find((k) => k === key)) {
          return
        }
        string += this.getSpaces(offset + 1) + chalk.green(key) + ' '
        string += this.getObjectString(object[key], offset + 1, true)
        string += '\n'
      })

      string += this.getSpaces(offset) + '}'
      return string
    }

    if (typeof object === 'undefined') {
      return chalk.grey('undefined')
    }

    return chalk.red.bold('<error>')
  }

  private getSpaces(offset: number) {
    let string = ''
    const colors = [chalk.gray]
    const space = '¬'

    for (let i = 0; i < offset; ++i) {
      string += colors[i % colors.length](space)
    }

    return string
  }
}

console.clear()
const lexer = new Lexer()
const parser = new Parser()
const logger = new Logger(['loc'])
const source = `
fn fib(num) {
  if num < 3 {
    return 1
  }

  fib(num - 1) + fib(num - 2)
}

print(fib(10))
`.trim()

console.log('============Input===========')
console.log('> Input:', source)
console.log()

console.log('==========Tokenize==========')
const tokens = lexer.tokenize(source)
logger.log(tokens)
console.log()

console.log('============Parse===========')
const ast = parser.parse(tokens)
console.log(source)
logger.log(ast)
console.log()
