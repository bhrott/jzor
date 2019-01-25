const _ = require('lodash')

const convertValue = value => value

const dateValidator = {
  $type: 'date',
  validate: ctx => {
    if (ctx.handlePreValidation().handled) return

    const value = (ctx.schema.convertValue || convertValue)(ctx.value)

    if (!_.isDate(value)) {
      ctx.registerErrors({
        type: {
          message: 'The value should be a date',
          value: value
        }
      })
      return
    }

    let errors = {}

    if (_.isDate(ctx.schema.max)) {
      if (value > ctx.schema.max) {
        errors.max = {
          message: 'The value is higher than allowed',
          max: ctx.schema.max,
          value: value
        }
      }
    }

    if (_.isDate(ctx.schema.min)) {
      if (value < ctx.schema.min) {
        errors.min = {
          message: 'The value is lower than allowed',
          min: ctx.schema.min,
          value: value
        }
      }
    }

    Object.keys(errors).length > 0 && ctx.registerErrors(errors)
  }
}

module.exports = dateValidator