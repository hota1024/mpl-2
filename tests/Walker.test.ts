import { Walker } from '../src/classes'

describe('Walker class', () => {
  test('Walker#constructor(Iterable)', () => {
    const walker = new Walker('hello')

    expect(walker['mValues']).toEqual(['h', 'e', 'l', 'l', 'o'])
  })

  test('Walker#constructor(T[])', () => {
    const walker = new Walker([0, 1, 2, 3, 4])

    expect(walker['mValues']).toEqual([0, 1, 2, 3, 4])
  })

  test('Walker#index', () => {
    const walker = new Walker('test')

    expect(walker.index()).toBe(0)
    walker.next()
    expect(walker.index()).toBe(1)
    walker.next()
    expect(walker.index()).toBe(2)
    walker.next()
    expect(walker.index()).toBe(3)
  })

  test('Walker#value', () => {
    const walker = new Walker('test')

    expect(walker.value()).toBe('t')
    walker.next()
    expect(walker.value()).toBe('e')
    walker.next()
    expect(walker.value()).toBe('s')
    walker.next()
    expect(walker.value()).toBe('t')
    walker.next()
  })

  test('Walker#next', () => {
    const walker = new Walker('test')

    expect(walker.next()).toBe('e')
    expect(walker.next()).toBe('s')
    expect(walker.next()).toBe('t')
    expect(walker.next()).toBeUndefined()
  })

  test('Walker#next(number)', () => {
    const walker = new Walker('testtest')

    expect(walker.next(2)).toBe('s')
    expect(walker.next(4)).toBe('s')
  })

  test('Walker#peek(number?)', () => {
    const walker = new Walker('test')

    expect(walker.peek()).toBe('e')
    expect(walker.index()).toBe(0)
    expect(walker.peek(2)).toBe('s')
    expect(walker.index()).toBe(0)
    expect(walker.peek(3)).toBe('t')
    expect(walker.index()).toBe(0)
    expect(walker.peek(4)).toBeUndefined()
    expect(walker.index()).toBe(0)
  })

  test('Walker#match', () => {
    const walker = new Walker('1 == 2')

    expect(walker.match('にゃーん')).toBeFalsy()
    expect(walker.match('1')).toBeTruthy()
    walker.next(2)
    expect(walker.match('==')).toBeTruthy()
    walker.next(3)
    expect(walker.match('2')).toBeTruthy()
  })

  test('Walker#done', () => {
    const walker = new Walker('test')

    expect(walker.done()).toBeFalsy()
    walker.next(4)
    expect(walker.done()).toBeTruthy()
    walker.next()
    expect(walker.done()).toBeTruthy()
  })

  test('Walker#locTo', () => {
    const walker = new Walker('test')

    expect(walker.locTo(2)).toMatchObject({
      start: 0,
      end: 2,
    })
  })

  test('Walker#locFrom', () => {
    const walker = new Walker('test')

    walker.next(3)
    expect(walker.locFrom(0)).toMatchObject({
      start: 0,
      end: 3,
    })
  })

  test('Walker#slice', () => {
    const walker = new Walker('test')

    expect(walker.slice(0, 1)).toEqual(['t'])
    expect(walker.slice(3, 4)).toEqual(['t'])
  })

  test('Walker#sliceFrom', () => {
    const walker = new Walker('test')
    walker.next(4)

    expect(walker.sliceFrom(0)).toEqual(['t', 'e', 's', 't'])
  })
})
