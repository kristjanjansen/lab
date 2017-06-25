const fs = require('fs')
const http = require('http')

const express = require('express')
const socketio = require('socket.io')
const fallback = require('express-history-api-fallback')
const opener = require('opener')

const { toConsole } = require('../utils/formatMarkdown')

function server() {

    const port = 8042
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

    const help = fs.readFileSync(root + '/README.md', 'utf8').split('---')
    console.log(toConsole(help[1]))

    opener('http://localhost:' + port)

}

module.exports = server