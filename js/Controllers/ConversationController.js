angular.module('proximity.controllers')
    .controller('ConversationController', function ($scope, $http, Conversations) {
        // Will disappear eventually
        $scope.conversations = Conversations.all();
        
        $scope.$on('refresh:conversations', function(event, args) {
            $scope.conversations = Conversations.all();
        });
    })
    .controller('ConversationDetailController', function ($scope, $stateParams, $state, $http, Conversations, Users,
                                                          Socket, $ionicScrollDelegate) {
        var statusClasses = {
            sent: 'message-status icon ion-checkmark-circled calm',
            read: 'message-status icon ion-eye dark',
            failed: 'message-status icon ion-alert-circled energized'
        };
                                                         
        var _isTyping = false;
        var _typingTimeout = 0;
        $scope.message = '';
        $scope.conversation = Conversations.get($stateParams.id);
        
        if ($scope.conversation == null){
            var otherUser = Users.get($stateParams.id);
            if (otherUser != null){
                var conversation = Conversations.buildConversation([otherUser, user]);
                Conversations.add(_.clone(conversation));
                $scope.conversation = Conversations.get($stateParams.id);
                Socket.emit('get:conversationId', conversation);
            } else { // Id is clearly invalid (not a user and not a conversation)
                redirectToUsers();
            }
        } else {
            var unreadMessage = Conversations.getLastUnreadMessage($stateParams.id);
            if (unreadMessage){
                unreadMessage.status = 'read';
                Socket.emit('update:message', unreadMessage);
                // TODO : Emit to server message update
            }
        }
        
        setTimeout($ionicScrollDelegate.scrollBottom(true), 300); // This doesn't work but it should

        $scope.sendMessage = function(messageContent){
            var message = Conversations.buildMessage(messageContent, $scope.conversation.id);
            $scope.conversation.messages.push(message);
            _emitSendMessage(message);
            _scrollBottom();
            // TODO : Add to localStorage
            $scope.message = '';
        };
        
        $scope.statusIcon = function(status){
            var statusClass = statusClasses[status];
            return statusClass ? statusClass : 'message-status icon calm';
        };

        Socket.on('isTyping', function (message) {
            var actualConversationId = location.hash.split('/')[3];
            if (actualConversationId && Conversations.get(actualConversationId).id == message.conversationId){
                $scope.isSenderTyping = message.isTyping;
            }
            // TODO : Only scroll if the user is already at the bottom
            _scrollBottom();
        });

        $scope.onKeyPress = function(e) {
            if ($scope.message) {
                if (e.which !== 13) {
                    if (_isTyping === false) {
                        _isTyping = true;
                        _emitTyping(true);
                    } else {
                        if ($scope.message.length > 1) {
                            clearTimeout(_typingTimeout);
                            _typingTimeout = setTimeout(_stoppedTyping, 5000);
                        } else if (e.which === 8) {
                            _stoppedTyping();
                        }
                    }
                } else {
                    _stoppedTyping();
                    $scope.sendMessage({'text' : $scope.message});
                }
            }
        };

        // TODO : We might want to put this in a higher level. Maybe rootscope?
        $scope.fromNow = function(time) {
            return moment(time, 'x').fromNow();
        };
        
        function _scrollBottom() {
            setTimeout($ionicScrollDelegate.scrollBottom(true), 300);
        }

        /**
         * The current user has stopped typing
         * @private
         */
        function _stoppedTyping() {
            clearTimeout(_typingTimeout);
            _isTyping = false;
            _emitTyping(false);
        }

        /**
         * Emit message to server
         * @param messageContent
         * @private
         */
        function _emitSendMessage (message) {
            Socket.emit('send:message', message);
        }

        /**
         * Let server know that the current user is typing
         * @param isTyping The current user is currently typing
         * @private
         */
        function _emitTyping (isTyping) {
            Socket.emit('isTyping', {
                'isTyping' : isTyping,
                'conversationId' : $scope.conversation.id
            });
        }
    }
);