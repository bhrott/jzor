## Internationalization

By default, jzor have two dictionaries: `en-us` and `pt-br`, the default is the `en-us`.


### Changing the translation

To change the language, use the `setTranslation` helper:

```js
const { setTranslation } = require('jzor')

setTranslation('pt-br')
```

### Registering a new translation

You can register your own dictionary using the `registerTranslation` helper:

```js
const { registerTranslation } = require('jzor')

const translation = {
  key: 'my-translation',
  //....
}

const options = {
  // this prop is used to provide default values if some key is missing
  // in the dictionary you provided.
  // For example, if the key 'validators.globa.errors.reject' does not exist in your dictionary, it will use
  // the value from 'en-us' dictionary instead.
  // The default value for this prop is 'en-us'
  basedOn: 'en-us'
}

registerTranslation(translation, options) // the "options" is optional.
```

To create the appropriate translation dictionary, use this file as model: [en-us.translation.js](https://github.com/benhurott/jzor/blob/master/src/translation/dictionaries/en-us.translation.js)

### Contributing

If you want to contribute creating new translations, please follow this instructions:

- Create the file under `src/translation/dictionaries/{key}.translation.js
- Run the command `npm run validate`, it will check if you provided all the required keys.
- Open the PR o/