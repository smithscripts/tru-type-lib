(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdTimeSpanHhMmSs', [function () {
        return function (cfg) {
            cfg = cfg.children;
            return cfg.hours.value.$ + ' H, ' + cfg.minutes.value.$ + ' M, ' + cfg.seconds.value.$ + '.' + cfg.milliseconds.value.$ + ' S';
        };
    }])
})();