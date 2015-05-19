(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdPercentage', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return (v * 100).toFixed(2) + '%';
        };
    }])
})();