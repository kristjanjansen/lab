var Configstore = require('configstore');
var io = require('socket.io-client')

class Store {
    
    constructor() {
        this.store = new Configstore('lab')
        if (!this.store.get('runs')) this.store.set('runs', {})
        if (!this.store.get('logs')) this.store.set('logs', [])
        if (!this.store.get('config')) this.store.set('config', {})
        this.socket = io(this.getConfig('server', 'http://localhost:8043'));
    }

    getRun(runId) {
        return this.store.get('runs')[runId]
    }

    getRuns() {
        return this.store.get('runs')
    }

    setRun(run) {
        let runs = this.store.get('runs')
        runs[run.id] = run
        this.store.set('runs', runs)
        this.socket.emit('run', run)
    }

    setLog(log) {
        this.socket.emit('log', log)
    }

    endLog() {
        this.socket.close()
    }

    getConfig(key, defaultValue) {
        return this.store.get('config')[key] ? this.store.get('config')[key] : defaultValue
    }

    setConfig(key, value) {
        let config = this.store.get('config')
        config[key] = value
        this.store.set('config', config)
    }

}

module.exports = new Store