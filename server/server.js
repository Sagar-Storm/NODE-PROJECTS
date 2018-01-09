const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {Users} = require('./utils/users.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);


var users = new Users();

io.on('connect', function(socket) {
    console.log('User connected');
    
    

    socket.on('createMessage', function(newMessage, callback) {
        console.log('email is being retrieved', newMessage);
        var user = users.getUser(socket.id);
        io.to(user.room).emit('newMessage', {
            text: user.name + ": " +  newMessage.text
        });
        callback('I am the server, you receive me');
    });

    socket.on('connect', function(params, callback) {
           console.log('connected to server');
           
    });

    socket.on('join', function(params, callback) {
        if(!isRealString(params.name) || !isRealString(params.room)) {
               callback('name & roomname are called');
           }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', {
            text: "Admin: Welcome to the chat app"
        });
        socket.broadcast.to(params.room).emit('newMessage', {
            text: "Admin: " + params.name + " has joined"
        });
        callback();
    });


    socket.on('disconnect', () => {
      var removedUser= users.removeUser(socket.id);
      if(removedUser) {
        io.to(removedUser.room).emit('updateUserList', users.getUserList(removedUser.room));
        io.to(removedUser.room).emit('newMessage', {
            text: removedUser.name + " has left the room"
        });
      }
    });

    function isRealString(strin) {
        return typeof strin ==='string' && strin.trim().length > 0;
    }
});






























server.listen(port, function() {
    console.log('server has started');
});
