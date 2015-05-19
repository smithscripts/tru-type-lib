(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdUsaSocialSecurity', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return v.substring(0, 3) + '-' + v.substring(3, 5) + '-' + v.substring(5);
        };
    }])
})();