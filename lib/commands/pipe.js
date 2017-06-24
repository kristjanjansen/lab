const chalk = require('chalk');
const hash = require('hash-sum');
const io = require('socket.io-client')
const socket = io('http://localhost:8080');

const { isJson } = require('../utils/parseLog');

function pipe(socket = null) {

    var id = hash(new Date)

    process.stdin
        .on('data', data => {
            data = data.toString()
            console.log(isJson(data) ? chalk.blue(data) : data)
            if (socket) {
                socket.emit('data', {id, data: isJson(data) ? JSON.parse(data) : data})
            }
        })
        .on('end', () => {
            if (socket) {
                setTimeout(() => socket.close(), 10)
            }
        })

    process.stderr
        .on('data', data => console.log(data.toString()))

}

module.exports = pipe