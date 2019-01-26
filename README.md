# jzor

![build-status-master](https://travis-ci.org/benhurott/jzor.svg?branch=master)


JSON Schema Validator that let you know whata hell is happening!

![jzor-logo](docs/images/jzor-logo.png)


## Motivation

I know we have thousands of consolidated json validators, but most of then don't provide one simple thing: **a good way to track the validation errors**.

Razor provide detailed information about each validation and it's respective path, so, you can link your form directly to the error path if you want.

## Install

In terminal, run:

```
npm install jzor
```

## Preview

Create your schema:

```js
const schema = {
  $type: 'object',
  props: {
    name: {
      $type: 'string',
      minLength: 2,
      maxLength: 50
    },
    age: {
      $type: 'number',
      positive: true
    },
    weapons: {
      $type: 'array',
      maxItems: 2,
      item: [
        {
          $type: 'object',
          props: {
            title: {
              $type: 'string',
              minLength: 3,
              maxLength: 50
            },
            damage: {
              $type: 'number',
              min: 0,
              max: 999
            }
          }
        }
      ]
    }
  }
}
```

Create the value to be validated:

```js
const value = {
  name: 'Tr',
  age: -5,
  weapons: [
    {
      title: 'Storm Breaker',
      damage: 1000
    },
    1,
    {
      title: 'Mjolnir',
      damage: -5
    }
  ]
}
```

Validate:

```js
const { validateSchema } = require('jzor')

const result = validateSchema(schema, value)
```

Get the result:

```js
{
  valid: false,
  errors: {
    $root: {
      age: {
        positive: {
          message: 'The value should be a positive number',
          value: -5
        }
      },
      weapons: {
        $0: {
          $root: {
            damage: {
              max: {
                max: 999,
                message: 'The value should be equal or less than 999',
                value: 1000
              }
            }
          }
        },
        $1: {
          $root: {
            type: { message: 'The value should be an object', value: 1 }
          }
        },
        $2: {
          $root: {
            damage: {
              min: {
                message: 'The value should be equal or greater than 0',
                min: 0,
                value: -5
              }
            }
          }
        },
        maxItems: {
          currentItems: 3,
          maxItems: 2,
          message: 'This field should contain at maximun 2 item(s)',
          value: [
            { damage: 1000, title: 'Storm Breaker' },
            1,
            { damage: -5, title: 'Mjolnir' }
          ]
        }
      }
    }
  }
}
```

## Validators

- [Global](#global-applied-to-all-validators)
  - [allow](#allow)
  - [reject](#reject)
- [Array](#array)
  * [Usage](#usage)
  * [Parameters](#parameters)
- [Boolean](#boolean)
  * [Usage](#usage-1)
- [Date](#date)
  * [Usage](#usage-2)
  * [Parameters](#parameters-1)
- [Email](#email)
  * [Usage](#usage-3)
  * [Parameters](#parameters-2)
- [Number](#number)
  * [Usage](#usage-4)
  * [Parameters](#parameters-3)
- [Object](#object)
  * [Usage](#usage-5)
  * [Parameters](#parameters-4)
- [One Of](#one-of)
  * [Usage](#usage-6)
  * [Parameters](#parameters-5)
- [Or](#or)
  * [Usage](#usage-7)
  * [Parameters](#parameters-6)
- [String](#string)
  * [Usage](#usage-8)
  * [Parameters](#parameters-7)

### Global (applied to all validators)

You can use the following parameters in all validators:

#### allow

Allow specific values that will be considered valid for the schema.

```js
const schema = {
  $type: 'any',
  allow: [null, 'test'] // in this case, if the value is null or 'test', the validation will automatically succeed
}
```

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| allow | array | no | [] | will check if the value is one of the values in the array. If is, will considere as a valid value. |

#### reject

Reject specific values that will be considered invalid for the schema.

```js
const schema = {
  $type: 'any',
  reject: [null, 'test'] // in this case, if the value is null or 'test', the validation will automatically fail
}
```

| parameter | type | required | default | description |
| --------- | ---- | -------- | ------- | ----------- |
| reject | array | no | [] | will check if the value is one of the values in the array. If is, will considere as a invalid value. |

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
  }
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

## Etc...

* [CHANGELOG](CHANGELOG.md)
* [Advanced](docs/advanced.md)

<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


## TODO

* [ ] - Create docs for "Contribution"
* [ ] - Create docs for "Registering a new validator"
* [ ] - Create docs for "Registering a new translation"