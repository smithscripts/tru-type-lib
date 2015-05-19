(function () {
    'use strict';

    var module = angular.module('std.calendar', []);

    module.directive('stdCalendar',
        ['$compile', '$document', '$timeout',
            function ($compile, $document, $timeout) {
                return {
                    scope: {
                        display: '='
                    },
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var calDaysLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                        var calMonthsLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        var calDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                        var year = null;
                        var month = null;
                        var calendar = null;
                        var mouseOver = false;
                        var clonedScoped = null;

                        function isNumber(n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        }

                        var getCurrentYear = function() {
                            var today = new Date();
                            return today.getFullYear();
                        };

                        var getCurrentMonth = function() {
                            var today = new Date();
                            return today.getMonth();
                        };

                        var getParsedDate = function(unParsedDate) {
                            var parsedDate = unParsedDate.replace( /^\D+/g, '');
                            var month = parsedDate.substring(0,2) - 1;
                            var year = parsedDate.substring(6,10);
                            var date = {};
                            date.month = month;
                            date.year = year;
                            return date;
                        };

                        var setStartDate = function() {
                            var dateParts = element[0].value.split(/[\s]+/);
                            var date = dateParts[0] ? dateParts[0] : '';
                            dateParts = date.split(/[\/]+/);
                            var datePartsJoined = dateParts.join('');

                            var isNumeric = isNumber(datePartsJoined);
                            if (isNumeric) {
                                date = getParsedDate(date);
                                month = date.month;
                                year = date.year;
                            } else {
                                month = getCurrentMonth();
                                year = getCurrentYear();
                            }
                            var today = new Date();
                            return today.getMonth();
                        };

                        function zeroPad(num, places) {
                            var zero = places - num.toString().length + 1;
                            return Array(+(zero > 0 && zero)).join("0") + num;
                        }

                        var getHTML = function(){

                            // get first day of month
                            var firstDay = new Date(year, month, 1);
                            var startingDay = firstDay.getDay();

                            // find number of days in month
                            var monthLength = calDaysInMonth[month];

                            // compensate for leap year
                            if (0 == 1) { // February only!
                                if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
                                    monthLength = 29;
                                }
                            }

                            // do the header
                            var monthName = calMonthsLabels[month];
                            var html = '<table class="ttl-calendar-table" data-ng-mouseenter="onMouseEnter()" data-ng-mouseleave="onMouseLeave()">';
                            html += '<tr><th colspan="7"><button class="tvl-btn ttl-header-previous-button" data-ng-click="previous()">&#60;</button><div class="ttl-header-text">';
                            html +=  monthName + "&nbsp;" + year;
                            html += '</div><button class="tvl-btn ttl-header-next-button" data-ng-click="next()">&#62;</button></th></tr>';
                            html += '<tr class="ttl-calendar-header">';
                            for(var i = 0; i <= 6; i++ ){
                                html += '<td class="ttl-calendar-header-day">';
                                html += calDaysLabels[i];
                                html += '</td>';
                            }
                            html += '</tr><tr>';

                            // fill in the days
                            var day = 1;
                            // this loop is for is weeks (rows)
                            for (var i = 0; i < 9; i++) {
                                // this loop is for weekdays (cells)
                                for (var j = 0; j <= 6; j++) {
                                    html += '<td class="ttl-calendar-day"><div data-ng-class="{\'ttl-calendar-day-hover\': hover' + day + '}" data-ng-click="daySelected(' + day + ')" data-ng-mouseenter="hover' + day + ' = true" data-ng-mouseleave="hover' + day + ' = false"><p class="ttl-calendar-day-text">';
                                    if (day <= monthLength && (i > 0 || j >= startingDay)) {
                                        html += day;
                                        day++;
                                    }
                                    html += '</p></div></td>';
                                }
                                // stop making rows if we've run out of days
                                if (day > monthLength) {
                                    break;
                                } else {
                                    html += '</tr><tr>';
                                }
                            }
                            html += '</tr></table>';

                            return html;
                        };

                        $document.bind('mouseup', function() {
                            scope.$apply(function() {
                                if (!mouseOver && scope.display) {
                                    mouseOver = false;
                                    scope.display = false;
                                }
                            });
                        });

                        scope.$watch('display', function(val) {
                            if (val) {
                                setStartDate();
                                clonedScoped = scope.$new();
                                calendar = $compile(getHTML())(clonedScoped);
                                element.after(calendar);
                            } else if (!val && calendar){
                                mouseOver = false;
                                clonedScoped.$destroy();
                                calendar.remove();
                            }
                        });

                        scope.previous = function(day) {
                            calendar.remove();
                            if (month > 0) {
                                month--;
                            } else {
                                month = 11;
                                year--;
                            }
                            calendar = $compile(getHTML())(scope);
                            element.after(calendar);
                        };

                        scope.next = function(day) {
                            calendar.remove();
                            if (month < 11) {
                                month++;
                            } else {
                                month = 0;
                                year++;
                            }
                            calendar = $compile(getHTML())(scope);
                            element.after(calendar);
                        };


                        scope.onMouseEnter = function() {
                            mouseOver = true;
                        };

                        scope.onMouseLeave = function() {
                            mouseOver = false;
                        };

                        scope.daySelected = function(day) {
                            var dateParts = ngModelCtrl.$viewValue.split(/[\s]/);
                            if (typeof dateParts[1] === 'undefined' || typeof dateParts[2] === 'undefined') {
                                $timeout(function() {
                                    ngModelCtrl.$setViewValue(zeroPad(month + 1, 2) + '/' + zeroPad(day, 2) + '/' + zeroPad(year, 4));
                                    ngModelCtrl.$render();
                                }, 0);
                            } else {
                                $timeout(function() {
                                    ngModelCtrl.$setViewValue(zeroPad(month + 1, 2) + '/' + zeroPad(day, 2) + '/' + zeroPad(year, 4) + ' ' + dateParts[1] + ' ' + dateParts[2]);
                                    ngModelCtrl.$render();
                                }, 0);
                            }
                            scope.display = false;
                        };
                    }
                };
            }]);
})();