const _ = require('lodash')

const numberValidator = {
  $type: 'number',
  validate: ctx => {
    if (ctx.handlePreValidation().handled) return

    if (!_.isNumber(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: 'The value should be a number',
          value: ctx.value
        }
      })
      return
    }

    let errors = {}

    if (_.isNumber(ctx.schema.min)) {
      if (ctx.value < ctx.schema.min) {
        errors.min ={
          message: `The value should be equal or greater than ${ctx.schema.min}`,
          value: ctx.value,
          min: ctx.schema.min
        }
      } 
    }

    if (_.isNumber(ctx.schema.max)) {
      if (ctx.value > ctx.schema.max) {
        errors.max ={
          message: `The value should be equal or less than ${ctx.schema.max}`,
          value: ctx.value,
          max: ctx.schema.max
        }
      } 
    }

    if (ctx.schema.positive === true) {
      if (ctx.value < 0) {
        errors.positive ={
          message: 'The value should be a positive number',
          value: ctx.value
        }
      }
    }

    if (ctx.schema.negative === true) {
      if (ctx.value >= 0) {
        errors.negative ={
          message: 'The value should be a negative number',
          value: ctx.value
        }
      }
    }

    Object.keys(errors).length > 0 && ctx.registerErrors(errors)
  }
}

module.exports = numberValidator