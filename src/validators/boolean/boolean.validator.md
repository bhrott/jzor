### Boolean

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'boolean'
}

const value = true

const result = validateSchema(schema, value)
```