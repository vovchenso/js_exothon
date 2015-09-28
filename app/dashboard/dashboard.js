'use strict';

angular.module('expopub.dashboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashboard'
        });
    }])

    .controller('DashboardController', ['$scope', 'Params', function ($scope, Params) {
        var data = {
            'netrevenue': {
                'name': 'Net revenue',
                'value': '$2,732,34.58',
                'growth': {
                    'relative': 0.35,
                    'absolute': '+$25.64'
                },
                'annual': {16: 10, 17: 14, 18: 19, 19: 20, 20: 31, 21: 18, 22: 90, 23: 100, 24: 78, 25: 65}
            },
            'grossrevenue': {
                'name': 'Gross revenue',
                'value': '$341.58',
                'growth': {
                    'relative': 0.35,
                    'absolute': '+$15.64'
                },
                'annual': {16: 10, 17: 14, 18: 19, 19: 20, 20: 31, 21: 18, 22: 90, 23: 100, 24: 78, 25: 65}
            },
            'ecpm': {
                'name':'ECPM',
                'value': '$341.58',
                'growth': {
                    'relative': 0.35,
                    'absolute': '+$15.64'
                },
                'annual': {16: 10, 17: 14, 18: 19, 19: 20, 20: 31, 21: 18, 22: 90, 23: 100, 24: 78, 25: 65}
            },
            'fillrate': {
                'name':'Fill rate',
                'value': '39.31%',
                'growth': {
                    'relative': -0.32,
                    'absolute': '-2.07%'
                },
                'annual': {16: 10, 17: 14, 18: 19, 19: 20, 20: 31, 21: 18, 22: 90, 23: 100, 24: 78, 25: 65}
            },
            'clicks': {
                'name':'Clicks',
                'value': '592',
                'growth': {
                    'relative': 0.32,
                    'absolute': '+34'
                },
                'annual': {16: 10, 17: 14, 18: 19, 19: 20, 20: 31, 21: 18, 22: 90, 23: 100, 24: 78, 25: 65}
            },
            'clickstroughrate': {
                'name': 'Click through rate',
                'value': '203',
                'growth': {
                    'relative': 0.32,
                    'absolute': '+20'
                },
                'annual': {16: 10, 17: 14, 18: 19, 19: 20, 20: 31, 21: 18, 22: 90, 23: 100, 24: 78, 25: 65}
            },
            'marketviews': {
                'name': 'Market views',
                'value': '14150',
                'growth': {
                    'relative': 5,
                    'absolute': '+120'
                },
                'annual': {16: 10, 17: 14, 18: 19, 19: 20, 20: 31, 21: 18, 22: 90, 23: 100, 24: 78, 25: 65}
            },
            'totalviews': {
                'name': 'Total views',
                'value': '17598',
                'growth': {
                    'relative': 5,
                    'absolute': '+138'
                },
                'annual': {16: 10, 17: 14, 18: 19, 19: 20, 20: 31, 21: 18, 22: 90, 23: 100, 24: 78, 25: 65}
            }
        };
        $scope.$parent.state = 'dashboard';
        $scope.Math = Math;
        var vm = this;
        vm.data = data;
        vm.dateStart = Params.date.start;
        vm.dateEnd = Params.date.end;
    }]);