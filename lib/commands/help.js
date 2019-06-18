const fs = require('fs');

const { toConsole } = require('../utils/formatMarkdown')

function help() {
    const help = fs.readFileSync(__dirname + '/../../README.md', 'utf8').split('---')
    console.log("\n" + toConsole(help[1]))
}

module.exports = help