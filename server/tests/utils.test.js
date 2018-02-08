var expect = require('expect');

var {generateMessage} = require('./../utils/utils.js');



describe('generate message', () => {

  it('Should generate message correctlt based on the input', () => {

    var from = 'Kranthi';

    var text = 'Hey'

    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');

    expect(message).toContain({from, text});
  });
});
