const _ = require('lodash')
const { getCurrentTranslation } = require('../../translation')

const objectValidator = {
  $type: 'object',
  validate: ctx => {
    if (!_.isObject(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: getCurrentTranslation().validators.object.errors.type,
          value: ctx.value
        }
      })
      return 
    }

    const { getValidators } = require('../validators')

    const schemaObjProps = Object.keys(ctx.schema.props)
    const valueProps = Object.keys(ctx.value)

    if (ctx.schema.strict) {
      const extraProps = valueProps.filter(prop => schemaObjProps.indexOf(prop) < 0)

      if (extraProps.length > 0) {
        ctx.registerErrors({
          strict: {
            message: getCurrentTranslation().validators.object.errors.strict(extraProps),
            value: ctx.value,
            extraProps
          }
        })
        return 
      }
    }

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