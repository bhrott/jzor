const _ = require('lodash')
const { getCurrentTranslation } = require('../../translation')

const booleanValidator = {
  $type: 'boolean',
  validate: ctx => {
    let value = ctx.value

    if (ctx.schema.strict === false) {
      if (value === 'true' || value === '1' || value === 1) value = true
      if (value === 'false' || value === '0' || value === 0) value = false
    }

    if (!_.isBoolean(value)) {
      ctx.registerErrors({
        type: {
          message: getCurrentTranslation().validators.boolean.errors.type,
          value
        }
      })
      return
    }
  }
}

module.exports = booleanValidator
