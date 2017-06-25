const fs = require('fs')
const http = require('http')

const express = require('express')
const socketio = require('socket.io')

const markdownConsole = require('../utils/markdownConsole')

function server() {

    const app = express();
    const server = http.Server(app);
    const io = socketio(server);

    io.on('connection', socket => {
        socket.on('data', payload => {
            console.log(payload)
            socket.broadcast.emit('log', payload)
        });
        //socket.on('run', id => {
        //    socket.broadcast.emit('run', id)
        //});
    });

    server.listen(8042);

    const help = fs.readFileSync(__dirname + '/../../README.md', 'utf8').split('---')
    console.log(markdownConsole(help[1]))
}

module.exports = server