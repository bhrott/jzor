const _ = require('lodash')

let translations = require('./dictionaries')

const DEFAULT_TRANSLATION = translations['en-us']

const DEFAULT_REGISTER_TRANSLATION_OPTIONS = {
  basedOn: 'en-us'
}

let current = DEFAULT_TRANSLATION

function getCurrentTranslation() {
  return current
}

function setTranslation(key) {
  current = translations[key]
}

function registerTranslation(dictionary, options = DEFAULT_REGISTER_TRANSLATION_OPTIONS) {
  const baseTranslation = translations[options.basedOn]
  const value = _.merge({}, baseTranslation, dictionary)
  translations[dictionary.key] = value
}

module.exports = {
  getCurrentTranslation,
  setTranslation,
  registerTranslation
}