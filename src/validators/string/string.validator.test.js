const { createContext } = require('../../context')
const validator = require('./string.validator')

test('invalid string should return an error', () => {
  const ctx = createContext({
    schema: {},
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

test('invalid min length should return an error', () => {
  const ctx = createContext({
    schema: {
      minLength: 5
    },
    value: 'bat'
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      minLength: {
        message: 'The min length for this field is 5',
        minLength: 5,
        currentLength: 3,
        value: 'bat'
      }
    }
  })
})

test('valid min length should return no errors', () => {
  const ctx = createContext({
    schema: {
      minLength: 2
    },
    value: 'bat'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('invalid max length should return an error', () => {
  const ctx = createContext({
    schema: {
      maxLength: 4
    },
    value: 'Saruman'
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      maxLength: {
        message: 'The max length for this field is 4',
        maxLength: 4,
        currentLength: 7,
        value: 'Saruman'
      }
    }
  })
})

test('valid max length should return no errors', () => {
  const ctx = createContext({
    schema: {
      maxLength: 5
    },
    value: 'bat'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('failed regex test should return an error', () => {
  const ctx = createContext({
    schema: {
      regex: /[A-Z]{5}/
    },
    value: 'Saruman'
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      regex: {
        message: 'The value do not match the rules.',
        regex: /[A-Z]{5}/,
        value: 'Saruman'
      }
    }
  })
})

test('valid regex test should return no errors', () => {
  const ctx = createContext({
    schema: {
      regex: /[A-Za-z]{7}/
    },
    value: 'Saruman'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})