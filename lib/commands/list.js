const { each } = require('lodash')
const chalk = require('chalk');
const Table = require('cli-table');

const formatParameters = require('../utils/formatParameters')
const store = require('../utils/Store')

function list() {

    var table = new Table({
        head: ['Id', 'Runner', 'Runnable', 'Parameters'].map(title => chalk.gray(title))
    });

    each(store.getRuns(), (value, key) => {
        var parameters = value.parameters ?
            formatParameters(value.parameters).join(' ')
            : ''
        table.push([
            chalk.cyan(key),
            value.runner,
            value.runnable,
            chalk.yellow(parameters)
        ])
    })

    console.log(table.toString());
}

module.exports = list