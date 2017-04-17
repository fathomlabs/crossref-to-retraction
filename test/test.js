var converter = require('../index')
var test = require('tape')

var deeper = require('deeper')
var isStream = require('is-stream')

test('.convert converts correctly', function (t) {
  t.plan(1)

  var input = require('./input.json')
  var output = require('./output.json')
  var equal = deeper(converter.convert(input), output)
  t.ok(equal, 'converted input matches expected output')
})

test('.stream returns a stream', function (t) {
  t.plan(1)
  t.ok(isStream(converter.stream()), 'converter.stream is a stream')
})
