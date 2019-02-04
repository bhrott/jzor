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