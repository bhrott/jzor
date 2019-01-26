const dictionaries = require('./index')

const createModelDescription = dict => {
  let description = []
  let identationCount = -1

  const getIdentationChars = () => {
    let result = []

    for (let i = 0; i < identationCount; i++) {
      result.push('  ')
    }

    return result.join('')
  }

  const iterate = obj => {
    identationCount++
    Object.keys(obj).forEach(key => {
      const val = obj[key]
      if (typeof val === 'object') {
        description.push(`${getIdentationChars()}${key}:\n`)
        iterate(val)
      }
      else {
        description.push(`${getIdentationChars()}${key} -> ${typeof val}\n`)
      }
    })
    identationCount--
  }

  iterate(dict)

  return description.join('')
}

test('pt-br should have the same model as en-us', () => {
  const enUSModel = createModelDescription(dictionaries.enUS)
  const ptBRModel = createModelDescription(dictionaries.ptBR)

  expect(ptBRModel).toEqual(enUSModel)
})