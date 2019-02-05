const { readdirSync, statSync } = require('fs')
const path = require('path')

const { createContext } = require('../context')
const { registerValidator, unregisterValidator, getValidator, getValidators } = require('./validators')
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

  unregisterValidator('foo')
})

test('all validators are linked', () => {
  const currentDir = path.resolve(__dirname)

  const dirs = readdirSync(currentDir).filter(f => statSync(path.join(currentDir, f)).isDirectory())

  const validators = getValidators()

  const validatorsKeys = Object.keys(validators)

  expect(dirs).toEqual(validatorsKeys)
})