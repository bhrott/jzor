const { createContext } = require('../../context')
const validator = require('./number.validator')

test('allow null value should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'number',
      allow: [null]
    },
    value: null
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('invalid type should return errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'number'
    },
    value: 'a'
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    '$root': {
      type: {
        message: 'The value should be a number',
        value: ctx.value
      }
    }
  })
})

test('invalid min value should return errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'number',
      min: 5
    },
    value: 4
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    '$root': {
      min: {
        message: 'The value should be equal or greater than 5',
        value: 4,
        min: 5
      }
    }
  })
})

test('valid min value should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'number',
      min: 5
    },
    value: 7
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('invalid max value should return errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'number',
      max: 5
    },
    value: 6
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    '$root': {
      max: {
        message: 'The value should be equal or less than 5',
        value: 6,
        max: 5
      }
    }
  })
})

test('valid max value should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'number',
      max: 5
    },
    value: 2
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('invalid positive number should return errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'number',
      positive: true
    },
    value: -1
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    '$root': {
      positive: {
        message: 'The value should be a positive number',
        value: -1
      }
    }
  })
})

test('valid positive number should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'number',
      positive: true
    },
    value: 2
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('invalid negative number should return errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'number',
      negative: true
    },
    value: 1
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    '$root': {
      negative: {
        message: 'The value should be a negative number',
        value: 1
      }
    }
  })
})

test('valid negative number should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'number',
      negative: true
    },
    value: -2
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})