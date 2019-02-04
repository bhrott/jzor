const validateSchema = require('./validate-schema')

test('valid schema should return no errors', () => {
  const schema = {
    $type: 'object',
    props: {
      name: {
        $type: 'string',
        minLength: 2,
        maxLength: 50
      },
      age: {
        $type: 'number',
        positive: true
      },
      weapons: {
        $type: 'array',
        maxItems: 2,
        item: [
          {
            $type: 'object',
            props: {
              title: {
                $type: 'string',
                minLength: 3,
                maxLength: 50
              },
              damage: {
                $type: 'number',
                min: 0,
                max: 999
              }
            }
          }
        ]
      }
    }
  }

  const value = {
    name: 'Thor',
    age: 1500,
    weapons: [
      {
        title: 'Storm Breaker',
        damage: 998
      }
    ]
  }

  const result = validateSchema(schema, value)

  expect(result.valid).toBeTruthy()
})

test('invalid schema should return errors', () => {
  const schema = {
    $type: 'object',
    props: {
      name: {
        $type: 'string',
        minLength: 2,
        maxLength: 50
      },
      age: {
        $type: 'number',
        positive: true
      },
      weapons: {
        $type: 'array',
        maxItems: 2,
        item: [
          {
            $type: 'object',
            props: {
              title: {
                $type: 'string',
                minLength: 3,
                maxLength: 50
              },
              damage: {
                $type: 'number',
                min: 0,
                max: 999
              }
            }
          }
        ]
      }
    }
  }

  const value = {
    name: 'Tr',
    age: -5,
    weapons: [
      {
        title: 'Storm Breaker',
        damage: 1000
      },
      1,
      {
        title: 'Mjolnir',
        damage: -5
      }
    ]
  }

  const result = validateSchema(schema, value)

  expect(result.valid).toBeFalsy()
  expect(result.errors).toEqual({
    $root: {
      age: {
        positive: {
          message: 'The value should be a positive number',
          value: -5
        }
      },
      weapons: {
        $0: {
          $root: {
            damage: {
              max: {
                max: 999,
                message: 'The value should be equal or less than 999',
                value: 1000
              }
            }
          }
        },
        $1: {
          $root: {
            type: { message: 'The value should be an object', value: 1 }
          }
        },
        $2: {
          $root: {
            damage: {
              min: {
                message: 'The value should be equal or greater than 0',
                min: 0,
                value: -5
              }
            }
          }
        },
        maxItems: {
          currentItems: 3,
          maxItems: 2,
          message: 'This field should contain at maximun 2 item(s)',
          value: [
            { damage: 1000, title: 'Storm Breaker' },
            1,
            { damage: -5, title: 'Mjolnir' }
          ]
        }
      }
    }
  })
})

test('validating all schemas should be succeed', () => {
  const schema = {
    $type: 'array',
    item: [
      {
        $type: 'object',
        props: {
          name: {
            $type: 'string'
          },
          email: {
            $type: 'email'
          },
          level: {
            $type: 'number'
          },
          birthDate: {
            $type: 'date'
          },
          role: {
            $type: 'oneOf',
            accept: ['warrior', 'mage', 'ranger']
          },
          active: {
            $type: 'boolean'
          },
          perks: {
            $type: 'or',
            schemas: [
              {
                $type: 'array',
                item: {
                  $type: 'string'
                }
              },
              {
                $type: 'string',
                allow: [null]
              }
            ]
          }
        }
      }
    ]
  }

  const value = [
    {
      name: 'Zyon',
      email: 'zyon@mid.com',
      level: 5,
      birthDate: new Date(),
      role: 'warrior',
      active: true,
      perks: ['defense-monster']
    },
    {
      name: 'Alaban',
      email: 'alaban@mid.com',
      level: 12,
      birthDate: new Date(),
      role: 'warrior',
      active: true,
      perks: null
    }
  ]

  const result = validateSchema(schema, value)

  expect(result.valid).toBeTruthy()
})


test('get error in path should return the error message', () => {
  const schema = {
    $type: 'array',
    item: [
      {
        $type: 'object',
        props: {
          name: {
            $type: 'string',
            minLength: 5
          }
        }
      }
    ]
  }

  const value = [
    {
      name: 'Zyon'
    }
  ]

  const result = validateSchema(schema, value)

  const message = result.getErrorInPath('$root.$0.$root.name.minLength.message')

  expect(message).toBe('The min length for this field is 5')
})