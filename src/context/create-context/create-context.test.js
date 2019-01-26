const createContext = require('./create-context')

test('add to path should update the path', () => {
  let ctx = createContext({
    schema: {},
    value: null
  })

  ctx.addToPath('test')

  expect(ctx.path).toEqual([
    '$root',
    'test'
  ])
})

test('pop path should remove the last path item', () => {
  let ctx = createContext({
    schema: {},
    value: null
  })

  ctx.addToPath('test')
  ctx.addToPath('test-2')

  expect(ctx.path).toEqual([
    '$root',
    'test',
    'test-2'
  ])

  ctx.popPath()

  expect(ctx.path).toEqual([
    '$root',
    'test'
  ])
})

test('register errors must set the path and set valid as false', () => {
  let ctx = createContext({
    schema: {},
    value: null
  })

  ctx.addToPath('test')

  ctx.registerErrors({ test: true })

  expect(ctx.valid).toBeFalsy()
  expect(ctx.errors).toEqual({
    $root: {
      test: {
        test: true
      }
    }
  })
})

test('handle allowed values with default should return handled=false', () => {
  let ctx = createContext({
    schema: {},
    value: null
  })

  const result = ctx.handleAllowedValues()

  expect(result).toEqual({ handled: false })
})

test('handle allowed values with allowing null should return handled=true', () => {
  let ctx = createContext({
    schema: {
      allow: [null]
    },
    value: null
  })

  const result = ctx.handleAllowedValues()

  expect(result).toEqual({ handled: true })
})

test('handle rejected values with default should return handled=false', () => {
  let ctx = createContext({
    schema: {},
    value: null
  })

  const result = ctx.handleRejectedValues()

  expect(result).toEqual({ handled: false })
})

test('handle rejected values with rejecting "Superman" should return handled=true', () => {
  let ctx = createContext({
    schema: {
      reject: ['Superman']
    },
    value: 'Superman'
  })

  const result = ctx.handleRejectedValues()

  expect(result).toEqual({ handled: true })
})

test('handle pre validation with defaults should return handled=false', () => {
  let ctx = createContext({
    schema: {},
    value: null
  })

  const result = ctx.handlePreValidation()

  expect(result).toEqual({ handled: false })
})

test('handle pre validation with allowed should return handled=true', () => {
  let ctx = createContext({
    schema: {
      allow: [1]
    },
    value: 1
  })

  const result = ctx.handlePreValidation()

  expect(result).toEqual({ handled: true })
})

test('handle pre validation with rejected should return handled=true', () => {
  let ctx = createContext({
    schema: {
      reject: [1]
    },
    value: 1
  })

  const result = ctx.handlePreValidation()

  expect(result).toEqual({ handled: true })
})

test('get error in path should return error if exist', () => {
  let ctx = createContext({
    schema: {
      $type: 'object',
      props: {
        role: {
          $type: 'object',
          props: {
            title: {
              $type: 'string'
            }
          }
        }
      }
    },
    value: {
      role: {
        title: null
      }
    }
  })

  ctx.validate()

  const error = ctx.getErrorInPath('$root.role.title.type')

  expect(error).toEqual({
    message: 'The value should be a string',
    value: null
  })
})