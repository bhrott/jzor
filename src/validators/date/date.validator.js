const _ = require('lodash')
const { getCurrentTranslation } = require('../../translation')

const dateValidator = {
  $type: 'date',
  validate: ctx => {
    const translation = getCurrentTranslation()

    let value = ctx.value

    if (ctx.schema.convertValue) {
      value = ctx.schema.convertValue(ctx.value)
    } else if (ctx.schema.strict === false) {
      value = new Date(ctx.value)
    }

    if (!_.isDate(value)) {
      ctx.registerErrors({
        type: {
          message: translation.validators.date.errors.type,
          value: value
        }
      })
      return
    }

    let errors = {}

    if (_.isDate(ctx.schema.max)) {
      if (value > ctx.schema.max) {
        errors.max = {
          message: translation.validators.date.errors.max,
          max: ctx.schema.max,
          value: value
        }
      }
    }

    if (_.isDate(ctx.schema.min)) {
      if (value < ctx.schema.min) {
        errors.min = {
          message: translation.validators.date.errors.min,
          min: ctx.schema.min,
          value: value
        }
      }
    }

    Object.keys(errors).length > 0 && ctx.registerErrors(errors)
  }
}

module.exports = dateValidator
