#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const chalk = require('chalk');

const ArgumentParser = require('./lib/utils/ArgumentParser')
const markdownConsole = require('./lib/utils/markdownConsole')
const runners = require('./lib/utils/runners')

const arg = new ArgumentParser(process.argv.slice(2))

// No arguments

if (arg.isEmpty() && process.stdin.isTTY) {
    console.log(markdownConsole(fs.readFileSync(__dirname + '/README.md', 'utf8')))
}

// List scripts

if (arg.hasCommand('list')) {
    require('./lib/commands/list')()
}

// Running in piped mode

if (arg.isEmpty() && !process.stdin.isTTY) {
    require('./lib/commands/pipe')
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

// Fallbacks to future features

if (arg.hasCommand('server')) {
    require('./lib/commands/server')()
}

if (arg.hasCommand('cloud')) {
    console.log(chalk.gray('\nRunning experiment as a cloud function\n'))
}

if (arg.hasCommand('share')) {
    console.log(chalk.gray('\nSharing an experiment\n'))
}