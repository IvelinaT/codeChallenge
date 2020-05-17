const newman = require('newman')
newman.run({
  collection: require('./api.postman_collection.json'),
  reporters: 'cli'
})
