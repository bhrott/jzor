# jzor

JSON Schema Validator focused in error handler!

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

{{validators}}


## Etc...

* [CHANGELOG](CHANGELOG.md)