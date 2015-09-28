'use strict';

angular.module('expopub.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginController'
        });
    }])

    .controller('LoginController', ['$scope', '$location', function($scope, $location) {
        var login = function ($event) {
            $event.preventDefault();
            $location.path('/earnings');
        };

        $scope.$parent.state = 'login';

        $scope.login = login;
    }]);
