const { getMiddlewares } = require('../middlewares')

let validators = {}

function registerValidator(validator) {
  const allMiddlewares = getMiddlewares()
  const preMiddlewares = allMiddlewares.filter(m => m.pre)
  const postMiddlewares = allMiddlewares.filter(m => m.post)
  
  const validatorWithMiddlewares = {
    ...validator,
    validate: ctx => {
      for (let pre of preMiddlewares) {
        if (pre.validate(ctx).handled) {
          return
        }
      }

      validator.validate(ctx)

      for (let post of postMiddlewares) {
        if (post.validate(ctx).handled) {
          return
        }
      }
    }
  }

  validators[validator.$type] = validatorWithMiddlewares
}

function unregisterValidator($type) {
  delete validators[$type]
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
  require('./password'),
  require('./string'),
  require('./url')
].forEach(validator => {
  registerValidator(validator)
}))

module.exports = {
  registerValidator,
  getValidators,
  getValidator,
  unregisterValidator
}