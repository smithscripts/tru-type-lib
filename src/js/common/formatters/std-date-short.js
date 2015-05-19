(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDateShort',
        ['stdFilter',
            function (stdFilter) {
                return function (cfg) {
                    var v = cfg.value.$;
                    if (v === null)
                        return null;
                    return stdFilter.formatDate(v, 'MM/dd/yyyy');
                };
            }])
})();