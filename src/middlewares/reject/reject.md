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