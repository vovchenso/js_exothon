'use strict';

angular.module('expopub.earnings', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/earnings', {
            templateUrl: 'earnings/earnings.html',
            controller: 'EarningsController'
        });
    }])

    .controller('EarningsController', ['$scope', '$location', function($scope, $location) {
        var go = function () {
            $location.path('/dashboard');
        };

        $scope.$parent.state = 'earnings';

        $scope.go = go;
    }]);
