angular.module('proximity.controllers').controller('MainController', function ($scope, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, $http, Socket, Users, Conversations) {

    $ionicModal.fromTemplateUrl('templates/login-modal.html', { scope: $scope, hardwareBackButtonClose: false, backdropClickToClose: false, focusFirstInput: true }).then(function (modal) {
        $scope.loginModal = modal;
        if (user){
            login();
        } else {
            $scope.loginModal.show();
        }
    });
    
    $scope.connect = function(username){
        $scope.loginModal.hide();
        user = { id: guid(), name: username, type: 'WEB', picture: 'img/person.png' };
        localStorage.setObject('user', user);
        login();
    };
    
    $scope.logout = function(){
        $ionicPopup.confirm({
            title: L10N.logout[lang],
            template: L10N.logoutConfirmation[lang] 
                      + (user.type == 'WEB' ? '<br/><span class="assertive">' 
                      + L10N.accountEraseConfirmation[lang] + '</span>' : ''),
            buttons: [
                { 
                    text: L10N.cancel[lang],
                    onTap: function() {
                        $ionicSideMenuDelegate.toggleLeft();
                    } 
                },
                {
                    text: L10N.ok[lang],
                    type: 'button-assertive',
                    onTap: function() { 
                        localStorage.removeItem('user');
                        window.location.reload();
                    }
                }
            ]
        });
    };
    
    function login(){
        $scope.user = user;
        Socket.emit('login', user);
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