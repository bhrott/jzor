### Array

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'array',
  minItems: 1,
  maxItems: 10,
  item: [
    {
      $type: 'string'
    },
    {
      $type: 'number'
    }
  ]
}

const value = ['Chapolin', 'Chaves', 1]

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| minItems | number | no | 0 | the minimun items that array should have |
| maxItems | number | no | | the maximun items that array should have |
| item | array of schemas | yes | | the schemas to validate the itens inside the array. If you provide more than one, it will validate the item agains all the schemas, if one of them is valid, it will consider a valid value |