## Creating your validator

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
  // handled: true => stop, it's handled
  // handled: false => continue to the next middleware
  validate: ctx => {
    // your validation....

    return {
      handled: true
    }
  }
}
```