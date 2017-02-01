/**
 * CI scripts for module projects.
 * @module sugo-ci-module
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get browser () { return d(require('./browser')) },
  get build () { return d(require('./build')) },
  get format () { return d(require('./format')) },
  get release () { return d(require('./release')) },
  get share () { return d(require('./share')) },
  get test () { return d(require('./test')) },
  get update () { return d(require('./update')) }
}
