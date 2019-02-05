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