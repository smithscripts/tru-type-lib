(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdUsaDollars', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return '$' + v.toFixed(2);
        };
    }])
})();