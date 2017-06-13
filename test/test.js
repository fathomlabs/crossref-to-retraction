var converter = require('../index')
var test = require('tape')

var isStream = require('is-stream')

test('.convert converts correctly', function (t) {
  t.plan(1)

  var input = require('./input.json')
  var output = require('./output.json')
  t.deepEqual(converter.convert(input), output, 'converted input matches expected output')
})

test('.convert detects retractions', function (t) {
  t.plan(3)

  var input = require('./input.json')

  t.ok(!(converter.convert(input).retracted), 'unretracted article is not retracted')

  input['update-to'][0].type = 'Retraction'
  t.ok(converter.convert(input).retracted, 'retracted article is detected based on update type')

  input['update-to'][0].type = 'correction'
  input.title[0] = 'RETRACTED: ' + input.title[0]
  t.ok(converter.convert(input).retracted, 'retracted article is detected based on title')
})

test('.stream returns a stream', function (t) {
  t.plan(1)
  t.ok(isStream(converter.stream()), 'converter.stream is a stream')
})
