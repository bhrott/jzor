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

  expect(result).toEqual({
    valid: false,
    errors: {
      '$root.age': {
        positive: {
          message: 'The value should be a positive number',
          value: -5
        }
      },
      '$root.weapons': {
        maxItems: {
          message: 'This field should contain at maximun 2 item(s)',
          maxItems: 2,
          currentItems: 3,
          value: [
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
      },
      '$root.weapons.0': {
        '$root.damage': {
          max: {
            message: 'The value should be equal or less than 999',
            value: 1000,
            max: 999
          }
        }
      },
      '$root.weapons.1': {
        $root: {
          type: {
            message: 'The value should be an object',
            value: 1
          }
        }
      },
      '$root.weapons.2': {
        '$root.damage': {
          min: {
            message: 'The value should be equal or greater than 0',
            value: -5,
            min: 0
          }
        }
      }
    }
  })
})
