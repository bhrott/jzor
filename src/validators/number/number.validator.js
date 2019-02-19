const _ = require('lodash')
const { getCurrentTranslation } = require('../../translation')

const numberValidator = {
  $type: 'number',
  validate: ctx => {
    let value = ctx.value
    const translation = getCurrentTranslation()

    if (ctx.schema.strict === false) value = Number(value)

    if (!_.isNumber(value) || isNaN(value)) {
      ctx.registerErrors({
        type: {
          message: translation.validators.number.errors.type,
          value
        }
      })
      return
    }

    let errors = {}

    if (_.isNumber(ctx.schema.min)) {
      if (value < ctx.schema.min) {
        errors.min = {
          message: translation.validators.number.errors.min(ctx),
          value,
          min: ctx.schema.min
        }
      }
    }

    if (_.isNumber(ctx.schema.max)) {
      if (value > ctx.schema.max) {
        errors.max = {
          message: translation.validators.number.errors.max(ctx),
          value,
          max: ctx.schema.max
        }
      }
    }

    if (ctx.schema.positive === true) {
      if (value < 0) {
        errors.positive = {
          message: translation.validators.number.errors.positive,
          value
        }
      }
    }

    if (ctx.schema.negative === true) {
      if (value >= 0) {
        errors.negative = {
          message: translation.validators.number.errors.negative,
          value
        }
      }
    }

    Object.keys(errors).length > 0 && ctx.registerErrors(errors)
  }
}

module.exports = numberValidator
