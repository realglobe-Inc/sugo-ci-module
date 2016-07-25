/**
 * Compile to browser source
 * @function browser
 * @param {Object} [options] - Optional settings
 * @returns {Promise}
 */
'use strict'

const { runTasks } = require('ape-tasking')
const ababelES2015 = require('ababel-es2015')
const findout = require('findout')
const path = require('path')
const co = require('co')
const { writeFileAsync } = require('asfs')
const defaults = require('defaults')

/** @lends browser */
function browser (options = {}) {
  let { taskName, pattern, cwd, out } = defaults(options, {
    taskName: 'browser',
    pattern: '**/*.js',
    cwd: 'lib',
    out: 'sims/browser'
  })

  return runTasks(taskName, [
    () => ababelES2015(pattern, { cwd, out }),
    () => co(function * () {
      let pkg = findout.resolve('package.json', {
        cwd: path.resolve(cwd),
        safe: true
      })
      let pkgPath = path.resolve(out, '../package.json')
      let { name, description, version, main, license } = pkg
      yield writeFileAsync(pkgPath,
        JSON.stringify({ name, description, version, main, license }, null, 2)
      )
    })

  ], true)
}

module.exports = browser

