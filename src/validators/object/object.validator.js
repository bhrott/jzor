const _ = require('lodash')

const objectValidator = {
  $type: 'object',
  validate: ctx => {
    if (ctx.handlePreValidation().handled) return
    
    if (!_.isObject(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: 'The value should be an object',
          value: ctx.value
        }
      })
      return 
    }

    const { getValidators } = require('../validators')

    const schemaObjProps = Object.keys(ctx.schema.props)

    for (let propKey of schemaObjProps) {
      const propSchema = ctx.schema.props[propKey]
      const propValue = ctx.value[propKey]
      const validator = getValidators()[propSchema.$type]

      ctx.addToPath(propKey)
      validator.validate({
        ...ctx,
        schema: propSchema,
        value: propValue
      })
      ctx.popPath()
    }
  }
}

module.exports = objectValidator