const oneOfValidator = {
  $type: 'oneOf',
  validate: ctx => {
    if (ctx.handlePreValidation().handled) return

    if (ctx.schema.accept.indexOf(ctx.value) < 0) {
      ctx.registerErrors({
        value: {
          message: 'This value is not allowed',
          value: ctx.value
        }
      })
    }
  }
}

module.exports = oneOfValidator