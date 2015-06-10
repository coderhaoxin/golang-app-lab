#!/usr/bin/env node

'use strict'

const debug = require('debug')('httpproxy:bin')
const version = require('../package').version
const server = require('../lib/server')
const program = require('commander')
const path = require('path')

program
  .version(version)
  .option('-c, --config [config]', 'Config file path')
  .option('-p, --port [port]', 'Listening port')
  .option('-i, --inspect [type]', 'Inspect type: none, all, body, header')
  .option('-v, --verbose', 'Verbose')
  .parse(process.argv)

let options = {}

if (program.config) {
  options = require(path.resolve(program.config))
}

if (program.port) {
  options.port = program.port | 0
}

if (program.inspect) {
  options.inspect = program.inspect
}

if (program.verbose) {
  options.verbose = program.verbose
}

debug('options: %j', options)

server.run(options)
