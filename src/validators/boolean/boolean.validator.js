const _ = require('lodash')
const { getCurrentTranslation } = require('../../translation')

const booleanValidator = {
  $type: 'boolean',
  validate: ctx => {
    if (!_.isBoolean(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: getCurrentTranslation().validators.boolean.errors.type,
          value: ctx.value
        }
      })
      return
    }
  }
}

module.exports = booleanValidator