const { createContext } = require('../../context')
const validator = require('./object.validator')

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

test('invalid object should return an error', () => {
  const ctx = createContext({
    schema: {},
    value: 1
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      type: {
        message: 'The value should be an object',
        value: 1
      }
    }
  })
})

test('invalid prop value should return an error', () => {
  const ctx = createContext({
    value: {
      name: 'Chapolin'
    },
    schema: {
      $type: 'object',
      props: {
        name: {
          $type: 'string',
          maxLength: 5
        }
      }
    }
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    '$root.name': {
      maxLength: {
        message: 'The max length for this field is 5',
        maxLength: 5,
        currentLength: 8,
        value: 'Chapolin'
      }
    }
  })
})

test('nested invalid prop should return errors', () => {
  const ctx = createContext({
    value: {
      name: 'Chapolin',
      weapon: {
        title: 'Hammer'
      }
    },
    schema: {
      $type: 'object',
      props: {
        name: {
          $type: 'string',
          maxLength: 5
        },
        weapon: {
          $type: 'object',
          props: {
            title: {
              $type: 'string',
              minLength: 10
            }
          }
        }
      }
    }
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({ 
    '$root.name': {
      maxLength: {
        message: 'The max length for this field is 5',
        maxLength: 5,
        currentLength: 8,
        value: 'Chapolin'
      }
    },
    '$root.weapon.title': {
      minLength: {
        message: 'The min length for this field is 10',
        minLength: 10,
        currentLength: 6,
        value: 'Hammer'
      }
    }
  })
})