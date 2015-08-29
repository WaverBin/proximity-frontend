angular.module('proximity.services').factory('Conversations', function() {

  var conversations = [];
  var conversationsByUser = {};
  
    var get = function(id) {
      return _.find(conversations, function(conversation){ return conversation.id == id; }) || conversationsByUser[id];
    };
    
    var remove = function(id) {
      delete conversationsByUser[get(id).users[0].id];
      conversations.splice(conversations.indexOf(get(id)), 1);
    };
    
    var add = function(conversation) {
      conversation.users = _.filter(conversation.users, function(u){ return u.id != user.id; });
      conversations.push(conversation);
      conversationsByUser[conversation.users[0].id] = conversation;
    };
    
    var setAll = function(newConversations){
      conversations = _.each(newConversations, function(conv){ return _.extend(conv, { users: _.filter(conv.users, function(u){ return u.id != user.id; }) }); });
      _.each(_.filter(conversations, function(conv){ return conv.users.length == 1; }), function(conversation){ conversationsByUser[conversation.users[0].id] = conversation; });
    };
    
    var getLastUnreadMessage = function(conversationId){
      return _.last(_.filter(get(conversationId).messages, function(message) { return message.from != user.id && message.status != 'read'; }));
    };
    
    var all = function() {
      return _.reject(conversations, function(conversation){ return conversation.messages.length == 0; });
    };
    
    var addMessage = function(message){
      get(message.conversationId).messages.push(message);
    };
    
    /**
    * Build and return a message object constructed from the content
    * @param content
    * @returns {{from: *, content: {text: *}, timestamp: number, read: boolean}}
    */
    function buildMessage(content, conversationId) {
      return {
        id: guid(),
        conversationId: conversationId,
        from: user.id,
        content: {
           text: content.text
        },
        timestamp: new Date().getTime(),
        status: 'sending'
      };
    }
        
    function buildConversation(users) {
      return {
        id: '',
        users: users,
        messages: []
      };
    }
   
  return {
    all: all,
    add: add,
    addMessage: addMessage,
    remove: remove,
    get: get,
    setAll: setAll,
    getLastUnreadMessage: getLastUnreadMessage,
    buildMessage: buildMessage,
    buildConversation: buildConversation
  };
});