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

function runByName(name, parameters = null) {

    const runnable = name
    const runner = runners[path.extname(runnable)].runner
    const lang = runners[path.extname(runnable)].lang
    
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
        parameters: parameters,
        code: fs.readFileSync(process.cwd() + '/' + runnable, 'utf8'),
        lang: lang
    }

    store.setRun(run)

    runScript(run)

}

function runById(id) {
    
    let run = store.getRun(id)
    run.args = [run.runnable]

    store.setRun(run)
    runScript(run)

}

function runAll() {
    
    each(store.getRuns(), run => {
        run.args = [run.runnable]
        runScript(run)
    })

}
function runScript(run) {

    var spawn = childProcess.spawn;
    
    var child = spawn(
        run.runner,
        [run.runnable].concat(formatParameters(run.parameters)),
        { cwd: run.cwd }
    )

    child.stdout
        .on('data', log => {

            var parsedLog = parseLog(log)

            if (parsedLog.format === 'json') {
                console.log(chalk.blue(JSON.stringify(parsedLog.data)))
            } else if (parsedLog.format === 'number') {
                console.log(chalk.blue(parsedLog.data))
            } else {
                console.log(chalk.gray(parsedLog.data))
            }

            const newLog = {
                runId: run.id,
                data: parsedLog.format === 'number' ? { metric: parsedLog.data} : parsedLog,
                format: parsedLog.format,
                raw: log.toString().trim(),
                timestamp: process.hrtime().join('')
            }

            store.setLog(newLog)
            
        })
        .on('end', () => store.endLog())

    child.stderr.on('data', log => console.log(chalk.red(log.toString())))

}

module.exports = { runAll, runById, runByName }
