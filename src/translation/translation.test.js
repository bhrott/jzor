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