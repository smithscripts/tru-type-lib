(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdId', [function () {
        return function (cfg) {
            return cfg.recordId();
        };
    }])
})();