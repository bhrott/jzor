const { getCurrentTranslation, registerTranslation, setTranslation } = require('./translation')

test('get current translation should return en-us', () => {
  const translation = getCurrentTranslation()

  expect(translation.key).toBe('en-us')
})

test('register a new translation should succeed', () => {
  const elf = {
    key: 'elf'
  }

  registerTranslation(elf)
  setTranslation(elf.key)

  const translation = getCurrentTranslation()

  expect(translation.key).toBe('elf')
})

test('incomplete translation should be completed with the default translator', () => {
  const latin = {
    key: 'lat',
    validators: {
      global: {
        errors: {
          reject: 'Hoc valore non licet'
        }
      }
    }
  }

  registerTranslation(latin)
  setTranslation('lat')

  let current = getCurrentTranslation()

  expect(current.validators.global.errors.reject).toBe('Hoc valore non licet')
  expect(current.validators.array.errors.type).toBe('The value should be an array')
})

test('incomplete translation should be completed with the chosen translator', () => {
  const latin = {
    key: 'lat',
    validators: {
      global: {
        errors: {
          reject: 'Hoc valore non licet'
        }
      }
    }
  }

  const options = {
    basedOn: 'pt-br'
  }

  registerTranslation(latin, options)
  setTranslation('lat')

  let current = getCurrentTranslation()

  expect(current.validators.global.errors.reject).toBe('Hoc valore non licet')
  expect(current.validators.array.errors.type).toBe('O valor deve ser do tipo array')
})