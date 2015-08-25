angular.module('proximity.controllers').controller('TrendController', function ($scope, $ionicPopup, $ionicLoading, $http, Trends) {
    $scope.$on('connected', function(event, args) {
        $scope.trends = Trends.all();
    });
});