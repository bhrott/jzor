## Creating your validator

JZOR is extensible. You can create and register your own validator.

Let's create a custom validator now!

### Creating a "url" validator

In this sample, we will create the "url" validator. It will validate if the value is a valid url address.

Let's say you want to use it like this:

```js
const schema = {
  $type: 'url',
  requireHttps: true
}

const value = 'https://github.com/benhurott/jzor'
```

```js
const urlValidator = {
  // the "$type" attribute indicate the name of your validator.
  // you will use this attribute to identify your validator in
  // the schema.
  $type: 'url',

  // the "validate" function will be called when the value
  // will be validated.
  // it receives only one argument: ctx
  // the ctx contains a bunch of information you can use
  // in your validator.
  validate: ctx => {
    // the ctx.value prop contain the value to be validated.
    // in this sample, the ctx.value is: 'https://github.com/benhurott/jzor'
    const value = ctx.value

    // the ctx.schema contains the schema for your value.
    // in this sample, the ctx.schema is:
    // {
    //   $type: 'url',
    //   requireHttps: true
    // }
    const schema = ctx.schema

    // with this data, you can create all rules you want.
    // but now you need to know how to set the result.

    // the possible results is: valid or invalid
    // to resolve the validation as VALID, you don't need to anything.

    // return;

    // to resolve the validation as INVALID, you need to use the
    // "registerErrors" helper from ctx.

    // the registerErrors require 1 argument, an object.
    // inside this object, you can put anything you want.
    // it will be registered as errors inside the current path.
    ctx.registerErrors({
      https: {
        message: 'The url should use HTTPS protocol.',
        value
      }
    })
  }
}

// now, you just need to register your validator
const { registerValidator } = require('jzor')

registerValidator(urlValidator)
```

Understanding the basis, let's create a sample using the new validator.

```js
const userSchema = {
  $type: 'object',
  props: {
    name: {
      $type: 'number'
    },
    email: {
      $type: 'email'
    },
    site: {
      $type: 'url'
    }
  }
}

const value = {
  name: 'Batman',
  email: 'batman@thenight.com',
  site: null
}

const { validateSchema } = require('jzor')

const result = validateSchema(userSchema, value)
```

Of course the result for this validation will fail because the site is not a valid URL.

For this sample, the result will be:

```js
{
  valid: false,
  errors: {
    $root: {
      site: {
        https: {
          message: 'The url should use HTTPS protocol.',
          value: null
        }
      }
    }
  }
}
```