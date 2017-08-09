const opener = require('opener')
const chalk = require('chalk')

const store = require('../utils/Store')

function remoteserver(url) {
    
    store.setConfig('server', url)
    store.endLog()

    console.log('\n' + chalk.gray('Server is running on ') + chalk.white.underline(url) + '\n')

    opener(url)
}

module.exports = remoteserver
