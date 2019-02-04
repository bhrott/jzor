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