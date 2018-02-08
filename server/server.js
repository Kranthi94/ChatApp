const path = require('path');

const http = require('http');

const express = require('express');

var socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 8000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  console.log('New user connected');

  socket.emit('newMessage', {
    from : 'Admin',
    text : 'Welcome to Chat App',
    createdAt : new Date().toString()
  });

  socket.broadcast.emit('newMessage', {
    from : 'Admin',
    text : 'New User Added',
    createdAt : new Date().toString()
  });

  socket.on('createMessage', function (message) {
    console.log(message);

    io.emit('newMessage', {
      from : message.from,
      text : message.text,
      createdAt : new Date().toString()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
