const fs = require('fs');

const markdownConsole = require('../utils/markdownConsole')

function help() {
    const help = fs.readFileSync(__dirname + '/../../README.md', 'utf8').split('---')
    console.log("\n" + markdownConsole(help[1] + help[2]))
}

module.exports = help