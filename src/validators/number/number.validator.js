const _ = require('lodash')
const { getCurrentTranslation } = require('../../translation')

const numberValidator = {
  $type: 'number',
  validate: ctx => {
    const translation = getCurrentTranslation()

    if (!_.isNumber(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: translation.validators.number.errors.type,
          value: ctx.value
        }
      })
      return
    }

    let errors = {}

    if (_.isNumber(ctx.schema.min)) {
      if (ctx.value < ctx.schema.min) {
        errors.min ={
          message: translation.validators.number.errors.min(ctx),
          value: ctx.value,
          min: ctx.schema.min
        }
      } 
    }

    if (_.isNumber(ctx.schema.max)) {
      if (ctx.value > ctx.schema.max) {
        errors.max ={
          message: translation.validators.number.errors.max(ctx),
          value: ctx.value,
          max: ctx.schema.max
        }
      } 
    }

    if (ctx.schema.positive === true) {
      if (ctx.value < 0) {
        errors.positive ={
          message: translation.validators.number.errors.positive,
          value: ctx.value
        }
      }
    }

    if (ctx.schema.negative === true) {
      if (ctx.value >= 0) {
        errors.negative ={
          message: translation.validators.number.errors.negative,
          value: ctx.value
        }
      }
    }

    Object.keys(errors).length > 0 && ctx.registerErrors(errors)
  }
}

module.exports = numberValidator