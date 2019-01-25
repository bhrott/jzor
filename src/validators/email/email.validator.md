### Email

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'email',
  validateEmail: email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return {
      valid: re.test(email.toLowerCase()),
      message: 'The value is not a valid email'
    }
  }
}

const value = 'batman@thenight.com'

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| validateEmail | function | no | a function with default message and email regex | If you want to write your custom validator for the email, you can set this property. It receives the email as parameter and should return an object with `valid (bool)` indicating if it's valid or not and the `message (string)` of the error. |