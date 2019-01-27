let validators = []

function registerValidator(validator) {
  validators[validator.$type] = validator
}

function getValidators() {
  return validators
}

function getValidator($type) {
  return validators[$type]
}

([
  require('./array'),
  require('./boolean'),
  require('./custom'),
  require('./date'),
  require('./email'),
  require('./number'),
  require('./object'),
  require('./oneOf'),
  require('./or'),
  require('./string')
].forEach(validator => {
  registerValidator(validator)
}))

module.exports = {
  registerValidator,
  getValidators,
  getValidator
}