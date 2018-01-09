

class Users {
    constructor(id, name, room) {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);
        if(user) {
            this.users = this.users.filter(function(eachUser) {
               return user.id != eachUser.id;
            });
        }
        return user;
    }

    getUser(id) {
        return this.users.filter(function(user){
            return user.id === id;
        })[0];
    }

    getUserList(room) {
        var usersList = this.users.filter(function(user) {
            return user.room === room;
        });
        
        var namesArray = usersList.map(function(user) {
            return user.name;1
        });
        return namesArray;
    }
}




module.exports = {Users};