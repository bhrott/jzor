const { createContext } = require('../../context')
const validator = require('./password.validator')

test('invalid minLength should return error', () => {
  const ctx = createContext({
    schema: {
      minLength: 6
    },
    value: 'test'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeFalsy()
  expect(ctx.errors).toEqual({
    $root: {
      minLength: {
        message: 'Minimun 6 characters',
        minLength: 6,
        currentLength: 4,
        value: 'test'
      }
    }
  })
})

test('invalid maxLength should return error', () => {
  const ctx = createContext({
    schema: {
      maxLength: 10
    },
    value: 'testtesttest'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeFalsy()
  expect(ctx.errors).toEqual({
    $root: {
      maxLength: {
        message: 'Maximun 10 characters',
        maxLength: 10,
        currentLength: 12,
        value: 'testtesttest'
      }
    }
  })
})

test('invalid letters rule should return error', () => {
  const ctx = createContext({
    schema: {
      letters: true
    },
    value: '123'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeFalsy()
  expect(ctx.errors).toEqual({
    $root: {
      letters: {
        message: 'Contains letters (a-z)',
        value: '123'
      }
    }
  })
})

test('invalid capitalLetters rule should return error', () => {
  const ctx = createContext({
    schema: {
      capitalLetters: true
    },
    value: 'abc123'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeFalsy()
  expect(ctx.errors).toEqual({
    $root: {
      capitalLetters: {
        message: 'Contains capital letters (A-Z)',
        value: 'abc123'
      }
    }
  })
})

test('invalid numbers rule should return error', () => {
  const ctx = createContext({
    schema: {
      numbers: true
    },
    value: 'abcABC'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeFalsy()
  expect(ctx.errors).toEqual({
    $root: {
      numbers: {
        message: 'Contains numbers',
        value: 'abcABC'
      }
    }
  })
})

test('invalid specialCharacters rule should return error', () => {
  const ctx = createContext({
    schema: {
      specialCharacters: true
    },
    value: 'abcABC123'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeFalsy()
  expect(ctx.errors).toEqual({
    $root: {
      specialCharacters: {
        message: 'Contains special characters (@#$%^&*)(+=._-)',
        value: 'abcABC123'
      }
    }
  })
})

test('invalid value should return type error', () => {
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

test('right type should be valid', () => {
  const ctx = createContext({
    schema: {},
    value: '123'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('valid minLength should be valid', () => {
  const ctx = createContext({
    schema: {
      minLength: 2
    },
    value: '123'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('valid maxLength should be valid', () => {
  const ctx = createContext({
    schema: {
      maxLength: 3
    },
    value: '123'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('valid letters should be valid', () => {
  const ctx = createContext({
    schema: {
      letters: true
    },
    value: 'a'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('valid capitalLetters should be valid', () => {
  const ctx = createContext({
    schema: {
      capitalLetters: true
    },
    value: 'A'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('valid numbers should be valid', () => {
  const ctx = createContext({
    schema: {
      numbers: true
    },
    value: '1'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})

test('valid specialCharacters should be valid', () => {
  const ctx = createContext({
    schema: {
      specialCharacters: true
    },
    value: '@'
  })

  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '#'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '$'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '%'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '^'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '&'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '*'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '('
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = ')'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '+'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '='
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '.'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '_'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()

  ctx.value = '-'
  validator.validate(ctx)
  expect(ctx.valid).toBeTruthy()
})

test('full rules password should be valid', () => {
  const ctx = createContext({
    schema: {
      minLength: 10,
      maxLength: 20,
      letters: true,
      capitalLetters: true,
      numbers: true,
      specialCharacters: true
    },
    value: 'aA1@#$%^&*)(+=._-'
  })

  validator.validate(ctx)

  expect(ctx.valid).toBeTruthy()
})