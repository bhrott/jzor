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
  require('./string'),
  require('./object'),
  require('./array'),
  require('./number'),
  require('./boolean'),
  require('./oneOf'),
  require('./date'),
  require('./email')
].forEach(validator => {
  registerValidator(validator)
}))

module.exports = {
  registerValidator,
  getValidators,
  getValidator
}