#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');

const ArgumentParser = require('./lib/utils/ArgumentParser')
const runners = require('./lib/utils/runners')

const arg = new ArgumentParser(process.argv.slice(2))

// No arguments

if (arg.isEmpty() && process.stdin.isTTY) {
    require('./lib/commands/help')()
}

// List scripts

if (arg.hasCommand('list')) {
    require('./lib/commands/list')()
}

// Run a script by name

if(arg.command() && Object.keys(runners).find(runner => {
    return runner === path.extname(arg.command())
})) {
    require('./lib/commands/run').runByName(arg.command(), arg.parameters())
}

// Running a script by ID

if (String(arg.command()).match(/^([a-z0-9]{8})$/)) {
    require('./lib/commands/run').runById(arg.command())
}

// Running all scripts

if (arg.hasCommand('all')) {
    require('./lib/commands/run').runAll()
}

// Running as server

if (arg.hasCommand('server') && !arg.subCommand() /* && process.stdin.isTTY */) {
    require('./lib/commands/server')()
}

// Running as proxy for remote server

if (arg.hasCommand('server') && arg.subCommand()) {
    require('./lib/commands/remoteserver')(arg.subCommand())
}

// Running in piped mode

if (arg.isEmpty() && !process.stdin.isTTY) {
    require('./lib/commands/pipe')()
}

// Fallbacks to future features

if (arg.hasCommand('cloud')) {
    console.log(chalk.gray('\nRunning experiment as a cloud function\n'))
}

if (arg.hasCommand('share')) {
    console.log(chalk.gray('\nSharing an experiment\n'))
}