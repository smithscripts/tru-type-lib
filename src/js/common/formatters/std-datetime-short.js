(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDatetimeShort',
        ['stdFilter',
            function (stdFilter) {
                return function (cfg) {
                    var v = cfg.value.$;
                    return stdFilter.formatDate(v, 'MM/dd/yyyy hh:mm a');
                };
            }])
})();