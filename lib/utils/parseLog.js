function parseLog(buffer) {
    
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

module.exports = { parseLog, isJson, isNumber }