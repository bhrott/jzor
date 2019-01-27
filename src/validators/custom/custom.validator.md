### Custom

The `custom` validator allow you to create a custom validation function for your value.

It's commonly used for complex value validation. 

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'custom',
  validation: value => {
    
    return {
      // the 'valid' prop indicate if the validation succeed or not.
      valid: false, 

      // if the valid=false, the message for the error.
      message: 'The error message'
    }
  }
}

const value = 'batman@thenight.com'

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| validation | function | yes | | The function containing the validation for the value. The result of the function must be an object with the props `valid (bool)` and `message (string)`. |