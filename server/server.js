const path = require('path');

const http = require('http');

const express = require('express');

const {generateMessage, generateLocationMessage} = require('./utils/utils.js');

const {isRealString} = require('./utils/validation.js');

const {Users} = require('./classes/users.js');

const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 8000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  console.log('New user connected');

  socket.on('join', function (params, callback) {

    if(!isRealString(params.displayName) || !isRealString(params.roomName)){
      return callback('Name and Room name are required.');
    }

    socket.join(params.roomName);

    users.removeUser(socket.id);

    users.addUser(socket.id, params.displayName, params.roomName);

    io.to(params.roomName).emit('updateUsersList', users.getUserList(params.roomName));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));

    socket.broadcast.to(params.roomName).emit('newMessage', generateMessage('Admin', `${params.displayName} has joined`));

    callback();
  });

  socket.on('createMessage', function (message, callback) {

    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
      io.to(user.roomName).emit('newMessage', generateMessage(user.displayName, message.text));
    }

    callback();
  });

  // socket.on('newMessage', function (message, callback) {
  //
  //   console.log(message);
  //
  //   callback('Successfully received at server');
  // });

  socket.on('createLocationMessage', function(coords) {

    var user = users.getUser(socket.id);

    if(user){
      io.to(user.roomName).emit('newLocationMessage', generateLocationMessage(user.displayName,
                      coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {

    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.roomName).emit('updateUsersList', users.getUserList(user.roomName));

      io.to(user.roomName).emit('newMessage', generateMessage('Admin', `${user.displayName} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
