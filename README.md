# jzor

JSON Schema Validator that let you know whata hell is happening!

![jzor-logo](docs/images/jzor-logo.png)

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
    '$root.age': {
      positive: {
        message: 'The value should be a positive number',
        value: -5
      }
    },
    '$root.weapons': {
      maxItems: {
        message: 'This field should contain at maximun 2 item(s)',
        maxItems: 2,
        currentItems: 3,
        value: [
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
    },
    '$root.weapons.0': {
      '$root.damage': {
        max: {
          message: 'The value should be equal or less than 999',
          value: 1000,
          max: 999
        }
      }
    },
    '$root.weapons.1': {
      $root: {
        type: {
          message: 'The value should be an object',
          value: 1
        }
      }
    },
    '$root.weapons.2': {
      '$root.damage': {
        min: {
          message: 'The value should be equal or greater than 0',
          value: -5,
          min: 0
        }
      }
    }
  }
}
```

## Validators

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





## Etc...

* [CHANGELOG](CHANGELOG.md)