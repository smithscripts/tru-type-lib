(function(){
    'use strict';
    var module = angular.module('std.filter', []);
    module.service('stdFilter',
        [
            '$filter',
            function ($filter) {
                /**
                 * Returns null for null, a msg (invalid date) for an invalid date object or the
                 * result of angular's date filter.
                 * @param {Date} date - Date object.
                 * @param {string} format - specifies the output format -- see angular's $filter('date').
                 */
                this.formatDate = function (date, format) {
                    if (date === null)
                        return null;
                    if (isNaN(date.getTime()))
                        return '(invalid date)';
                    return $filter('date')(date, format);
                };
            }
        ]);
})();