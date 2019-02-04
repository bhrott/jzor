let middlewares = []

function registerMiddleware(middleware) {
  middlewares[middleware.$attr] = middleware

  const existingIndex = middlewares.findIndex(m => m.$attr === middleware.$attr)

  if (existingIndex >= 0) {
    middlewares[existingIndex] = middleware
  }
  else {
    middlewares.push(middleware)
  }
}

function getMiddlewares() {
  return middlewares
}

function getMiddleware($attr) {
  return middlewares[$attr]
}

([
  require('./allow'),
  require('./reject')
]).forEach(middleware => {
  registerMiddleware(middleware)
})

module.exports = {
  registerMiddleware,
  getMiddlewares,
  getMiddleware
}