const chalk = require('chalk')
const hash = require('hash-sum')
var io = require('socket.io-client')
var socket = io('http://localhost:8042')

const { parseLog } = require('../utils/parseLog')

function pipe() {

    var id = hash(new Date)

    process.stdin
        .on('data', data => {

            var parsedData = parseLog(data)

            if (parsedData.format === 'json') {
                console.log(chalk.blue(JSON.stringify(parsedData.data)))
                socket.emit('data', {
                    id,
                    data: parsedData.data,
                    format: parsedData.format,
                    raw: data.toString().trim()
                })
            } else if (parsedData.format === 'number') {
                console.log(chalk.blue(parsedData.data))
                socket.emit('data', {
                    id,
                    data: { metric: parsedData.data },
                    format: parsedData.format,
                    raw: data.toString().trim()
                })
            } else {
                console.log(chalk.gray(parsedData.data))
                socket.emit('data', {
                    id,
                    data: parsedData.data,
                    format: parsedData.format,
                    raw: data.toString().trim()
                })
            }
        })
        .on('end', () => {
            process.exit()
        })

    process.stderr
        .on('data', data => console.log(chalk.red(data.toString())))

}

module.exports = pipe