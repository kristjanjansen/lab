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


// Default

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
    console.log('Run a script by ID\n')
    console.log(chalk.green('\tlab run') + chalk.yellow(' id\n'))
    console.log('Allow scripts to be run remotely\n')
    console.log(chalk.green('\tlab remote'))
    console.log('\n')
}


// List experiments

if (argv._[0] === 'list') {

        var table = new Table({
        head: ['Id', 'Runner', 'Runnable', 'Parameters']
    });

    _.each(conf.all, (value, key) => {
        var parameters = value.parameters.length ?
            value.parameters.map(p => '--'+p).join(' ')
            : ''
        table.push([key, value.runner, value.runnable, parameters])
    })

    console.log(table.toString());

    process.exit()
}

// Running in single script runner mode
// lab scriptname --argument1 --argument2

if (argv._[0]) {

    var runners = {
        '.js': 'node',
        '.py': 'python'
    }

    var runnable = argv._[0]
    var args = [runnable]
    var runner = runners[path.extname(runnable)]
    var parameters = Object.keys(argv).filter(arg => arg !== '_') || []
    
    if (process.argv[3]) args.push(process.argv[3])
    if (process.argv[4]) args.push(process.argv[4])
    if (process.argv[5]) args.push(process.argv[5])
    if (process.argv[6]) args.push(process.argv[6])

    console.log(chalk.gray('\nRunning as single script runner'))
    
    var spawn = childProcess.spawn;
    var child = spawn(runner, args)
    
    child.stdout.on('data', data => {
        data = data.toString()
        console.log(isJson(data) ? chalk.blue(data) : chalk.gray(data))
    })
    
    var storedRun = {
        cwd: process.cwd(),
        runner,
        runnable,
        parameters
    }
    
    conf.set(hash(storedRun), storedRun)
    
}

// Running in piped mode
// something | lab

if (!process.stdin.isTTY) {
    
    console.log(chalk.gray('\nRunning in piped mode\n'))
    
    process.stdin.on('data', data => {
        data = data.toString()
        console.log(isJson(data) ? chalk.blue(data) : data)
    })

}

// Utils

function isJson(str) {

    if (typeof(str) !== 'string') { 
        return false;
    }
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

