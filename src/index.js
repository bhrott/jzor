const { getValidators, registerValidator } = require('./validators')
const { registerTranslation, setTranslation } = require('./translation')
const validateSchema = require('./validate-schema')

module.exports = {
  getValidators,
  registerValidator,
  validateSchema,
  registerTranslation,
  setTranslation
}