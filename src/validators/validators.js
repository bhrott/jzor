let validators = []

function registerValidator(validator) {
  validators[validator.$type] = validator
}

function getValidators() {
  return validators
}

([
  require('./string'),
  require('./object'),
  require('./array'),
  require('./number'),
  require('./boolean'),
  require('./oneOf'),
  require('./date')
].forEach(validator => {
  registerValidator(validator)
}))

module.exports = {
  registerValidator,
  getValidators
}