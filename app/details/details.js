'use strict';

angular.module('expopub.details', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/details', {
            templateUrl: 'details/details.html',
            controller: 'DetailsController'
        });
        $routeProvider.when('/details/:type', {
            templateUrl: 'details/details.html',
            controller: 'DetailsController'
        });
    }])

    .controller('DetailsController', ['$scope', '$routeParams', '$window', function($scope, $routeParams, $window) {
        $scope.$parent.state = 'details';
        $scope.$parent.types = {
            'netrevenue': 'Net revenue',
            'grossrevenue': 'Gross revenue',
            'ecpm': 'ECPM',
            'fillrate': 'Fill rate',
            'clicks': 'Clicks',
            'clickstroughrate': 'Clicks through rate',
            'marketviews': 'Market views',
            'totalviews': 'Total views'
        };
        $scope.$parent.type = $routeParams.type;

        var initCanvas = function () {
            var canvas = angular.element('#canvas'),
                layer = angular.element('#layer'),
                body = angular.element('body'),
                width = canvas.parent().width(),
                height = canvas.parent().height();

            $scope.period = 7;

            canvas.attr('width', width);
            canvas.attr('height', height);

            var stage = new Stage(canvas[0]);

            (new Layer(stage, layer[0]))
                .on(TOUCH.Event.START, function() {
                    body.addClass('state-chart-drag');
                })
                .on(TOUCH.Event.END, function() {
                    body.removeClass('state-chart-drag');
                });

            stage.draw();
        };

        initCanvas();

        $window.addEventListener('resize', initCanvas);

    }]);