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

## Docs

- [Validators](docs/validators.md)
- [Utilities](docs/utilities.md)
- [Internationalization](docs/internationalization.md)

## Etc...

* [CHANGELOG](CHANGELOG.md)

<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


## TODO

* [ ] - Create docs for "Contribution"
* [ ] - Create docs for "Registering a new validator"
* [ ] - Create docs for "Registering a new translation"