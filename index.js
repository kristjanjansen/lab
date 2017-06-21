#!/usr/bin/env node

var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var chalk = require('chalk');
var childProcess = require('child_process');
var hash = require('hash-sum');
var Table = require('cli-table');
var _ = require('lodash');

var Configstore = require('configstore');
var conf = new Configstore('lab');

var io = require('socket.io-client')
var socket = io('http://localhost:8080');

// No arguments

if (process.argv.length < 3 && process.stdin.isTTY) {
    console.log('\nIn Node script running mode:\n')
    console.log(chalk.green('\tlab') + chalk.gray(' script.js --argument1 --argument2\n'))
    console.log('In Python script running mode:\n')
    console.log(chalk.green('\tlab') + chalk.gray(' script.py --argument1 --argument2\n'))
    console.log('In R / shellscript / etc running mode:\n')
    console.log(chalk.green('\tlab') + chalk.gray(' anything --argument1 --argument2\n'))
    console.log('In piped mode\n')
    console.log(chalk.gray('\tanything | ') + chalk.green('lab\n'))
    console.log('List all runned scripts\n')
    console.log(chalk.green('\tlab list\n'))
    console.log('Run a script by hash\n')
    console.log(chalk.green('\tlab') + chalk.cyan(' hash\n'))
    console.log('Allow scripts to be run remotely\n')
    console.log(chalk.green('\tlab remote'))
    console.log('\n')

    process.exit()
}


// List experiments

if (argv._[0] === 'list') {

        var table = new Table({
        head: ['Hash', 'Runner', 'Runnable', 'Parameters']
    });

    _.each(conf.all, (value, key) => {
        var parameters = value.parameters ?
            formatParameters(value.parameters).join(' ')
            : ''
        table.push([key, value.runner, value.runnable, parameters])
    })

    console.log(table.toString());

    process.exit()
}


// Running a script by ID

if (argv._[0] && !!argv._[0].match(/^([a-z0-9]{8})$/)) {
    
    var run = conf.get(argv._[0])
    run.args = [run.runnable]
    runScript(run)

}

// Running in single script

if (argv._[0] && (
    path.extname(argv._[0]) === '.js'
    || path.extname(argv._[0]) === '.py'
    || path.extname(argv._[0]) === '.r'
)) {

    var runners = {
        '.js': 'node',
        '.py': 'python',
        '.r': 'Rscript'
    }

    var runnable = argv._[0]
    var runner = runners[path.extname(runnable)]
    
    var runId = hash({
        cwd: process.cwd(),
        runner,
        runnable
    })

    var run = {
        id: runId,
        cwd: process.cwd(),
        runner,
        runnable,
        parameters: _.filter(argv, (value, key) => key !== '_') 
    }
    
    conf.set(runId, run)

    runScript(run)

}

// Running in piped mode

if (!process.stdin.isTTY) {
        
    var id = hash(new Date)

    process.stdin
        .on('data', data => {
            data = data.toString()
            console.log(isJson(data) ? chalk.blue(data) : data)
            socket.emit('data', {id, data: isJson(data) ? JSON.parse(data) : data})
        })
        .on('end', () => setTimeout(() => socket.close(), 10))

    process.stderr.on('data', data => console.log(data.toString()))

}

// Fallbacks to future features

if (argv._[0] === 'remote') {
    console.log(chalk.gray('\nRunning a remote lab\n'))
    setTimeout(() => {
        console.log(chalk.gray('...soon\n'))
    }, 2000)
}

if (argv._[0] === 'cloud') {
    console.log(chalk.gray('\nRunning experiment as a cloud function\n'))
}

if (argv._[0] === 'share') {
    console.log(chalk.gray('\nSharing an experiment\n'))
}


// Utils

function runScript(run) {

    var spawn = childProcess.spawn;
    
    var child = spawn(
        run.runner,
        [run.runnable].concat(formatParameters(run.parameters)),
        { cwd: run.cwd }
    )
    
    child.stdout
        .on('data', data => {
            
            var parsedData = parseBuffer(data)

            if (parsedData.format === 'json') {
                console.log(chalk.blue(JSON.stringify(parsedData.data)))
                socket.emit('data', {
                    id: run.id,
                    data: parsedData.data,
                    format: parsedData.format,
                    raw: data.toString().trim()
                })
            } else if (parsedData.format === 'number') {
                console.log(chalk.blue(parsedData.data))
                socket.emit('data', {
                    id: run.id,
                    data: { metric: parsedData.data },
                    format: parsedData.format,
                    raw: data.toString().trim()
                })
            } else {
                console.log(chalk.gray(parsedData.data))
                socket.emit('data', {
                    id: run.id,
                    data: parsedData.data,
                    format: parsedData.format,
                    raw: data.toString().trim()
                })
            }
            
            /*
            data = data.toString()
            if (isJson(data)) {
                console.log(chalk.blue(data))
                socket.emit('data', {id: run.id, data: JSON.parse(data)})
            } else {
                console.log(chalk.gray(data))
                socket.emit('data', {id: run.id, data})
            }
            */
        })
        .on('end', () => socket.close())

    child.stderr.on('data', data => console.log(chalk.red(data.toString())))

}

function parseBuffer(buffer) {
    var data = buffer.toString().trim()
    if (isNumber(data)) {
        return { format: 'number', data }
    }
    if (isJson(data)) {
        return { format: 'json', data: JSON.parse(data) }
    }
    return { format: 'string', data }
}

function isJson(value) {

    if (typeof(value) !== 'string') { 
        return false;
    }
    try {
        JSON.parse(value);
        return true;
    } catch (e) {
        return false;
    }
}

function isNumber(value) {
    if (Number.isInteger(value)) {
        return true
    }
    return !Number.isNaN(Number.parseFloat(value))
}

function formatParameters(parameters) {
    
    return _.map(parameters, (value, key) => `--${key}=${value}`)

}

