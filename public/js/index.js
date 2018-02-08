var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('newMessage', function (message) {
  console.log(message);
});

socket.on('disconnect', () => {
  console.log('Disconnected to server');
});

socket.emit('createMessage', {
  from : 'From Client',
  text : 'Sent from Client Side'
}, function (response) {
  console.log(response);
});
