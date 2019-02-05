const _ = require('lodash')
const { getCurrentTranslation } = require('../../translation')

const passwordValidator = {
  $type: 'password',
  validate: ctx => {
    const translation = getCurrentTranslation()

    if (!_.isString(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: translation.validators.password.errors.type,
          value: ctx.value
        }
      })
      return 
    }
    
    let errors = {}

    if (_.isNumber(ctx.schema.minLength)) {
      if (ctx.value.length < ctx.schema.minLength) {
        errors.minLength = {
          message: translation.validators.password.errors.minLength(ctx),
          minLength: ctx.schema.minLength,
          currentLength: ctx.value.length,
          value: ctx.value
        }
      }
    }

    if (_.isNumber(ctx.schema.maxLength)) {
      if (ctx.value.length > ctx.schema.maxLength) {
        errors.maxLength = {
          message: translation.validators.password.errors.maxLength(ctx),
          maxLength: ctx.schema.maxLength,
          currentLength: ctx.value.length,
          value: ctx.value
        }
      }
    }

    if (ctx.schema.letters) {
      if (!ctx.value.match(/[a-z]/)) {
        errors.letters = {
          message: translation.validators.password.errors.letters,
          value: ctx.value
        }
      }
    }

    if (ctx.schema.capitalLetters) {
      if (!ctx.value.match(/[A-Z]/)) {
        errors.capitalLetters = {
          message: translation.validators.password.errors.capitalLetters,
          value: ctx.value
        }
      }
    }

    if (ctx.schema.numbers) {
      if (!ctx.value.match(/[0-9]/i)) {
        errors.numbers = {
          message: translation.validators.password.errors.numbers,
          value: ctx.value
        }
      }
    }

    if (ctx.schema.specialCharacters) {
      if (!ctx.value.match(/[!@#\\$%\\^\\&*\\)\\(+=._-]/i)) {
        errors.specialCharacters = {
          message: translation.validators.password.errors.specialCharacters,
          value: ctx.value
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      ctx.registerErrors({
        ...errors
      })
    }
  }
}

module.exports = passwordValidator