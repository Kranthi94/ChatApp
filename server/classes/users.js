class Users {

  constructor() {
    this.usersList = [];
  }

  addUser(socketId, displayName, roomName){

    var user = {
      socketId,
      displayName,
      roomName
    };

    this.usersList.push(user);

    return user;
  };

  getUser(socketId) {
    var user = this.usersList.filter((user) => user.socketId === socketId);

    return user[0];
  };

  getUserList(roomName) {
      var user = this.usersList.filter((user) => user.roomName === roomName);

      var namesArray = user.map((user) => user.displayName);

      return namesArray;
  };

  removeUser(socketId) {
    var user = this.getUser(socketId);

    if(user){
      this.usersList = this.usersList.filter((user) => user.socketId !== socketId);
    }

    return user;
  };
};

module.exports = {
  Users
};
