const enUS = {
  key: 'en-us',
  validators: {
    global: {
      errors: {
        reject: 'This value is not allowed'
      }
    },
    array: {
      errors: {
        type: 'The value should be an array',
        minItems: ctx => `This field should contain at least ${ctx.schema.minItems} item(s)`,
        maxItems: ctx => `This field should contain at maximun ${ctx.schema.maxItems} item(s)`
      }
    },
    boolean: {
      errors: {
        type: 'The value should be a boolean'
      }
    },
    date: {
      errors: {
        type: 'The value should be a date',
        max: 'The value is higher than allowed',
        min: 'The value is lower than allowed'
      }
    },
    email: {
      errors: {
        type: 'The value should be a string',
        value: 'The value is not a valid email'
      }
    },
    number: {
      errors: {
        type: 'The value should be a number',
        min: ctx => `The value should be equal or greater than ${ctx.schema.min}`,
        max: ctx => `The value should be equal or less than ${ctx.schema.max}`,
        positive: 'The value should be a positive number',
        negative: 'The value should be a negative number'
      }
    },
    object: {
      errors: {
        type: 'The value should be an object',
        strict: extraProps => `The following props are not allowed: ${extraProps.join(', ')}`
      }
    },
    oneOf: {
      errors: {
        value: 'This value is not allowed'
      }
    },
    or: {
      errors: {
        schema: 'No schema matched with the value'
      }
    },
    password: {
      errors: {
        type: 'The value should be a string',
        minLength: ctx => `Minimun ${ctx.schema.minLength} characters`,
        maxLength: ctx => `Maximun ${ctx.schema.maxLength} characters`,
        letters: 'Contains letters (a-z)',
        capitalLetters: 'Contains capital letters (A-Z)',
        numbers: 'Contains numbers',
        specialCharacters: 'Contains special characters (@#$%^&*)(+=._-)'
      }
    },
    string: {
      errors: {
        type: 'The value should be a string',
        minLength: ctx => `The min length for this field is ${ctx.schema.minLength}`,
        maxLength: ctx => `The max length for this field is ${ctx.schema.maxLength}`,
        regex: 'The value do not match the rules.'
      }
    },
    url: {
      errors: {
        type: 'The value should be a string',
        url: 'The value is not a valid url'
      }
    }
  }
}

module.exports = enUS