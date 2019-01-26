const { createContext } = require('../../context')
const validator = require('./array.validator')

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

test('invalid array should return an error', () => {
  const ctx = createContext({
    schema: {},
    value: 1
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      type: {
        message: 'The value should be an array',
        value: 1
      }
    }
  })
})

test('invalid min items should return an error', () => {
  const ctx = createContext({
    schema: {
      $type: 'array',
      minItems: 1,
      item: [{ $type: 'string' }]
    },
    value: []
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      minItems: {
        message: 'This field should contain at least 1 item(s)',
        minItems: 1,
        currentItems: 0,
        value: []
      }
    }
  })
})

test('invalid max items should return an error', () => {
  const ctx = createContext({
    schema: {
      $type: 'array',
      maxItems: 1,
      item: [{ $type: 'string' }]
    },
    value: ['a', 'b']
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      maxItems: {
        message: 'This field should contain at maximun 1 item(s)',
        maxItems: 1,
        currentItems: 2,
        value: ['a', 'b']
      }
    }
  })
})

test('invalid item definition should return an error', () => {
  const ctx = createContext({
    schema: {
      $type: 'array',
      item: [
        {
          $type: 'string'
        }
      ]
    },
    value: ['sword', 2]
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      $1: {
        $root: { type: { message: 'The value should be a string', value: 2 } }
      }
    }
  })
})

test('valid second item definition should be valid', () => {
  const ctx = createContext({
    schema: {
      $type: 'array',
      item: [
        {
          $type: 'string',
          minLength: 10
        },
        {
          $type: 'string'
        }
      ]
    },
    value: ['sword', 'sword']
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('failed object prop inside the array should return an error', () => {
  const ctx = createContext({
    schema: {
      $type: 'array',
      item: [
        {
          $type: 'object',
          props: {
            name: {
              $type: 'string'
            },
            weapons: {
              $type: 'array',
              item: [
                {
                  $type: 'object',
                  props: {
                    title: {
                      $type: 'string'
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    },
    value: [
      {
        name: 'Darth Vader',
        weapons: [
          {
            title: null
          }
        ]
      }
    ]
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      $0: {
        $root: {
          weapons: {
            $0: {
              $root: {
                title: {
                  type: { message: 'The value should be a string', value: null }
                }
              }
            }
          }
        }
      }
    }
  })
})
