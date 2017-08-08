var Configstore = require('configstore');

class Store {
    
    constructor() {
        this.store = new Configstore('lab2')
        if (!this.store.get('runs')) this.store.set('runs', {})
        if (!this.store.get('config')) this.store.set('config', {})
    }

    getRun(runId) {
        return this.store.get('runs')[runId]
    }

    getRuns() {
        return this.store.get('runs')
    }

    setRun(runId, run) {
        let runs = this.store.get('runs')
        runs[runId] = run
        this.store.set('runs', runs)
    }

    getConfig(key) {
        return this.store.get('config')[key]
    }

    setConfig(key, value) {
        let config = this.store.get('config')
        config[key] = value
        this.store.set('config', config)
    }

}

module.exports = new Store