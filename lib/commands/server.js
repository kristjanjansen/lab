const fs = require('fs')
const http = require('http')

const express = require('express')
const socketio = require('socket.io')
const fallback = require('express-history-api-fallback')
const chalk = require('chalk')
const opener = require('opener')

const store = require('../utils/Store')
const { toConsole } = require('../utils/formatMarkdown')
const { runById } = require('./run')

function server() {

    const port = 8042
    const serverUrl = 'http://localhost:' + port

    const root = __dirname + '/../..'
    
    const app = express();
    const server = http.Server(app);
    const io = socketio(server);

    app.use(express.static(root))
    app.use(fallback('index.html', { root }))

    io.on('connection', socket => {
        socket.on('log', log => {
            socket.broadcast.emit('log', log)
        })
        socket.on('run', run => {
            socket.broadcast.emit('run', run)
        })
        socket.on('runWeb', id => {
            console.log('runWeb', id)
            require('./run').runById(id)
        })
    });

    store.setConfig('server', serverUrl)
    server.listen(port);

    console.log(chalk.gray('\nServer is running at ') + chalk.white.underline(serverUrl))
    console.log(chalk.gray('\nClose the server by pressing Ctrl-C'))

    opener(serverUrl)

}

module.exports = server