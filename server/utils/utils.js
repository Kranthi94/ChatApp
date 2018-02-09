var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt : new Date().toString()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url : `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt : new Date().toString()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
