## Creating your middleware

JZOR is extensible. You can create and register your own middleware.

Let's create a custom middleware now!

### Recreating the `allow` middleware

In this sample, we will recreate the `allow` middleware, that indicates if the `value` is inside the range of the `allow`, it will be considered as a valid value.

```js
const schema = {
  $type: 'string',
  allow: [null] // <- will accept the "null" as a valid value.
}

const value = null
```

```js
const allowMiddleware = {
  // first we need to indicate the name of the attribute that will be
  // used in the schema.
  $attr: 'allow',

  // the attribute "pre" set to true indicates this middleware will run
  // BEFORE other validations.
  pre: true,

  // if you pass the attribute "post" set to true, it will rul AFTER
  // other validations.
  post: true,

  // the "validate" function is the function that will handle the
  // validation and must return an object with a property "handled".
  // The property "handled" indicates if it needs to continue the
  // validation or not.
  
  validate: ctx => {
    // the ctx.value prop contain the value to be validated.
    // in this sample, the ctx.value is: "null"
    const value = ctx.value

    // the ctx.schema contains the schema for your value.
    // in this sample, the ctx.schema is:
    // {
    //   $type: 'string',
    //   allow: [null]
    // }
    const schema = ctx.schema

    // with this data, you can create all rules you want.
    // but now you need to know how to set the result.

    // the possible results is: valid or invalid
    // to resolve the validation as VALID, you don't need to anything.

    // to resolve the validation as INVALID, you need to use the
    // "registerErrors" helper from ctx.

    // the registerErrors require 1 argument, an object.
    // inside this object, you can put anything you want.
    // it will be registered as errors inside the current path.
    ctx.registerErrors({
      foo: {
        message: 'my message here',
        value
      }
    })

    return {
      // handled: true => stop, it's handled
      // handled: false => continue to the next middleware
      handled: true
    }
  }
}
```

After this, you can register your middleware:

```js
const { registerMiddleware } = require('jzor')

registerMiddleware(allowMiddleware)
```