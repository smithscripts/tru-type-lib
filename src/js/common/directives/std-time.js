(function () {
    'use strict';

    var module = angular.module('std.time', []);

    module.directive('stdTime',
        ['$filter', '$timeout',
            function ($filter, $timeout) {
                return {
                    require: 'ngModel',
                    scope: {
                        stdTime: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var format = '--:--';
                        var timeZone = 0;
                        var formatParts = format.split(':');
                        var position1Format = formatParts[0];
                        var position2Format = formatParts[1];

                        var range1Start = 0;
                        var range1End = 2;
                        var range2Start = 3;
                        var range2End = 5;

                        var range1 = createRange(range1Start, range1End);
                        var range2 = createRange(range2Start, range2End);

                        var selectedRange = [];
                        var rangeInitialized = false;
                        var militaryTime = scope.stdTime.property.militaryTime;

                        var mouseDown = new Date().getTime(),
                            previousMouseDown = mouseDown;

                        var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1
                        || navigator.userAgent.toLowerCase().indexOf("trident") != -1);

                        function getCaretPosition() {
                            var caretPos = 0;   // IE Support
                            if (document.selection) {
                                element[0].focus();
                                var selection = document.selection.createRange();
                                selection.moveStart('character', -element[0].value.length);
                                caretPos = selection.text.length;
                            }
                            // Firefox support
                            else if (element[0].selectionStart || element[0].selectionStart == '0')
                                caretPos = element[0].selectionStart;
                            return (caretPos);
                        }

                        function createRange(start, end) {
                            var array = [];
                            for (var i = start; i <= end; i++) {
                                array.push(i);
                            }
                            return array;
                        }

                        function getSelectedText() {
                            return element[0].value.substring(selectedRange[0], selectedRange[selectedRange.length - 1]);
                        }

                        function replaceRange(s, start, end, substitute) {
                            return s.substring(0, start) + substitute + s.substring(end);
                        }

                        function zeroPad(num, places) {
                            var zero = places - num.toString().length + 1;
                            return Array(+(zero > 0 && zero)).join("0") + num;
                        }

                        function setValue(value) {
                            ngModelCtrl.$setViewValue(replaceRange(element[0].value, selectedRange[0], selectedRange[selectedRange.length - 1], value));
                            ngModelCtrl.$render();
                        }

                        function setRange(rangeStart, rangeEnd, rangeToSelect, ri) {
                            element[0].setSelectionRange(rangeStart, rangeEnd);
                            selectedRange = rangeToSelect;
                            rangeInitialized = ri;
                        }

                        function getCharFromKeyCode(e) {
                            if(e.keyCode >= 96 && e.keyCode <= 105)
                                return parseInt(String.fromCharCode(e.keyCode - 48));

                            return parseInt(String.fromCharCode(e.keyCode));
                        }

                        element.bind('keydown', function(e) {
                            if (e.keyCode === 37) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }
                            if (e.keyCode === 39 || (e.keyCode === 186 && e.shiftKey)) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                }
                            }

                            if (e.keyCode === 8) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2, true);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }

                            if (e.keyCode === 46) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }

                            if (e.keyCode === 9 && !e.shiftKey) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                }
                            }
                            if (e.keyCode === 9 && e.shiftKey) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                    e.preventDefault();
                                }
                            }

                            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                                var newValue,
                                    oldValue,
                                    selectedText = getSelectedText();

                                if (selectedText === '') return;

                                oldValue = parseInt(selectedText);
                                newValue = getCharFromKeyCode(e);

                                if (selectedRange === range1) {
                                    if (oldValue === 1 && [0, 1, 2].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, true);
                                    } else if (militaryTime && oldValue === 1 && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, true);
                                    } else if (militaryTime && oldValue === 2 && [1, 2, 3].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, true);
                                    } else {
                                        if (rangeInitialized || isNaN(oldValue)) {
                                            setValue('0' + newValue.toString());
                                            if ([0, 1].indexOf(newValue) > -1 || (militaryTime && [0, 1, 2].indexOf(newValue) > -1))
                                                setRange(range1Start, range1End, range1, false);
                                            else
                                                setRange(range2Start, range2End, range2, true);
                                        }
                                        else {
                                            if (!militaryTime && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 ) {
                                                setRange(range2Start, range2End, range2, true);
                                                setValue('0' + newValue.toString());
                                                setRange(range2Start, range2End, range2, false);
                                            }
                                            else if (militaryTime && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range2Start, range2End, range2, true);
                                            } else {
                                                setValue('0' + newValue.toString());
                                                setRange(range1Start, range1End, range1, true);
                                            }
                                        }
                                    }
                                } else if (selectedRange === range2) {
                                    if ([1, 2, 3, 4, 5].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, false);
                                    } else {
                                        setValue('0' + newValue.toString());
                                        setRange(range2Start, range2End, range2, false);
                                    }
                                }
                            }
                            if (e.keyCode !== 9)
                                e.preventDefault();

                        });

                        element.bind('mouseup', function(e){
                            var caretPosition = getCaretPosition();
                            var sel = window.getSelection();
                            sel.removeAllRanges();

                            if (range1.indexOf(caretPosition) > -1)
                                setRange(range1Start, range1End, range1, true);

                            if (range2.indexOf(caretPosition) > -1)
                                setRange(range2Start, range2End, range2, true);
                        });

                        element.bind('mousemove', function(e){
                            if(e.stopPropagation) e.stopPropagation();
                            if(e.preventDefault) e.preventDefault();
                            e.cancelBubble = true;
                            e.returnValue = false;
                            return false;
                        });

                        element.bind('mousedown', function(e){
                            var time = new Date().getTime();

                            if((time - mouseDown) < 450)
                            {
                                previousMouseDown = mouseDown;
                                mouseDown = time;

                                e.preventDefault();
                                return false;
                            }

                            previousMouseDown = mouseDown;
                            mouseDown = time;
                        });

                        element.bind('copy', function(e) {
                            var textToPutOnClipboard = element[0].value;

                            if (isIe) {
                                window.clipboardData.setData('Text', textToPutOnClipboard);
                            } else {
                                e.clipboardData.setData('text/plain', textToPutOnClipboard);
                            }
                            e.preventDefault();
                        });

                        element.bind('cut', function(e){
                            e.preventDefault();
                        });

                        element.bind('paste', function(e){
                            e.preventDefault();
                        });

                        element.bind('focus', function(e){
                            $timeout(function() {
                                setRange(range1Start, range1End, range1, true);
                            }, 0)
                        });

                        element.bind('blur', function(e){
                            if (ngModelCtrl.$modelValue === null)
                                element[0].value = '--:--';
                        });

                        element.addClass('ttl-date-selection');

                        scope.$watch('stdTime.property.period', function(newValue, oldValue){
                            if (ngModelCtrl.$modelValue === null || newValue === oldValue) return;
                            var val = element[0].value;
                            var timeParts = String(val).split(':');
                            var hours = parseInt(timeParts[0]);
                            var minutes = parseInt(timeParts[1]);
                            if (isNaN(hours) || isNaN(minutes)) {
                                //Do Nothing
                            } else {
                                if (newValue ==='AM' && hours === 12) {
                                    hours = 0;
                                } else if (newValue === 'PM' && hours < 12) {
                                    hours += 12;
                                }
                                var newDate = new Date(ngModelCtrl.$modelValue);
                                newDate.setHours(hours);
                                //Do this watch being out of context we have clear the value and re-render to get the parser to fire.
                                ngModelCtrl.$setViewValue($filter('date')(null, 'hh:mm'));
                                ngModelCtrl.$render();
                                ngModelCtrl.$setViewValue($filter('date')(newDate, 'hh:mm'));
                                ngModelCtrl.$render();
                            }
                        });

                        ngModelCtrl.$formatters.push(function (val) {
                            var date = Date.parse(val);
                            if (!isNaN(date)) {
                                if (!militaryTime)
                                    scope.stdTime.property.period = (val.getHours() >= 12) ? "PM" : "AM";
                                return $filter('date')(val, 'hh:mm');
                            } else {
                                return '--:--';
                            }
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            var timeParts = String(val).split(':');
                            var hours = parseInt(timeParts[0]);
                            var minutes = parseInt(timeParts[1]);
                            var period = scope.stdTime.property.period;

                            if (isNaN(hours) || isNaN(minutes)) {
                                return null;
                            }

                            val = new Date();
                            if (period ==='AM' && hours === 12) {
                                hours = 0;
                            } else if (period === 'PM' && hours < 12) {
                                hours += 12;
                            }
                            val.setHours(hours);
                            val.setMinutes(minutes);
                            var date = Date.parse(ngModelCtrl.$modelValue);
                            if (!isNaN(date))
                            {
                                val.setFullYear(ngModelCtrl.$modelValue.getFullYear());
                                val.setMonth(ngModelCtrl.$modelValue.getMonth());
                                val.setDate(ngModelCtrl.$modelValue.getDate());

                                return val;
                            }
                            return val;
                        });
                    }
                };
            }]);
})();