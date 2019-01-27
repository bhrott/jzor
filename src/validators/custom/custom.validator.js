const customValidator = {
  $type: 'custom',
  validate: ctx => {
    if (ctx.handlePreValidation().handled) return

    const validationResult = ctx.schema.validation(ctx.value)

    if (!validationResult.valid) {
      ctx.registerErrors({
        custom: {
          message: validationResult.message,
          value: ctx.value
        }
      })
    }
  }
}

module.exports = customValidator