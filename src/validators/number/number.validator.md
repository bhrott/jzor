### Number

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'number',
  min: 1,
  max: 10,
  positive: true,
  negative: true
}

const value = 5

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| min | number | no | | validate if the number is equal or greater then the min |
| max | number | no | | validate if the number is equal or less then the max |
| positive | boolean | no | false | validate if the number is positive (0 is considered positive) |
| negative | boolean | no | false | validate if the number is negative |