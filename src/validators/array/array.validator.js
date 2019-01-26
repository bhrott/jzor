const _ = require('lodash')
const { createContext } = require('../../context')
const { getCurrentTranslation } = require('../../translation')

const arrayValidator = {
  $type: 'array',
  validate: ctx => {
    if (ctx.handlePreValidation().handled) return
    
    const translation = getCurrentTranslation()

    // validate type
    if (!_.isArray(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: translation.validators.array.errors.type,
          value: ctx.value
        }
      })
      return 
    }

    // validate size
    let errors = {}

    if (_.isNumber(ctx.schema.minItems)) {
      if (ctx.value.length < ctx.schema.minItems) {
        errors.minItems = {
          message: translation.validators.array.errors.minItems(ctx),
          minItems: ctx.schema.minItems,
          currentItems: ctx.value.length,
          value: ctx.value
        }
      }
    }

    if (_.isNumber(ctx.schema.maxItems)) {
      if (ctx.value.length > ctx.schema.maxItems) {
        errors.maxItems = {
          message: translation.validators.array.errors.maxItems(ctx),
          maxItems: ctx.schema.maxItems,
          currentItems: ctx.value.length,
          value: ctx.value
        }
      }
    }

    Object.keys(errors).length > 0 && ctx.registerErrors(errors)

    // validate items inside the array

    const { getValidators } = require('../validators')

    for (let itemIndex = 0; itemIndex < ctx.value.length; itemIndex++) {
      ctx.addToPath(`$${itemIndex}`)

      const itemValue = ctx.value[itemIndex]

      let validationResults = []

      for (let schemaIndex = 0; schemaIndex < ctx.schema.item.length; schemaIndex++) {
        const itemSchema = ctx.schema.item[schemaIndex]
        
        let itemContext = createContext({
          schema: itemSchema,
          value: itemValue
        })

        const validator = getValidators()[itemSchema.$type]

        validator.validate(itemContext)

        validationResults.push(itemContext)
      }

      const validationsWithError = validationResults.filter(v => !v.valid)
      const allSchemasFailed = validationsWithError.length === ctx.schema.item.length
      
      if (allSchemasFailed) {
        ctx.registerErrors(validationsWithError[0].errors)
      }

      ctx.popPath() 
    }
  }
}

module.exports = arrayValidator