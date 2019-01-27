const { createContext } = require('../../context')
const validator = require('./custom.validator')

test('allow null should return no errors', () => {
  const ctx = createContext({
    schema: {
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
      $type: 'custom',
      validation: (value) => {
        if (value === 1) {
          return {
            message: 'The value 1 is not allowed',
            valid: false
          }
        }

        return { valid: true }
      }
    },
    value: 1
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      custom: {
        message: 'The value 1 is not allowed',
        value: 1
      }
    }
  })
})

test('valid value should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'custom',
      validation: () => {
        return { valid: true }
      }
    },
    value: 1
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})