(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdUsaZip', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            if (v.length > 5)
                return v.substring(0, 5) + '-' + v.substring(5);
            return v;
        };
    }])
})();