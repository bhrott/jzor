## Validators

- [Array](#array)
  * [Usage](#usage)
  * [Parameters](#parameters)
- [Boolean](#boolean)
  * [Usage](#usage-1)
- [Custom](#custom)
  * [Usage](#usage-2)
  * [Parameters](#parameters-1)
- [Date](#date)
  * [Usage](#usage-3)
  * [Parameters](#parameters-2)
- [Email](#email)
  * [Usage](#usage-4)
  * [Parameters](#parameters-3)
- [Number](#number)
  * [Usage](#usage-5)
  * [Parameters](#parameters-4)
- [Object](#object)
  * [Usage](#usage-6)
  * [Parameters](#parameters-5)
- [One Of](#one-of)
  * [Usage](#usage-7)
  * [Parameters](#parameters-6)
- [Or](#or)
  * [Usage](#usage-8)
  * [Parameters](#parameters-7)
- [Password](#password)
  * [Usage](#usage-9)
  * [Parameters](#parameters-8)
- [String](#string)
  * [Usage](#usage-10)
  * [Parameters](#parameters-9)
- [Url](#url)
  * [Usage](#usage-11)
  * [Parameters](#parameters-10)

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


### Custom

The `custom` validator allow you to create a custom validation function for your value.

It's commonly used for complex value validation. 

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'custom',
  validation: value => {
    
    return {
      // the 'valid' prop indicate if the validation succeed or not.
      valid: false, 

      // if the valid=false, the message for the error.
      message: 'The error message'
    }
  }
}

const value = 'batman@thenight.com'

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| validation | function | yes | | The function containing the validation for the value. The result of the function must be an object with the props `valid (bool)` and `message (string)`. |


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
  }
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


### Email

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'email',
  validateEmail: email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return {
      valid: re.test(email.toLowerCase()),
      message: 'The value is not a valid email'
    }
  }
}

const value = 'batman@thenight.com'

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| validateEmail | function | no | a function with default message and email regex | If you want to write your custom validator for the email, you can set this property. It receives the email as parameter and should return an object with `valid (bool)` indicating if it's valid or not and the `message (string)` of the error. |


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


### Or

If your value could be validated for multiple schemas, the `or` will solve this problem.

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'or',
  schemas: [
    {
      $type: 'string'
    },
    {
      $type: 'number'
    }
  ]
}

const valueAsText = 'Batman'
const valueAsNumber = 2

const result = validateSchema(schema, valueAsText) // valid
const result = validateSchema(schema, valueAsNumber) // valid
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| schemas | array of schemas | yes | | the schemas that will be used to validate the value |


### Password

Use this validator to validate string passwords.

#### Usage

```js
const { validateSchema } = require('jzor')

const schema = {
  $type: 'password',
  minLength: 10,
  maxLength: 20,
  letters: true,
  capitalLetters: true,
  numbers: true,
  specialCharacters: true
}

const value = 'Th*rWi1llDi3'

const result = validateSchema(schema, value)
```

#### Parameters

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| minLength | number | no | | validate the min length of the password |
| maxLength | number | no | | validate the max length of the password |
| letters | boolean | no | | validate if the password contains letters (`a-z`) |
| capitalLetters | boolean | no | | validate if the password contain capital letters (`A-Z`) |
| numbers | boolean | no | | validate if the password contain numbers (`0-9`) |
| specialCharacters | boolean | no | | validate if the password contain special characters (`@#$%^&*)(+=._-`) |


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


