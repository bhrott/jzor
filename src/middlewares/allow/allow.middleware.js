const _ = require('lodash')

const allowMiddleware = {
  $attr: 'allow',
  pre: true,
  validate: ctx => {
    if (_.isArray(ctx.schema.allow) && ctx.schema.allow.length > 0) {
      return {
        handled: ctx.schema.allow.indexOf(ctx.value) >= 0
      }
    }

    return { handled: false }
  }
}

module.exports = allowMiddleware