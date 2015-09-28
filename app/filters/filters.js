'use strict';

angular.module('expopub.filters', ['ngRoute'])

    .controller('FiltersController', ['$scope', 'Params', function ($scope, Params) {
        var getDaysBetween = function (d1, d2) {
            var dateStart = new Date(d1);
            var dateEnd = new Date(d2);
            return Math.round((dateEnd.getTime() - dateStart.getTime()) / (24 * 60 * 60 * 1000));
        };

        var close = function () {
            $scope.$parent.showFilters = false;
        };

        var getLastDate = function (type, n) {
            var d = new Date();
            switch (type) {
                case 'week':
                    d.setDate(d.getDate() - n * 7);
                    break;
                case 'month':
                    d.setMonth(d.getMonth() - n);
                    break;
                case 'year':
                    d.setFullYear(d.getFullYear() - n);
                    break;
                case 'alltime':
                    d.setFullYear(2014);
                    d.setDate(1);
                    break;
            }
            $scope.dateStart = d;
            $scope.dateEnd = new Date();
        };

        var checkAllSizes = function () {
            for (var i in Params.sizes) {
                if (!Params.sizes[i]) {
                    $scope.allSizes = false;
                    return false;
                }
            }
            $scope.allSizes = true;
            return true;
        };
        var setAllSizes = function () {
            $scope.allSizes = !$scope.allSizes;
            for (var i in Params.sizes) {
                Params.sizes[i] = $scope.allSizes;
            }
        };


        var checkAllCountries = function () {
            for (var i in Params.geo) {
                if (!Params.geo[i]) {
                    $scope.allCountries = false;
                    return false;
                }
            }
            $scope.allCountries = true;
            return true;
        };
        var setAllCountries = function () {
            $scope.allCountries = !$scope.allCountries;
            for (var i in Params.geo) {
                Params.geo[i] = $scope.allCountries;
            }
        };

        $scope.close = close;
        $scope.getLastDate = getLastDate;
        $scope.checkAllSizes = checkAllSizes;
        $scope.setAllSizes = setAllSizes;
        $scope.checkAllCountries = checkAllCountries;
        $scope.setAllCountries = setAllCountries;

        $scope.dateStart = Params.date.start;
        $scope.dateEnd = Params.date.end;
        $scope.activeDateButton = 6;
        getLastDate('alltime');

        $scope.sizes = Params.sizes;
        $scope.allSizes = false;
        $scope.allCountries = false;
        $scope.geo = Params.geo;
        $scope.days = getDaysBetween($scope.dateStart, $scope.dateEnd);

        $scope.$watch('dateStart', function (val) {
            $scope.days = getDaysBetween(val, $scope.dateEnd);
            Params.date.start = val;
            console.log(Params);
        });

        $scope.$watch('dateEnd', function (val) {
            $scope.days = getDaysBetween($scope.dateStart, val);
            Params.date.end = val;
            console.log(Params);
        });
    }]);