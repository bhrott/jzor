const _ = require('lodash')

const stringValidator = {
  $type: 'string',
  validate: ctx => {
    if (ctx.handlePreValidation().handled) return

    if (!_.isString(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: 'The value should be a string',
          value: ctx.value
        }
      })
      return 
    }

    let errors = {}

    if (_.isNumber(ctx.schema.minLength)) {
      if (ctx.value.length < ctx.schema.minLength) {
        errors.minLength = {
          message: `The min length for this field is ${ctx.schema.minLength}`,
          minLength: ctx.schema.minLength,
          currentLength: ctx.value.length,
          value: ctx.value
        }
      }
    }

    if (_.isNumber(ctx.schema.maxLength)) {
      if (ctx.value.length > ctx.schema.maxLength) {
        errors.maxLength = {
          message: `The max length for this field is ${ctx.schema.maxLength}`,
          maxLength: ctx.schema.maxLength,
          currentLength: ctx.value.length,
          value: ctx.value
        }
      }
    }

    if (_.isRegExp(ctx.schema.regex)) {
      if (!ctx.schema.regex.test(ctx.value)) {
        errors.regex = {
          message: 'The value do not match the rules.',
          regex: ctx.schema.regex,
          value: ctx.value
        }
      }
    }

    Object.keys(errors).length > 0 && ctx.registerErrors(errors)
  }
}

module.exports = stringValidator