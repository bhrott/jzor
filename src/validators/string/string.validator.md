### String

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'string',
  minLength: 1,
  maxLength: 50,
  regex: /myregex/
}

const value = 'Batman'

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| minLength | number | no | | validate the min length of the string |
| maxLength | number | no | | validate the max length of the string |
| regex | regex | no | | validate if the string match the regex rules |