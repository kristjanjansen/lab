function server() {

    var express = require('express')
    var app = express();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);

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

}

module.exports = server