const _ = require('lodash')
const { getCurrentTranslation } = require('../../translation')

const stringValidator = {
  $type: 'string',
  validate: ctx => {
    const translation = getCurrentTranslation()

    if (!_.isString(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: translation.validators.string.errors.type,
          value: ctx.value
        }
      })
      return 
    }

    let errors = {}

    if (_.isNumber(ctx.schema.minLength)) {
      if (ctx.value.length < ctx.schema.minLength) {
        errors.minLength = {
          message: translation.validators.string.errors.minLength(ctx),
          minLength: ctx.schema.minLength,
          currentLength: ctx.value.length,
          value: ctx.value
        }
      }
    }

    if (_.isNumber(ctx.schema.maxLength)) {
      if (ctx.value.length > ctx.schema.maxLength) {
        errors.maxLength = {
          message: translation.validators.string.errors.maxLength(ctx),
          maxLength: ctx.schema.maxLength,
          currentLength: ctx.value.length,
          value: ctx.value
        }
      }
    }

    if (_.isRegExp(ctx.schema.regex)) {
      if (!ctx.schema.regex.test(ctx.value)) {
        errors.regex = {
          message: translation.validators.string.errors.regex,
          regex: ctx.schema.regex,
          value: ctx.value
        }
      }
    }

    Object.keys(errors).length > 0 && ctx.registerErrors(errors)
  }
}

module.exports = stringValidator