const _ = require('lodash')
const { getCurrentTranslation } = require('../../translation')

function validateEmail(email) {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return {
    valid: re.test(email.toLowerCase()),
    message: getCurrentTranslation().validators.email.errors.value
  }
}

const emailValidator = {
  $type: 'email',
  validate: ctx => {
    if (ctx.handlePreValidation().handled) return

    if (!_.isString(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: getCurrentTranslation().validators.email.errors.type,
          value: ctx.value
        }
      })
      return
    }

    const emailValidator = (ctx.schema.validateEmail || validateEmail)

    const emailValidationResult = emailValidator(ctx.value)
    if (!emailValidationResult.valid) {
      ctx.registerErrors({
        value: {
          message: emailValidationResult.message,
          value: ctx.value
        }
      })
      return
    }
  }
}

module.exports = emailValidator