const { createContext } = require('../context')
const { registerValidator, getValidator } = require('./validators')
const { registerMiddleware } = require('../middlewares')

test('register a validator with pre validator middleware should not trigger validator', () => {
  const validatorDef = {
    $type: 'foo',
    validate: jest.fn()
  }

  registerValidator(validatorDef)

  const registered = getValidator('foo')

  const ctx = createContext({
    schema: {
      allow: [null]
    },
    value: null
  })

  registered.validate(ctx)

  expect(validatorDef.validate.mock.calls.length).toBe(0)
})

test('register a validator with no middlewares should trigger validate', () => {
  const validatorDef = {
    $type: 'foo',
    validate: jest.fn()
  }

  registerValidator(validatorDef)

  const registered = getValidator('foo')

  const ctx = createContext({
    schema: {},
    value: null
  })

  registered.validate(ctx)

  expect(validatorDef.validate.mock.calls.length).toBe(1)
})

test('register a validator with post middleware should call validate', () => {
  const middleware = {
    $attr: 'foo',
    post: true,
    validate: jest.fn().mockReturnValue({ handled: true })
  }

  registerMiddleware(middleware)

  const validatorDef = {
    $type: 'foo',
    validate: jest.fn()
  }

  registerValidator(validatorDef)

  const registered = getValidator('foo')

  const ctx = createContext({
    schema: {},
    value: null
  })

  registered.validate(ctx)

  expect(validatorDef.validate.mock.calls.length).toBe(1)
  expect(middleware.validate.mock.calls.length).toBe(1)
})