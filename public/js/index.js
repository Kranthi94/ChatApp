var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('newMessage', function (message) {

  var li = jQuery('<li></li>');

  li.text(`${message.from} : ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {

  var li = jQuery('<li></li>');

  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} : `);

  a.attr('href', message.url);

  li.append(a);

  jQuery('#messages').append(li);
});

socket.on('disconnect', () => {
  console.log('Disconnected to server');
});

jQuery('#message-form').on('submit', function(e) {

  e.preventDefault();

  socket.emit('createMessage', {
    from : 'User',
    text : jQuery('[name = message]').val()
  }, function(message) {
    console.log(message);
  });
});

var sendLocation = jQuery('#send_location');

sendLocation.on('click', function () {

  if(!navigator.geolocation){
    return alert('Geo Location is not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function(position) {

    socket.emit('createLocationMessage', {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });

  }, function() {
    alert('Unable to fetch location');
  });
});
