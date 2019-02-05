### Url

Use this validator to validate url address.

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'url',
  allowedProtocols: ['https']
}

const value = 'https://github.com/benhurott/jzor'

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| allowedProtocols | array of string | no | `['http', 'https', 'ftp']` | the protocols considered valid for the url |