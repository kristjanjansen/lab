const { map } = require('lodash')

function formatParameters(parameters) {
    
    return map(parameters, (value, key) => `--${key}=${value}`)

}

module.exports = formatParameters