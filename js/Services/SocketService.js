/**
 * Service that wraps socket.io functionnality
 */
angular.module('proximity.services').factory('Socket', function($rootScope) {

    /**
     * Wraps socket.io on function
     * @param eventName
     * @param callback
     */
    var on = function (eventName, callback) {
        socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                callback.apply(socket, args);
            });
        });
    };

    /**
     * Wraps socket.io emit function
     * @param eventName
     * @param callback
     */
    var emit = function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                if (callback) {
                    callback.apply(socket, args);
                }
            });
        });
    };

    socket.on('log', function(msg) {
        console.log('SERVER LOG : ' + msg);
    });

    return {
        on: on,
        emit: emit
    };
});