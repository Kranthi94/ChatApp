var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./../utils/utils.js');

describe('generate message', () => {

  it('Should generate message correct based on the input', () => {

    var from = 'Kranthi';

    var text = 'Hey'

    var message = generateMessage(from, text);

    // expect(message.createdAt).toBeA('number');

    // expect(message).toInclude({from, text});
  });
});

describe('generate location message', () => {

  it('Should generate location message correct based on the input', () => {

    var from = 'Kranthi';

    var latitude = '1';

    var longitude = '1';

    var url = "https://www.google.com/maps?q=1,1";

    var message = generateLocationMessage(from, latitude, longitude);

    // expect(message.createdAt).toBeA('number');

    expect(message.url).toBe(url);
  });
});
