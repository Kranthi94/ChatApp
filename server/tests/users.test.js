const expect = require('expect');

const {Users} = require('./../classes/users.js');

describe('Users', () => {

  var users;

  beforeEach(() => {

    users = new Users();

    users.usersList = [{
      socketId : '123',
      displayName : 'Andrew',
      roomName : 'React Course'
    }, {
      socketId : '456',
      displayName : 'Barack',
      roomName : 'Node Course'
    }, {
      socketId : '789',
      displayName : 'Charlie',
      roomName : 'React Course'
    }];
  });

  it('Should correctly insert user value', () => {

      var user = {
        socketId : '123',
        displayName : 'Kranthi',
        roomName : 'Innovator Labs'
      };

      users.addUser(user.socketId, user.displayName, user.roomName);

      expect(users.usersList.length).toEqual(4);
  });

  it('Should return names for the react course', () => {

    var namesArray = users.getUserList('React Course');

    expect(namesArray).toEqual(['Andrew', 'Charlie']);
  });

  it('Should return user based on socket id', () => {

    var user = users.getUser('456');

    expect(user).toEqual({
      socketId : '456',
      displayName : 'Barack',
      roomName : 'Node Course'
    });
  });

  it('Should not return user based on incorrect socket id', () => {

    var user = users.getUser('46');

    expect(user).toBe(undefined);
  });

  it('Should remove user based on socket id', () => {

    var user = users.removeUser('456');

    expect(user).toEqual({
      socketId : '456',
      displayName : 'Barack',
      roomName : 'Node Course'
    });

    expect(users.usersList.length).toEqual(2);
  });

  it('Should not remove user based on incorrect socket id', () => {

    var user = users.removeUser('46');

    expect(user).toBe(undefined);
  })
});
