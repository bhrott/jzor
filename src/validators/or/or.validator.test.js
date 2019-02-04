const validator = require('./or.validator')
const { createContext } = require('../../context')

test('valid schema should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'or',
      schemas: [
        { $type: 'boolean' },
        { $type: 'string' }
      ]
    },
    value: 'Gandalf'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('valid value for the second schema should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'or',
      schemas: [{ $type: 'string' }]
    },
    value: 'Gandalf'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('invalid value should return errors', () => {
  const schemas = [{ $type: 'string' }, { $type: 'number' }]

  const ctx = createContext({
    schema: {
      $type: 'or',
      schemas
    },
    value: true
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      schema: {
        message: 'No schema matched with the value',
        schemas,
        value: true,
        errors: [
          {
            $root: {
              type: {
                message: 'The value should be a string',
                value: true
              }
            }
          },
          {
            $root: {
              type: {
                message: 'The value should be a number',
                value: true
              }
            }
          }
        ]
      }
    }
  })
})
