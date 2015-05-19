(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdRef', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return v.toString();
        };
    }])
})();