angular.module('proximity.controllers').controller('MainController', function ($scope, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, $http, Socket, Users, Conversations) {
    
    var updateInterval;
    var UPDATE_DELAY = 10;
    
    $ionicModal.fromTemplateUrl('templates/login-modal.html', { scope: $scope, hardwareBackButtonClose: false, backdropClickToClose: false, focusFirstInput: true }).then(function (modal) {
        $scope.loginModal = modal;
        if (user){
            login();
        } else {
            $scope.loginModal.show();
        }
    });
    
    $scope.connect = function(username){
        user = { id: guid(), name: username, type: 'WEB', picture: 'img/person.png' };
        localStorage.setObject('user', user);
        login();
    };
    
    $scope.logout = function(){
        $ionicPopup.confirm({
            title: l('logout'),
            template: l('logoutConfirmation')
                      + (user.type == 'WEB' ? '<br/><span class="assertive">' 
                      + l('accountEraseConfirmation') + '</span>' : ''),
            buttons: [
                { 
                    text: l('cancel'),
                    onTap: function() {
                        $ionicSideMenuDelegate.toggleLeft();
                    } 
                },
                {
                    text: l('ok'),
                    type: 'button-assertive',
                    onTap: function() { 
                        localStorage.removeItem('user');
                        window.location.reload();
                    }
                }
            ]
        });
    };
    
    function login() {
        navigator.geolocation.getCurrentPosition(function(pos){
            position = getCoords(pos);
            $scope.user = user;
            Socket.emit('login', user);
            $scope.loginModal.hide();
            updateInterval = setInterval(updateUser, UPDATE_DELAY * 1000);
            Socket.emit('get:conversations');
        });
    }
    
    function updateUser(){
        navigator.geolocation.getCurrentPosition(function(pos){
            var newPos = getCoords(pos);
            if (newPos.latitude != position.latitude || newPos.longitude != position.longitude){
                position = newPos;
                Socket.emit('update:position', { userId: user.id, position: newPos });
            }
        });
    }
    
    function getCoords(position){
        return { latitude: position.coords.latitude, longitude: position.coords.longitude };
    }
    
    // TODO : load conversations from cache
    
    Socket.on('error', function (error) {
        $ionicPopup.alert(error); // Error must be a { title: '', template: '' } object
    });
    
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
    
    Socket.on('get:conversations', function (data) {
        Conversations.setAll(data);
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
    
    Socket.on('update:message', function (message){ 
        // TODO : This creates a ngDupe, should be investigated
        //Conversations.updateMessage(message);
    });
});