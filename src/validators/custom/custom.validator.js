const customValidator = {
  $type: 'custom',
  validate: ctx => {
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