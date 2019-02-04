const { createContext } = require('../../context')
const middleware = require('./reject.middleware')

test('rejecting null value should set error and return as handled', () => {
  const ctx = createContext({
    schema: {
      reject: [null]
    },
    value: null
  })

  const result = middleware.validate(ctx)

  expect(result).toEqual({
    handled: true
  })

  expect(ctx.errors).toEqual({
    $root: {
      reject: {
        message: 'This value is not allowed',
        value: null
      }
    }
  })
})

test('non matched value for rejection should return as not handled', () => {
  const ctx = createContext({
    schema: {
      reject: [1]
    },
    value: null
  })

  const result = middleware.validate(ctx)

  expect(result).toEqual({
    handled: false
  })
})

test('not matching middleware should return as not handled', () => {
  const ctx = createContext({
    schema: {},
    value: null
  })

  const result = middleware.validate(ctx)

  expect(result).toEqual({
    handled: false
  })
})