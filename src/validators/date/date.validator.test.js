const { createContext } = require('../../context')
const validator = require('./date.validator')

test('invalid type should return an error', () => {
  const ctx = createContext({
    schema: {
      $type: 'date'
    },
    value: 1
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      type: {
        message: 'The value should be a date',
        value: 1
      }
    }
  })
})

test('valid type should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'date'
    },
    value: new Date()
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('invalid max date should return errors', () => {
  const now = new Date()
  const tomorrow = addDays(new Date(), 1)

  const ctx = createContext({
    schema: {
      $type: 'date',
      max: now
    },
    value: tomorrow
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      max: {
        message: 'The value is higher than allowed',
        max: now,
        value: tomorrow
      }
    }
  })
})

test('valid max date should return no errors', () => {
  const now = new Date()
  const tomorrow = addDays(new Date(), 1)

  const ctx = createContext({
    schema: {
      $type: 'date',
      max: tomorrow
    },
    value: now
  })

  validator.validate(ctx)

  expect(ctx.value).toBeTruthy()
})

test('invalid min date should return errors', () => {
  const now = new Date()
  const tomorrow = addDays(new Date(), 1)

  const ctx = createContext({
    schema: {
      $type: 'date',
      min: tomorrow
    },
    value: now
  })

  validator.validate(ctx)

  expect(ctx.errors).toEqual({
    $root: {
      min: {
        message: 'The value is lower than allowed',
        min: tomorrow,
        value: now
      }
    }
  })
})

test('valid min date should return no errors', () => {
  const now = new Date()
  const tomorrow = addDays(new Date(), 1)

  const ctx = createContext({
    schema: {
      $type: 'date',
      min: now
    },
    value: tomorrow
  })

  validator.validate(ctx)

  expect(ctx.value).toBeTruthy()
})

test('valid range should return no errors', () => {
  const now = new Date()
  const tomorrow = addDays(new Date(), 1)
  const yesterday = addDays(new Date(), -1)

  const ctx = createContext({
    schema: {
      $type: 'date',
      min: yesterday,
      max: tomorrow
    },
    value: now
  })

  validator.validate(ctx)

  expect(ctx.value).toBeTruthy()
})

test('convert value before validate should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'date',
      convertValue: value => new Date(value)
    },
    value: 1548448538380
  })

  validator.validate(ctx)

  expect(ctx.value).toBeTruthy()
})

test('no strict mode with non-date value should return no errors', () => {
  const ctx = createContext({
    schema: {
      $type: 'date',
      strict: false
    },
    value: 1548448538380
  })

  validator.validate(ctx)

  expect(ctx.value).toBeTruthy()
})

//
// utils
//

function addDays(date, days) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
