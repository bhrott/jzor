const { createContext } = require('../../context')
const validator = require('./email.validator')

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

test('non-string value should return error', () => {
  const ctx = createContext({
    schema: {
      $type: 'email'
    },
    value: 1
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      type: {
        message: 'The value should be a string',
        value: 1
      }
    }
  })
})

test('invalid email should return error', () => {
  const ctx = createContext({
    schema: {
      $type: 'email'
    },
    value: 'bbb@hhh'
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      value: {
        message: 'The value is not a valid email',
        value: 'bbb@hhh'
      }
    }
  })
})

test('valid email should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'email'
    },
    value: 'batman@thenight.com'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('custom email validator that always fail should return an error', () => {
  const ctx = createContext({
    schema: {
      $type: 'email',
      validateEmail: email => {
        return {
          valid: email.length === -1,
          message: 'This is my custom message'
        }
      }
    },
    value: 'batman@thenight.com'
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      value: {
        message: 'This is my custom message',
        value: 'batman@thenight.com'
      }
    }
  })
})

test('custom email validator that always succeed should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'email',
      validateEmail: email => {
        return {
          valid: email.length >= 0,
          message: 'This is my custom message'
        }
      }
    },
    value: 'batman@thenight.com'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})