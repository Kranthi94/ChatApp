var socket = io();

function scrollToBottom () {

  //Selectors

  var messages = jQuery('#messages');

  var newMessage = messages.children('li:last-child');

  //Heights

  var clientHeight = messages.prop('clientHeight');

  var scrollTop = messages.prop('scrollTop');

  var scrollHeight = messages.prop('scrollHeight');

  var newMessageHeight = newMessage.innerHeight();

  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', () => {

  console.log('Connected to server');

  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {

    if(err){
      alert(err);
      window.location.href = '/';
    }else {
      console.log('No Error');
    }
  });
});

socket.on('updateUsersList', function(usersNames) {

  var ol = jQuery('<ol></ol>');

  usersNames.forEach(function(userName) {
    ol.append(jQuery('<li></li>').text(userName));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {

  var formattedTime = moment(message.createdAt).format('hh:mm a');

  var messageTemplate = jQuery('#message_template').html();

  var html = Mustache.render(messageTemplate, {
    from : message.from,
    text : message.text,
    createdAt : formattedTime
  });

  // var li = jQuery('<li></li>');
  //
  // li.text(`${formattedTime}   ${message.from} : ${message.text}`);

  jQuery('#messages').append(html);

  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {

  var formattedTime = moment(message.createdAt).format('h:mm a');

  var locationMessageTemplate = jQuery('#location_message_template').html();

  var html = Mustache.render(locationMessageTemplate, {
    from : message.from,
    url : message.url,
    createdAt : formattedTime
  });

  // var li = jQuery('<li></li>');
  //
  // var a = jQuery('<a target="_blank">My current location</a>');
  //
  // li.text(`${formattedTime}   ${message.from} : `);
  //
  // a.attr('href', message.url);
  //
  // li.append(a);

  jQuery('#messages').append(html);

  scrollToBottom();
});

socket.on('disconnect', () => {
  console.log('Disconnected to server');
});

jQuery('#message-form').on('submit', function(e) {

  e.preventDefault();

  var messageTextBox = jQuery('[name = message]');

  socket.emit('createMessage', {
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
