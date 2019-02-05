const ptBR = {
  key: 'pt-br',
  validators: {
    global: {
      errors: {
        reject: 'This value is not allowed'
      }
    },
    array: {
      errors: {
        type: 'O valor deve ser do tipo array',
        minItems: ctx => `Este campo deve conter ao menos ${ctx.schema.minItems} item(s)`,
        maxItems: ctx => `Este campo deve conter no máximo ${ctx.schema.maxItems} item(s)`
      }
    },
    boolean: {
      errors: {
        type: 'O valor deve ser do tipo boolean'
      }
    },
    date: {
      errors: {
        type: 'O valor deve ser do tipo date',
        max: 'O valor é maior que o permitido',
        min: 'O valor é menor que o permitido'
      }
    },
    email: {
      errors: {
        type: 'O valor deve ser do tipo string',
        value: 'O valor informado não é um email válido'
      }
    },
    number: {
      errors: {
        type: 'O valor deve ser do tipo number',
        min: ctx => `O valor deve ser menor ou igual a ${ctx.schema.min}`,
        max: ctx => `O valor deve ser maior ou igual a ${ctx.schema.max}`,
        positive: 'O valor precisa ser positivo',
        negative: 'O valor precisa ser negativo'
      }
    },
    object: {
      errors: {
        type: 'O valor deve ser do tipo object'
      }
    },
    oneOf: {
      errors: {
        value: 'Este valor não é permitido'
      }
    },
    or: {
      errors: {
        schema: 'Este valor não é compatível com nenhum modelo'
      }
    },
    password: {
      errors: {
        type: 'O valor deve ser to tipo string',
        minLength: ctx => `Mínimo ${ctx.schema.minLength} caracteres`,
        maxLength: ctx => `Máximo ${ctx.schema.maxLength} caracteres`,
        letters: 'Conter letras minúsculas (a-z)',
        capitalLetters: 'Conter letras maiúsculas (A-Z)',
        numbers: 'Conter números',
        specialCharacters: 'Conter caracteres especiais (@#$%^&*)(+=._-)'
      }
    },
    string: {
      errors: {
        type: 'O valor deve ser do tipo string',
        minLength: ctx => `O tamanho mínimo para este campo é ${ctx.schema.minLength}`,
        maxLength: ctx => `O tamanho máximo para este campo é ${ctx.schema.maxLength}`,
        regex: 'O valor não é válido para a expressão regular fornecida'
      }
    },
    url: {
      errors: {
        type: 'O valor deve ser do tipo string',
        url: 'O valor não é uma url válida'
      }
    }
  }
}

module.exports = ptBR