const _ = require('lodash')

const booleanValidator = {
  $type: 'boolean',
  validate: ctx => {
    if (ctx.handlePreValidation().handled) return

    if (!_.isBoolean(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: 'The value should be a boolean',
          value: ctx.value
        }
      })
      return
    }
  }
}

module.exports = booleanValidator