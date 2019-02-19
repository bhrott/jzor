### Date

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'date',
  min: new Date(),
  max: new Date(),
  convertValue: value => {
    // ...convert value before validate
    return new Date(value)
  },
  strict: true
}

const value = new Date()

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| min | Date | no | | the minimum date allowed |
| max | Date | no | | the maximum date allowed |
| convertValue | function | no | return current value | if your value is not a `Date` object, you can convert to a valid date object before jzor validation |
| strict | boolean | no | true | if false, the value will be converted to date using `new Date(value)` |