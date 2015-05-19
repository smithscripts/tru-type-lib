(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDatetimeSpanShort',
        ['stdFilter',
            function (stdFilter) {
                return function (cfg) {
                    cfg = cfg.children;
                    var start = cfg.start.value.$;
                    var end = cfg.end.value.$;
                    var text = '';
                    if (start !== null) {
                        text = stdFilter.formatDate(start, 'MM/dd/yyyy hh:mm a') + ' - ';
                        if (end != null) {
                            if (start.getYear() === end.getYear() && start.getMonth() === end.getMonth() && start.getDay() === end.getDay())
                                text += stdFilter.formatDate(end, 'hh:mm a');
                            else
                                text += stdFilter.formatDate(end, 'MM/dd/yyyy hh:mm a');
                        }
                    } else {
                        if (end !== null)
                            text += stdFilter.formatDate(end, 'MM/dd/yyyy hh:mm a');
                    }
                    return text;
                };
            }])
})();