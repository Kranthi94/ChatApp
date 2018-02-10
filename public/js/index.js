var socket = io();

// var moment = require('./libs/moment.js');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('newMessage', function (message) {

  var formattedTime = moment(message.createdAt).format('hh:mm a');

  var li = jQuery('<li></li>');

  li.text(`${formattedTime}   ${message.from} : ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {

  var formattedTime = moment(message.createdAt).format('h:mm a');

  var li = jQuery('<li></li>');

  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${formattedTime}   ${message.from} : `);

  a.attr('href', message.url);

  li.append(a);

  jQuery('#messages').append(li);
});

socket.on('disconnect', () => {
  console.log('Disconnected to server');
});

jQuery('#message-form').on('submit', function(e) {

  e.preventDefault();

  var messageTextBox = jQuery('[name = message]');

  socket.emit('createMessage', {
    from : 'User',
    text : messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
});

var sendLocationButton = jQuery('#send_location');

sendLocationButton.on('click', function () {

  if(!navigator.geolocation){
    return alert('Geo Location is not supported by your browser.');
  }

  sendLocationButton.attr('disabled', 'disabled').text('Sending Location');

  navigator.geolocation.getCurrentPosition(function(position) {

    sendLocationButton.removeAttr('disabled').text('Send Location');

    socket.emit('createLocationMessage', {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  }, function() {

    sendLocationButton.removeAttr('disabled').text('Send Location');

    alert('Unable to fetch location');
  });
});
