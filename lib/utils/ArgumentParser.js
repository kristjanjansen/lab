const minimist = require('minimist')
const { pickBy, isEmpty, map } = require('lodash')

class ArgumentParser {
    
    constructor(arg) {
        this.arg = minimist(arg)
    }
    
    isEmpty() {
        return !this.commands.length && isEmpty(this.parameters)
    }
    
    get commands() {
        return this.arg._
    }
    
    command() {
        return this.arg._[0]
    }

    subCommand() {
        return this.arg._[1]
    }
    
    hasCommand(...commands) {
        return !!commands.find(command => command === this.command())
    }
    
    hasOnlyCommand(...commands) {
        if (this.commands().length === 1) {
            return this.hasCommand(...commands)
        }
        return false
    }
    
    parameters() {
        return pickBy(this.arg, (value, key) => key !== '_') 
    }
    
    formattedParameters() {
        return map(this.parameters(), (value, key) => {
            if (value === true) {
                return `--${key}`
            }
            return `--${key}=${value}`
        }) 
    }

}

module.exports = ArgumentParser