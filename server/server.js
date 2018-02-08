const path = require('path');

const http = require('http');

const express = require('express');

var {generateMessage} = require('./utils/utils.js');

var socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 8000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Added'));

  socket.on('createMessage', function (message, callback) {

    console.log(message);

    io.emit('newMessage', generateMessage(message.from, message.text));

    callback('Successfully received at server');
  });

  socket.on('newMessage', function (message, callback) {

    console.log(message);

    callback('Successfully received at server');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
