angular.module('proximity.controllers')
.controller('UserController', function ($scope, $ionicPopup, $ionicLoading, $http, Users, Socket) {
    $scope.$on('refresh:users', function(event, args) {
        $scope.users = Users.all();
    });
});