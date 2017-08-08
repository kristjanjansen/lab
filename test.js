const store = require('./lib/utils/Store')

//store.setRun('a1', { hello: 'world'})
//store.setRun('a2', { hello: 'world2'})
var a = store.getRun('a2')
console.log(a)

//store.setConfig('a1', 'aa')
//store.setConfig('a2', { hello: 'world2'})

var a = store.getConfig('a2')
console.log(a)