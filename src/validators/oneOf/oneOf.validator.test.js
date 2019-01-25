const { createContext } = require('../../context')
const validator = require('./oneOf.validator')

test('allow null should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'oneOf',
      allow: [null]
    },
    value: null
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('invalid value should return error', () => {
  const ctx = createContext({
    schema: {
      $type: 'oneOf',
      accept: [1, 2, 3]
    },
    value: 4
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      value: {
        message: 'This value is not allowed',
        value: 4
      }
    }
  })
})