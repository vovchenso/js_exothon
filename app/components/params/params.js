'use strict';

angular.module('expopub')
    .factory('Params', function () {
        var Params = {
            date: {
                start: '2015-09-08T01:55:28+00:00',
                end: '2015-09-09T01:55:28+00:00'
            },
            sizes: {
                '320x50': true,
                '768x90': false,
                '300x250': false,
                '1024x768': false,
                '320x480': false
            },
            geo: {
                'USA': false,
                'Mexico': false,
                'France': false,
                'Spain': false,
                'Canada': false,
                'United Kingdom': true,
                'Malaysia': false,
                'Zambia': false,
                'China': false,
                'Ireland': false
            }
        };

        return Params;
    });