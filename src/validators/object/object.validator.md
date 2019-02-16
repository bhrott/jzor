### Object

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'object',
  props: {
    name: {
      $type: 'string'
    },
    age: {
      $type: 'number'
    }
  },
  strict: true
}

const value = {
  name: 'Thanos',
  age: 1500
}

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| props | object | yes | | The object containing the object props and the schemas for the props |
| strict | boolean | no | false | If the value contains more props than allowed, it will be rejected |