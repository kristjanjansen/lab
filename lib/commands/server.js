const fs = require('fs')
const http = require('http')

const express = require('express')
const socketio = require('socket.io')
const fallback = require('express-history-api-fallback')
const chalk = require('chalk')
const opener = require('opener')

const { toConsole } = require('../utils/formatMarkdown')

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
        socket.on('data', payload => {
            console.log(payload)
            socket.broadcast.emit('log', payload)
        });
        //socket.on('run', id => {
        //    socket.broadcast.emit('run', id)
        //});
    });

    server.listen(port);

    console.log(chalk.gray('\nServer is running at ') + chalk.underline(serverUrl))
    console.log(chalk.gray('\nClose the server by pressing Ctrl-C'))

    opener(serverUrl)

}

module.exports = server