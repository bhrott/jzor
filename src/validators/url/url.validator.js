const _ = require('lodash')
const { getCurrentTranslation } = require('../../translation')

const allowedProtocols = [
  'http',
  'https',
  'ftp'
]

const urlValidator = {
  $type: 'url',
  validate: ctx => {
    const translation = getCurrentTranslation()

    if (!_.isString(ctx.value)) {
      ctx.registerErrors({
        type: {
          message: translation.validators.url.errors.type,
          value: ctx.value
        }
      })
      return
    }

    const protocols = ctx.schema.allowedProtocols || allowedProtocols

    const pattern = new RegExp(`^((${protocols.join('|')})?:\\/\\/)?`+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))|'+ // OR ip (v4) address
    '(localhost)'+ // OR localhost
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i') // fragment locater

    if (!pattern.test(ctx.value)) {
      ctx.registerErrors({
        url: {
          message: translation.validators.url.errors.url,
          value: ctx.value
        }
      })
    }
  }
}

module.exports = urlValidator