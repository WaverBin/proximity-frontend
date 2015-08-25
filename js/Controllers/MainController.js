angular.module('proximity.controllers').controller('MainController', function ($scope, $ionicModal, $http, Socket, Users, Conversations) {

    $ionicModal.fromTemplateUrl('templates/login-modal.html', { scope: $scope, hardwareBackButtonClose: false, backdropClickToClose:false, focusFirstInput: true }).then(function (modal) {
        $scope.loginModal = modal;
        if (user){
            $scope.user = user;
            Socket.emit('login', user);
        } else {
            $scope.loginModal.show();
        }
    });
    
    $scope.connect = function(username){
        $scope.loginModal.hide();
        user = { id: guid(), name: username, type: 'WEB' };
        localStorage.setObject('user', user);
        $scope.user = user;
        Socket.emit('login', user);
    };
    
    Socket.on('update:users', function (users) {
        Users.setAll(users);
        $scope.$broadcast('refresh:users');
    });
    
    Socket.on('add:user', function (user) {
        Users.add(user);
        $scope.$broadcast('refresh:users');
    });
    
    Socket.on('remove:user', function (userId) {
        Users.remove(userId);
        $scope.$broadcast('refresh:users');
    });
    
    Socket.on('set:conversationId', function (data) {
        Conversations.get(data.userId).id = data.id;
        $scope.$broadcast('refresh:conversations');
    });
    
    Socket.on('create:conversation', function (conversation) {
        Conversations.add(conversation);
        $scope.$broadcast('refresh:conversations');
    });
    
    Socket.on('update:conversation', function (conversations) {
        Conversations.setAll(conversations);
        $scope.$broadcast('refresh:conversations');
    });
    
    Socket.on('delete:conversation', function (conversationId) {
        Conversations.remove(conversationId);
        $scope.$broadcast('refresh:conversations');
    });
    
    Socket.on('send:message', function (message) {
        var actualConversationId = location.hash.split('/')[3];
        if (actualConversationId && Conversations.get(actualConversationId).id == message.conversationId){
            message.status = 'read';
        }
        Conversations.addMessage(message);
    });
});