const _ = require('lodash')

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
    const path = ctx.path.join('.')
    ctx.errors[path] = errors
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
            message: 'This value is not allowed',
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

  return ctx
}

module.exports = createContext