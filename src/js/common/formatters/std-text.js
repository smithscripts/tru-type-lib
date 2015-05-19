(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdText', [function () {
        return function (cfg) {
            return cfg.value.$;
        };
    }])
})();