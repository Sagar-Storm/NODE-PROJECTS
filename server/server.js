const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);


io.on('connect', function(socket) {
    console.log('User connected');
    socket.on('disconnect', () =>{
        console.log('disconnected client');1
    })


    socket.on('createMessage', function(newMessage) {
        console.log('email is being retrieved', newMessage);
        io.emit('newMessage', {
            from: newMessage.to,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
    })

});






























server.listen(port, function() {
    console.log('server has started');
});
