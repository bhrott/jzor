const _ = require('lodash')
const { getCurrentTranslation } = require('../../translation')

function createContext({ schema, value }) {
  let ctx = {}
  ctx.path = ['$root']
  ctx.addToPath = breadcumb => ctx.path.push(breadcumb)
  ctx.popPath = () => ctx.path.pop()
  ctx.value = value
  ctx.schema = schema
  ctx.errors = {}
  ctx.valid = true
  ctx.registerErrors = errors => {
    ctx.path.reduce((acc, cur, index) => {
      const key = `${cur}`
      if (acc[key] === undefined) {
        acc[key] = {}
      }

      if (index === ctx.path.length - 1) { //last
        acc[key] = errors
      }

      return acc[key]
    }, ctx.errors)

    ctx.valid = false
  }
  
  ctx.handleAllowedValues = () => {
    if (_.isArray(ctx.schema.allow) && ctx.schema.allow.length > 0) {
      return {
        handled: ctx.schema.allow.indexOf(ctx.value) >= 0
      }
    }

    return { handled: false }
  }

  ctx.handleRejectedValues = () => {
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

  ctx.handlePreValidation = () => {
    const allowedValues = ctx.handleAllowedValues().handled
    const rejectedValues = ctx.handleRejectedValues().handled

    return {
      handled: allowedValues || rejectedValues
    }
  }

  ctx.getErrorInPath = path => {
    const error = _.get(ctx.errors, path, null)
    return error
  }

  ctx.validate = () => {
    const { getValidator } = require('../../validators')

    const handler = getValidator(ctx.schema.$type)

    handler.validate(ctx)
  }

  return ctx
}

module.exports = createContext