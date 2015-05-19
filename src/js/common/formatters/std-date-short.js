(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDateShort',
        ['$filter',
            function ($filter) {
                return function (cfg) {
                    var v = cfg.value.$;
                    if (v === null)
                        return null;
                    return $filter('date')(v, 'MM/dd/yyyy');
                };
    }])
})();