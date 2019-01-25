### One Of

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'oneOf',
  accept: [1, 2, 3]
}

const value = 2

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| accept | array of any type | yes | | the values that is accepted for this field |