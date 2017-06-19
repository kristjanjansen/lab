#!/usr/bin/env node
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var chalk = require('chalk');
var childProcess = require('child_process');
var hash = require('hash-sum');

var Configstore = require('configstore');
var conf = new Configstore('lab');

// Default

if (process.argv.length < 3 && process.stdin.isTTY) {
    console.log('\nUsage\n')
    console.log('In script running mode (Node):\n')
    console.log(chalk.cyan('\tlab script.js --argument1 --argument2\n'))
    console.log('In script running mode (Python):\n')
    console.log(chalk.cyan('\tlab script.py --argument1 --argument2\n'))
    console.log('In piped mode\n')
    console.log(chalk.cyan('\tanything | lab\n'))
    console.log('Running a daemon to run all scripts remotely\n')
    console.log(chalk.cyan('\tlab --remote\n'))
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

    console.log('\nRunning as single script runner')
    
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

// Running as remote runner
// lab --remote

if (argv.remote) {
    console.log(chalk.green('\nRunning all scripts'))
    console.log(JSON.stringify(conf.all, null, 2))
}

// Running in piped mode
// something | lab

if (!process.stdin.isTTY) {
    
    console.log('\nRunning in piped mode')
    
    process.stdin.on('data', data => {
        data = data.toString()
        console.log(isJson(data) ? chalk.blue(data) : chalk.gray())
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

