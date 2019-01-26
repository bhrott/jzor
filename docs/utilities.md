## Utilities

### getErrorInPath

Some times all the path for the error you are seeking could not be available. For example:

Think about this error:

```js
$root: {
  age: {
    positive: {
      message: 'The value should be a positive number',
      value: -5
    }
  }
}
```

You probably want to get the `$root.age.positive.message`. But if it's not validated yet or if the value is valid, this property will not exist and your **code will throw an error**.

To prevent it, you can use the `getErrorInPath` helper. It will let you to pass the path of the error, if it exist, it will return the object inside the path, otherwise, will return `null`.

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'array',
  item: [
    {
      $type: 'object',
      props: {
        name: {
          $type: 'string',
          minLength: 5
        }
      }
    }
  ]
}

const value = [
  {
    name: 'Zyon'
  }
]

const result = validateSchema(schema, value)

const message = result.getErrorInPath('$root.$0.$root.name.minLength.message')

// if the error exist, it will return the string 'The min length for this field is 5'
// otherwise, it will return NULL
```