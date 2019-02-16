## Middlewares

- [Allow](#allow)
  * [Usage](#usage)
  * [Parameters](#parameters)
- [Reject](#reject)
  * [Usage](#usage-1)
  * [Parameters](#parameters-1)
- [Throw](#throw)
  * [Usage](#usage-2)

### Allow

The `allow` middleware is used to considere some values as `valid` if provided.

For example, if your schema is a `string` schema but you want to allow `null`, just set the `allow` property with the `null` value.

**Step: pre**: this middleware run before other validations

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  //...
  allow: [ null, 1, 'Terry Bogard' ]
}

const value = null

const result = validateSchema(schema, value) // valid
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| allow | array of any | no | [] | The items that will be considered as valid in schema. |


### Reject

The `reject` middleware is used to considere some values as `invalid` if provided.

For example, if your schema is a `string` schema but you want to not allow `acb`, just set the `reject` property with the `abc` value.

**Step: pre**: this middleware run before other validations

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  //...
  reject: [ 'abc' ]
}

const value = 'abc'

const result = validateSchema(schema, value) // invalid
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| reject | array of any | no | [] | The items that will be considered as valid in schema. |


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


