### Boolean

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'boolean',
  strict: true
}

const value = true

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| strict | boolean | no | true | If false, will also check boolean like values ('true', 'false', '1', '0', 1, 0) as valid  |