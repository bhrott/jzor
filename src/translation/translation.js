let translations = require('./dictionaries')

let current = translations.enUS

function getCurrentTranslation() {
  return current
}

function setTranslation(key) {
  current = translations[key]
}

function registerTranslation(dictionary) {
  translations[dictionary.key] = dictionary
}

module.exports = {
  getCurrentTranslation,
  setTranslation,
  registerTranslation
}