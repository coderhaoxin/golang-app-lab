'use strict'

const debug = require('debug')('httpproxy:request')
const http = require('http')
const url = require('url')

const agent = new http.Agent()

module.exports = request

function request(options, oriReq, oriRes) { console.log('req')
  let headers = oriReq.headers
  let method = oriReq.method
  let oriUrl = url.parse(oriReq.url)

  debug('origin req - url: %s, method: %s, parsed url: %j, header: %j', oriReq.url, method, oriUrl, headers)

  // path = pathname?query
  let opts = {
    host: oriUrl.host,
    hostname: oriUrl.hostname,
    method: method,
    path: oriUrl.path,
    agent: agent
  }
  if (oriUrl.port) opts.port = oriUrl.port
  if (oriUrl.auth) opts.auth = oriUrl.auth

  let req = http.request(options, function(res) {
    debug('res')
    let headers = res.headers

    oriRes.writeHead(res.statusCode)

    for (let k in headers) {
      oriRes.setHeader(k, headers[k])
    }

    // pipe res
    res.pipe(oriRes)
  })

  for (let k in headers) {
    req.setHeader(k, headers[k])
  }
  req.setHeader('X-Http-Proxy', 'true')

  // pipe req
  oriReq.pipe(req)
}
