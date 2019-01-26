### Or

If your value could be validated for multiple schemas, the `or` will solve this problem.

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'or',
  schemas: [
    {
      $type: 'string'
    },
    {
      $type: 'number'
    }
  ]
}

const valueAsText = 'Batman'
const valueAsNumber = 2

const result = validateSchema(schema, valueAsText) // valid
const result = validateSchema(schema, valueAsNumber) // valid
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| schemas | array of schemas | yes | | the schemas that will be used to validate the value |