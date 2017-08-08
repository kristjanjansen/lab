const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const hash = require('hash-sum');
const chalk = require('chalk');
const { each } = require('lodash');

const store = require('../utils/Store')
const formatParameters = require('../utils/formatParameters')
const runners = require('../utils/runners')
const { parseLog } = require('../utils/parseLog');

var io = require('socket.io-client')
var socket = io(store.getConfig('server'));

function runAll() {
    
    each(store.getRuns(), run => {
        run.args = [run.runnable]
        runScript(run)
    })

}

function runById(id) {
    
    let run = store.getRun(id)
    run.args = [run.runnable]
    runScript(run)

}

function runByName(name, parameters = null) {

    const runnable = name
    const runner = runners[path.extname(runnable)]
    
    const runId = hash({
        cwd: process.cwd(),
        runner,
        runnable
    })

    const run = {
        id: runId,
        cwd: process.cwd(),
        runner,
        runnable,
        parameters: parameters
    }
    
    store.setRun(runId, run)

    runScript(run)

}

function runScript(run) {

    var spawn = childProcess.spawn;
    
    var child = spawn(
        run.runner,
        [run.runnable].concat(formatParameters(run.parameters)),
        { cwd: run.cwd }
    )

    var langs = {
        node: 'javascript',
        python: 'python',
        rscript: 'r'
    }

    socket.emit('start', {
        id: run.id,
        code: fs.readFileSync(run.cwd + '/' + run.runnable, 'utf8'),
        lang: langs[run.runner]
    })

    child.stdout
        .on('data', data => {

            var parsedData = parseLog(data)

            if (parsedData.format === 'json') {
                console.log(chalk.blue(JSON.stringify(parsedData.data)))
            } else if (parsedData.format === 'number') {
                console.log(chalk.blue(parsedData.data))
            } else {
                console.log(chalk.gray(parsedData.data))
            }

            socket.emit('data', {
                id: run.id,
                data: parsedData.format === 'number' ? { metric: parsedData.data} : parsedData,
                format: parsedData.format,
                raw: data.toString().trim(),
                timestamp: process.hrtime().join('')
            })
            
        })
        .on('end', () => socket.close())

    child.stderr.on('data', data => console.log(chalk.red(data.toString())))

}

module.exports = { runAll, runById, runByName }
