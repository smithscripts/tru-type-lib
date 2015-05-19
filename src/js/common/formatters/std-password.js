(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdPassword', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            if (v.length > 0)
                return '********';
            return '';
        };
    }])
})();