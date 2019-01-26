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
{{validators-index}}

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

{{validators}}


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