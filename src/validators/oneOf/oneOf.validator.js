const { getCurrentTranslation } = require('../../translation')

const oneOfValidator = {
  $type: 'oneOf',
  validate: ctx => {
    if (ctx.schema.accept.indexOf(ctx.value) < 0) {
      ctx.registerErrors({
        value: {
          message: getCurrentTranslation().validators.oneOf.errors.value,
          value: ctx.value
        }
      })
    }
  }
}

module.exports = oneOfValidator