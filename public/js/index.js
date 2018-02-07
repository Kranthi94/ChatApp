var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from : 'Sahithi',
    text : 'Create Message'
  });
});

socket.on('newMessage', function (message) {
  console.log(message);
})

socket.on('disconnect', () => {
  console.log('Disconnected to server');
});
