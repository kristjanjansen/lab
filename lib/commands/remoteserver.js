const Configstore = require('configstore');
const serverConf = new Configstore('lab_server');
const opener = require('opener')
const chalk = require('chalk')

function remoteserver(url) {
    
    serverConf.set('remote', url)
    console.log('\n' + chalk.gray('Server is running on ') + chalk.white.underline(url) + '\n')

    opener(url)
}

module.exports = remoteserver
