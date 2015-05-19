(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdTimeShort',
        ['$filter',
            function ($filter) {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;

            var result = {};
            var duration = v.match(/^P([0-9]+Y|)?([0-9]+M|)?([0-9]+D|)?T?([0-9]+H|)?([0-9]+M|)?([0-9]+S|)?$/);

            result.hours = parseInt(duration[4] ? duration[4] : 0);
            result.minutes = parseInt(duration[5] ? duration[5] : 0);
            result.seconds = parseInt(duration[6] ? duration[6] : 0);

            var datetime = new Date('01/01/1999 ' + result.hours + ':' + result.minutes + ':' + result.seconds);
            return $filter('date')(datetime, 'hh:mm a');
        };
    }])
})();