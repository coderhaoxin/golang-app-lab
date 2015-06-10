'use strict'

const match = require('../lib/match')
const assert = require('assert')

describe('## match', function() {
  describe('# pathMap()', function() {
    it('basic', function() {
      let results = []

      results.push(match.pathMap('/api/v1/hello', '/api/v1/(.*)', '/api/v2/*'))
      results.push(match.pathMap('/api/v1/hello', '/api/v1/(.*)', '/api/v2/(.*)'))
      results.push(match.pathMap('/api/users/haoxin', '/api/:name', '/api/v1/users/:name'))
      results.push(match.pathMap('/api/users/haoxin', '/api/users/:name', '/api/v1/users/mock'))
      results.push(match.pathMap('/api/users/haoxin', '/api/users/:name', '/api/v1/users/:name'))
      results.push(match.pathMap('/api/shops/blue/items/123', '/api/shops/:name/items/:id', '/api/v2/shops/:name/items/:id'))

      let expects = [{
        matched: true,
        dest: '/api/v2/hello'
      }, {
        matched: true,
        dest: '/api/v2/hello'
      }, {
        matched: false,
        dest: '/api/v1/users/:name'
      }, {
        matched: true,
        dest: '/api/v1/users/mock'
      }, {
        matched: true,
        dest: '/api/v1/users/haoxin'
      }, {
        matched: true,
        dest: '/api/v2/shops/blue/items/123'
      }]

      for (let i = 0; i < results.length; i++) {
        assert.equal(results[i].matched, expects[i].matched)
        assert.equal(results[i].dest, expects[i].dest)
      }
    })
  })
})
