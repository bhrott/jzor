const { createContext } = require('../../context')
const middleware = require('./allow.middleware')

test('allowing null values should be handled', () => {
  const ctx = createContext({
    schema: {
      allow: [null]
    },
    value: null
  })

  const result = middleware.validate(ctx)

  expect(result).toEqual({
    handled: true
  })
})

test('value mismatching the allowed should not be handled', () => {
  const ctx = createContext({
    schema: {
      allow: [null]
    },
    value: 1
  })

  const result = middleware.validate(ctx)

  expect(result).toEqual({
    handled: false
  })
})

test('not providing allow should not be handled', () => {
  const ctx = createContext({
    schema: {},
    value: null
  })

  const result = middleware.validate(ctx)

  expect(result).toEqual({
    handled: false
  })
})