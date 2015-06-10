'use strict'

const request = require('./request')
const assert = require('assert')
const http = require('http')

exports.run = run

function run(options) {
  assert(typeof options === 'object', 'options required')
  assert(typeof options.port === 'number', 'port required')

  let port = options.port
  let inspect = options.inspect || 'header'
  let verbose = !!options.verbose

  let server = http.createServer(function(req, res) {
    request(options, req, res)
  })

  server.listen(port)
}
