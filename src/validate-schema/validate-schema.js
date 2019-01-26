const { getValidators } = require('../validators')
const { createContext } = require('../context')

function validateSchema(schema, value) {
  let ctx = createContext({ schema, value })
  
  let validator = getValidators()[schema.$type]

  validator.validate(ctx)

  return {
    valid: ctx.valid,
    errors: ctx.errors,
    getErrorInPath: ctx.getErrorInPath
  }
}

module.exports = validateSchema