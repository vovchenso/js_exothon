'use strict';

// Declare app level module which depends on views, and components
angular.module('expopub', [
    'ngRoute',
    'datePicker',
    'expopub.dashboard',
    'expopub.filters',
    'expopub.details',
    'expopub.login',
    'expopub.earnings'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }]);
