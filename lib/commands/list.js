const { each } = require('lodash')
const Table = require('cli-table');
const Configstore = require('configstore');

const formatParameters = require('../utils/formatParameters')

let conf = new Configstore('lab');

function list() {

    var table = new Table({
        head: ['Hash', 'Runner', 'Runnable', 'Parameters']
    });

    each(conf.all, (value, key) => {
        var parameters = value.parameters ?
            formatParameters(value.parameters).join(' ')
            : ''
        table.push([key, value.runner, value.runnable, parameters])
    })

    console.log(table.toString());
}

module.exports = list