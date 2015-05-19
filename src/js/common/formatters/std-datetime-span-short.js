(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDatetimeSpanShort',
        ['$filter',
            function ($filter) {
                return function (cfg) {
                    cfg = cfg.children;
                    var start = cfg.start.value.$;
                    var end = cfg.end.value.$;
                    var text = '';
                    if (start !== null) {
                        text = $filter('date')(start, 'MM/dd/yyyy hh:mm a') + ' - ';
                        if (end != null) {
                            if (start.getYear() === end.getYear() && start.getMonth() === end.getMonth() && start.getDay() === end.getDay())
                                text += $filter('date')(end, 'hh:mm a');
                            else
                                text += $filter('date')(end, 'MM/dd/yyyy hh:mm a');
                        }
                    } else {
                        if (end !== null)
                            text += $filter('date')(end, 'MM/dd/yyyy hh:mm a');
                    }
                    return text;
                };
    }])
})();