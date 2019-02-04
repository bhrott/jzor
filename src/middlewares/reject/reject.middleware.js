const _ = require('lodash')

const { getCurrentTranslation } = require('../../translation')

const rejectMiddleware = {
  $attr: 'reject',
  pre: true,
  validate: ctx => {
    if (_.isArray(ctx.schema.reject) && ctx.schema.reject.length > 0) {
      const valueIsRejected = ctx.schema.reject.indexOf(ctx.value) >= 0

      if (valueIsRejected) {
        ctx.registerErrors({
          reject: {
            message: getCurrentTranslation().validators.global.errors.reject,
            value: ctx.value
          }
        })
      }

      return {
        handled: valueIsRejected
      }
    }

    return { handled: false }
  }
}

module.exports = rejectMiddleware