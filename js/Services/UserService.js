angular.module('proximity.services').factory('Users', function() {
    
    var users = [];
  
    var get = function(id) {
      return _.find(users, function(user){ return user.id == id; });
    };
    
    var remove = function(id) {
      users.splice(users.indexOf(get(id)), 1);
    };
    
    var add = function(newUser){
      users.push(newUser);
    };
    
    var setAll = function(newUsers){
      users = newUsers;
    };
    
    var all = function() {
      return users;
    };
    
  return {
    all: all,
    get: get,
    add: add,
    remove: remove,
    setAll: setAll
  };
});