const { createContext } = require('../../context')
const validator = require('./boolean.validator')

test('allow null value should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'boolean',
      allow: [null]
    },
    value: null
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('invalid type should return errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'boolean'
    },
    value: 'a'
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    '$root': {
      type: {
        message: 'The value should be a boolean',
        value: ctx.value
      }
    }
  })
})

test('valid type should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'boolean'
    },
    value: false
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})