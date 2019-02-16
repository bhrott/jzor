### Throw

The `throw` middleware is used to throw custom errors instead of run the normal validation.

If a schema with a `throw` property fails, instead of record the validation, it will throw the error.

#### Usage

```js

const { validateSchema } = require('jzor')

const schema = {
  //...
  throw: new Error('My custom error!')
}

const value = 'abc'

const result = validateSchema(schema, value) // will throw the new Error('My custom error!')
```