const { createContext } = require('../../context')
const validator = require('./url.validator')

test('invalid type should return error', () => {
  const ctx = createContext({
    schema: {},
    value: 123
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeFalsy()
  expect(ctx.errors).toEqual({
    $root: {
      type: {
        message: 'The value should be a string',
        value: 123
      }
    }
  })
})

test('invalid protocol should return error', () => {
  const ctx = createContext({
    schema: {},
    value: 'htt://dev.co'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeFalsy()
  expect(ctx.errors).toEqual({
    $root: {
      url: {
        message: 'The value is not a valid url',
        value: 'htt://dev.co'
      }
    }
  })
})

test('invalid domain name should return error', () => {
  const ctx = createContext({
    schema: {},
    value: 'http://.co'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeFalsy()
  expect(ctx.errors).toEqual({
    $root: {
      url: {
        message: 'The value is not a valid url',
        value: 'http://.co'
      }
    }
  })
})

test('allow only https should return error for http', () => {
  const ctx = createContext({
    schema: {
      allowedProtocols: ['https']
    },
    value: 'http://.co'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeFalsy()
  expect(ctx.errors).toEqual({
    $root: {
      url: {
        message: 'The value is not a valid url',
        value: 'http://.co'
      }
    }
  })
})

test('valid url should be valid', () => {
  const ctx = createContext({
    schema: {},
    value: 'https://dev.io'
  })

  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = 'https://www.dev.io'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = 'http://www.dev.io'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = 'https://localhost:3000'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = 'https://1.1.1.1:2000'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = 'https://1.1.1.1:2000?id=1'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = 'https://1.1.1.1:2000/my-id?token=345'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()
})