const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const Configstore = require('configstore');
const hash = require('hash-sum');
const chalk = require('chalk');
const { each } = require('lodash');

const formatParameters = require('../utils/formatParameters')
const runners = require('../utils/runners')
const { parseLog } = require('../utils/parseLog');

var io = require('socket.io-client')
var socket = io('https://lab.now.sh');
//console.log(socket)
socket.on('connect', () => console.log(socket.id))

const conf = new Configstore('lab');

function runAll() {
    
    each(conf.all, run => {
        run.args = [run.runnable]
        runScript(run)
    })

}


function runById(id) {
    
    let run = conf.get(id)
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
    
    conf.set(runId, run)

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
                socket.emit('data', {
                    id: run.id,
                    data: parsedData.data,
                    format: parsedData.format,
                    raw: data.toString().trim(),
                    timestamp: process.hrtime().join('')
                })
            } else if (parsedData.format === 'number') {
                console.log(chalk.blue(parsedData.data))
                socket.emit('data', {
                    id: run.id,
                    data: { metric: parsedData.data },
                    format: parsedData.format,
                    raw: data.toString().trim(),
                    timestamp: process.hrtime().join('')
                })
            } else {
                console.log(chalk.gray(parsedData.data))
                socket.emit('data', {
                    id: run.id,
                    data: parsedData.data,
                    format: parsedData.format,
                    raw: data.toString().trim(),
                    timestamp: process.hrtime().join('')
                })
            }
            
        })
        .on('end', () => socket.close())

    child.stderr.on('data', data => console.log(chalk.red(data.toString())))

}

module.exports = { runAll, runById, runByName }
