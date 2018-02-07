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

  socket.on('createMessage', function (message) {
    console.log(message);
  });

  socket.emit('newMessage', {
    text : 'Hey',
    from : 'Kranthi',
    createdAt : new Date().toString()
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
