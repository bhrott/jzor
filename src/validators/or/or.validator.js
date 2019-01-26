const { createContext } = require('../../context')
const { getCurrentTranslation } = require('../../translation')

const orValidator = {
  $type: 'or',
  validate: ctx => {
    if (ctx.handlePreValidation().handled) return

    const { getValidator } = require('../validators')

    let validationResult = []

    for (let schema of ctx.schema.schemas) {
      const localContext = createContext({
        schema,
        value: ctx.value
      })

      const handler = getValidator(schema.$type)

      handler.validate(localContext)

      validationResult.push(localContext)
    }

    const errors = validationResult.filter(validation => !validation.valid)

    // all schemas failed
    if (errors.length === ctx.schema.schemas.length) {
      ctx.registerErrors({
        schema: {
          message: getCurrentTranslation().validators.or.errors.schema,
          schemas: ctx.schema.schemas,
          value: ctx.value,
          errors: errors.map(e => e.errors)
        }
      })
    }
  }
}

module.exports = orValidator