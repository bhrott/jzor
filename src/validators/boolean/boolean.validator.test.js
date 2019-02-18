const { createContext } = require('../../context')
const validator = require('./boolean.validator')

test('invalid type should return errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'boolean'
    },
    value: 'a'
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
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

test('no strict mode with valid boolean like FALSE should return no errors', () => {
  let ctx

  // 'false'
  ctx = createContext({
    schema: {
      $type: 'boolean',
      strict: false
    },
    value: 'false'
  })
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  // '0'
  ctx = createContext({
    schema: {
      $type: 'boolean',
      strict: false
    },
    value: '0'
  })
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  // 0
  ctx = createContext({
    schema: {
      $type: 'boolean',
      strict: false
    },
    value: 0
  })
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()
})

test('no strict mode with valid boolean like TRUE should return no errors', () => {
  let ctx

  // 'true'
  ctx = createContext({
    schema: {
      $type: 'boolean',
      strict: false
    },
    value: 'true'
  })
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  // '1'
  ctx = createContext({
    schema: {
      $type: 'boolean',
      strict: false
    },
    value: '1'
  })
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  // 1
  ctx = createContext({
    schema: {
      $type: 'boolean',
      strict: false
    },
    value: 1
  })
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()
})
