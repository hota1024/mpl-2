import { Loc } from '../src/classes'

describe('Loc class', () => {
  test('Loc#constructor', () => {
    const loc = new Loc(0, 19)

    expect(loc.start).toBe(0)
    expect(loc.end).toBe(19)
  })

  test('Loc#merge', () => {
    const loc0 = new Loc(3, 10)
    const loc1 = new Loc(0, 6)

    expect(loc0.merge(loc1)).toMatchObject({
      start: 0,
      end: 10,
    })
  })

  test('Loc#extract', () => {
    const loc = new Loc(0, 5)

    expect(loc.extract('Hello, world')).toBe('Hello')
  })
})
