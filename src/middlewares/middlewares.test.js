const { registerMiddleware, getMiddleware } = require('./middlewares')

test('registering an existing middleware should replace', () => {
  const mid1 = {
    $attr: 'foo'
  }

  const mid2 = {
    $attr: 'foo'
  }

  registerMiddleware(mid1)

  expect(getMiddleware('foo')).toBe(mid1)

  registerMiddleware(mid2)

  expect(getMiddleware('foo')).toBe(mid2)
})