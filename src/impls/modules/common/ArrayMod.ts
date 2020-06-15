import { Module } from '../../../abstracts'
import { IRuntime } from '../../../interfaces'
import { KuroType } from '../../../types'

/*
 * ArrayMod class.
 */
export class ArrayMod extends Module {
  id = 'array'

  readonly arrays = new Map<string, KuroType[]>()

  readonly addressChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$%&=~|+*?_@;:,./_`'.split(
    ''
  )

  onLoad(runtime: IRuntime): void {
    const p = this.usePrefix('array_')

    runtime.addFunction('array', (...args: KuroType[]) => {
      const pointer = this.createArrayPointer()
      this.arrays.set(pointer, [...args])
      return pointer
    })

    runtime.addFunction(p('free'), (pointer: string) => {
      return this.arrays.delete(pointer)
    })

    runtime.addFunction('is_array', (pointer: string) => {
      return this.arrays.has(pointer)
    })

    runtime.addFunction(p('push'), (pointer: string, ...items: KuroType[]) => {
      const array = this.arrays.get(pointer)
      array.push(...items)
      return array.length
    })

    runtime.addFunction(p('get'), (pointer: string, index: number) => {
      const array = this.arrays.get(pointer)
      return array[index]
    })

    runtime.addFunction(p('length'), (pointer: string) => {
      return this.arrays.get(pointer).length
    })

    runtime.addFunction(p('last_index'), (pointer: string) => {
      return this.arrays.get(pointer).length - 1
    })

    runtime.addFunction(p('debug'), (pointer: string) => {
      const array = this.arrays.get(pointer)

      return `Array#${pointer} [\n${array.map((i) => `  ${i}`).join(',')}\n]`
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onUnload(): void {}

  private createArrayPointer(): string {
    let address = ''

    for (let i = 0; i < 16; ++i) {
      address += this.addressChars[
        Math.floor(Math.random() * this.addressChars.length)
      ]
    }

    return `arr${address}`
  }
}
