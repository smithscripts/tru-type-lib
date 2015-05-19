(function () {
    'use strict';

    var module = angular.module('std.duration', []);

    module.directive('stdDuration',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdDurationPeriod: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var lastValidInput = undefined;
                        var fromIsoDuration = function (value) {
                            var result = {};
                            var duration = value.match(/^P([0-9]+Y|)?([0-9]+M|)?([0-9]+D|)?T?([0-9]+H|)?([0-9]+M|)?([0-9]+S|)?$/);

                            if (duration) {
                                var militaryHours = parseInt(duration[4] ? duration[4] : 0);
                                result.years = parseInt(duration[1]);
                                result.months = parseInt(duration[2]);
                                result.days = parseInt(duration[3]);
                                result.hours = militaryHours > 12 ? militaryHours - 12 : militaryHours;
                                result.hours = militaryHours === 0 ? 12 : result.hours;
                                result.minutes = parseInt(duration[5] ? duration[5] : 0);
                                result.seconds = parseInt(duration[6]);
                                result.period = militaryHours >= 12 ? 'PM' : 'AM';
                                return result;
                            } else {
                                throw new Error('Invalid Format');
                            }
                        };

                        var prependZero = function (val) {
                            if (val.toString().length === 1)
                                val = '0' + val;
                            return val;
                        };

                        var setViewValue = function () {
                            var val = element[0].value;
                            var timeParts = val.split(":");
                            var hours = timeParts[0];
                            var minutes = timeParts[1];

                            if (!hours)
                                hours = '00';
                            if (!minutes)
                                minutes = '00';

                            if (hours.length === 1)
                                hours = prependZero(hours);

                            if (minutes.length === 1)
                                minutes = prependZero(minutes);

                            ngModelCtrl.$setViewValue(hours + ':' + minutes);
                            ngModelCtrl.$render();
                        };

                        element.bind('blur', function (e) {
                            setViewValue();
                        });

                        var replaceAt = function (index, character) {
                            return this.substr(0, index) + character + this.substr(index + character.length);
                        };

                        ngModelCtrl.$parsers.push(function (val) {
                            var timeParts = val.split(":");
                            var hoursStr = timeParts[0];
                            var hours = parseInt(timeParts[0]);
                            var minutesStr = timeParts[1];
                            var minutes = parseInt(timeParts[1]);
                            var colonCount = (val.match(/:/g) || []).length;
                            var integerCount = val.replace(/[^0-9]+/g, '').length;
                            var rawTime = val.replace(/:/i, '');
                            var clean = rawTime.toString().replace(/[^0-9]+/g, '');
                            if (val.length > 5 || colonCount > 1 || integerCount > 4 || rawTime !== clean) {
                                ngModelCtrl.$setViewValue(lastValidInput);
                                ngModelCtrl.$render();
                                return ngModelCtrl.$modelValue;
                            } else if (timeParts.length === 1 && !isNaN(hours)) {
                                if (hours > 12 || hoursStr.length > 2) {
                                    ngModelCtrl.$setViewValue(lastValidInput);
                                    ngModelCtrl.$render();
                                    return ngModelCtrl.$modelValue;
                                }
                                lastValidInput = val;
                            } else if (timeParts.length === 2 && !isNaN(minutes)) {
                                if (minutes > 59 || minutesStr.length > 2) {
                                    ngModelCtrl.$setViewValue(lastValidInput);
                                    ngModelCtrl.$render();
                                    return ngModelCtrl.$modelValue;
                                }
                                lastValidInput = val;
                            } else {
                                lastValidInput = val;
                            }

                            if (!hoursStr)
                                hoursStr = '00';
                            if (!minutesStr)
                                minutesStr = '00';

                            if (hoursStr.length === 1)
                                hoursStr = prependZero(hoursStr);

                            if (minutesStr.length === 1)
                                minutesStr = prependZero(minutes);

                            if (scope.stdDurationPeriod === 'PM' && hours < 12)
                                hoursStr = (+hoursStr + 12).toString();
                            if (scope.stdDurationPeriod === 'AM' && hours === 12)
                                hoursStr = '00';

                            if (val) {
                                var newDuration = 'PT'
                                if (hoursStr !== '00')
                                    newDuration += hoursStr + 'H';
                                if (minutesStr !== '00')
                                    newDuration += minutesStr + 'M';
                                if (newDuration !== ngModelCtrl.$modelValue)
                                    return newDuration;
                                else
                                    return ngModelCtrl.$modelValue
                            } else {
                                return ngModelCtrl.$modelValue;
                            }
                        });

                        ngModelCtrl.$formatters.push(function (val) {
                            var time = fromIsoDuration(val);
                            scope.stdDurationPeriod = time.period;
                            lastValidInput = prependZero(time.hours) + ':' + prependZero(time.minutes);
                            return lastValidInput;
                        });

                        scope.$watch('stdDurationPeriod', function (val) {
                            var temp = lastValidInput;
                            ngModelCtrl.$setViewValue('');
                            ngModelCtrl.$render();
                            ngModelCtrl.$setViewValue(temp);
                            ngModelCtrl.$render();
                        });
                    }
                };
            }]);
})();