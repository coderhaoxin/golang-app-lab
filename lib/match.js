'use strict'

const path2regexp = require('path-to-regexp')
const assert = require('assert')

module.exports = {
  pathMap: pathMap
}

/**
 * @return {Object}
 */
function pathMap(origin, pattern, dest) {
  let keys = []

  let result = {
    matched: false,
    dest: dest
  }

  let regexp = path2regexp(pattern, keys)
  let toPath = path2regexp.compile(dest)

  let matched = regexp.exec(origin)
  if (!matched) {
    return result
  }

  result.matched = true

  if (keys.length) {
    let opts = {}

    for (let i = 0; i < keys.length; i++) {
      opts[keys[i].name] = matched[i + 1]
    }

    result.dest = toPath(opts)
  }

  return result
}
