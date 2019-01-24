const stringValidator = require('./string')
const objectValidator = require('./object')
const arrayValidator = require('./array')

let validators = [
  stringValidator, 
  objectValidator,
  arrayValidator
].reduce((acc, cur) => {
  acc[cur.$type] = cur
  return acc
}, {})

function registerValidator(validator) {
  validators[validator.$type] = validator
}

function getValidators() {
  return validators
}

module.exports = {
  registerValidator,
  getValidators
}