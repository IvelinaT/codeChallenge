const chai = require('chai')
chai.config.includeStack = true
// when a deep equal fails don't truncate the objects
chai.config.truncateThreshold = 0
chai.use(require('chai-as-promised'))
chai.use(require('sinon-chai'))

global.expect = chai.expect
global.sinon = require('sinon')
