import { Module } from '../../../abstracts'
import { IRuntime } from '../../../interfaces'

/*
 * MathMod class.
 */
export class MathMod extends Module {
  id = 'math'

  onLoad(runtime: IRuntime): void {
    const p = this.usePrefix('math_')

    runtime.addConstant(p('E'), Math.PI)
    runtime.addConstant(p('LN2'), Math.LN2)
    runtime.addConstant(p('LN10'), Math.LN10)
    runtime.addConstant(p('LOG2E'), Math.LOG2E)
    runtime.addConstant(p('LOG10E'), Math.LOG10E)
    runtime.addConstant(p('PI'), Math.PI)
    runtime.addConstant(p('SQRT1_2'), Math.SQRT1_2)
    runtime.addConstant(p('SQRT2'), Math.SQRT2)

    runtime.addFunction(p('abs'), Math.abs)
    runtime.addFunction(p('acos'), Math.acos)
    runtime.addFunction(p('acosh'), Math.acosh)
    runtime.addFunction(p('asin'), Math.asin)
    runtime.addFunction(p('asinh'), Math.asinh)
    runtime.addFunction(p('atan'), Math.atan)
    runtime.addFunction(p('atanh'), Math.atanh)
    runtime.addFunction(p('atan2'), Math.atan2)
    runtime.addFunction(p('cbrt'), Math.cbrt)
    runtime.addFunction(p('ceil'), Math.ceil)
    runtime.addFunction(p('clz32'), Math.clz32)
    runtime.addFunction(p('cos'), Math.cos)
    runtime.addFunction(p('cosh'), Math.cosh)
    runtime.addFunction(p('exp'), Math.exp)
    runtime.addFunction(p('expm1'), Math.expm1)
    runtime.addFunction(p('floor'), Math.floor)
    runtime.addFunction(p('fround'), Math.fround)
    runtime.addFunction(p('hypot'), Math.hypot)
    runtime.addFunction(p('imul'), Math.imul)
    runtime.addFunction(p('log'), Math.log)
    runtime.addFunction(p('log1p'), Math.log1p)
    runtime.addFunction(p('log10'), Math.log10)
    runtime.addFunction(p('log2'), Math.log2)
    runtime.addFunction(p('max'), Math.max)
    runtime.addFunction(p('min'), Math.min)
    runtime.addFunction(p('pow'), Math.pow)
    runtime.addFunction(p('random'), Math.random)
    runtime.addFunction(p('round'), Math.round)
    runtime.addFunction(p('sign'), Math.sign)
    runtime.addFunction(p('sin'), Math.sin)
    runtime.addFunction(p('sinh'), Math.sinh)
    runtime.addFunction(p('sqrt'), Math.sqrt)
    runtime.addFunction(p('tan'), Math.tan)
    runtime.addFunction(p('tanh'), Math.tanh)
    runtime.addFunction(p('trunc'), Math.trunc)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onUnload(): void {}
}
