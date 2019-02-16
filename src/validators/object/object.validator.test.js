const { createContext } = require('../../context')
const validator = require('./object.validator')

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
    $root: {
      name: {
        maxLength: {
          message: 'The max length for this field is 5',
          maxLength: 5,
          currentLength: 8,
          value: 'Chapolin'
        }
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
    $root: {
      name: {
        maxLength: {
          currentLength: 8,
          maxLength: 5,
          message: 'The max length for this field is 5',
          value: 'Chapolin'
        }
      },
      weapon: {
        title: {
          minLength: {
            currentLength: 6,
            message: 'The min length for this field is 10',
            minLength: 10,
            value: 'Hammer'
          }
        }
      }
    }
  })
})

test('extra props with strict should return error', () => {
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
          $type: 'string'
        }
      },
      strict: true
    }
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      strict: {
        message: 'The following props are not allowed: weapon',
        value: {
          name: 'Chapolin',
          weapon: {
            title: 'Hammer'
          }
        },
        extraProps: ['weapon']
      }
    }
  })
})

test('nested extra props with strict should return error', () => {
  const ctx = createContext({
    value: {
      name: 'Chapolin',
      weapon: {
        title: 'Hammer',
        damage: 1
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
          },
          strict: true
        }
      }
    }
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      name: {
        maxLength: {
          currentLength: 8,
          maxLength: 5,
          message: 'The max length for this field is 5',
          value: 'Chapolin'
        }
      },
      weapon: {
        strict: {
          message: 'The following props are not allowed: damage',
          value: {
            title: 'Hammer',
            damage: 1
          },
          extraProps: ['damage']
        }
      }
    }
  })
})