(function () {
    'use strict';

    var module = angular.module('std.date', []);

    module.directive('stdDate',
        ['$filter', '$timeout', 'stdUtil',
            function ($filter, $timeout, util) {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var format = 'MM/dd/yyyy';
                        var timeZone = 0;
                        var formatParts = format.split('/');
                        var position1Format = formatParts[0].toLowerCase();
                        var position2Format = formatParts[1].toLowerCase();
                        var position3Format = formatParts[2].toLowerCase();

                        var range1Start = 0;
                        var range1End = position1Format.length;
                        var range2Start = range1End + 1;
                        var range2End = range2Start + position2Format.length;
                        var range3Start = range2End + 1;
                        var range3End = range3Start + position3Format.length;

                        var range1 = createRange(range1Start, range1End);
                        var range2 = createRange(range2Start, range2End);
                        var range3 = createRange(range3Start, range3End);

                        var selectedRange = [];
                        var rangeInitialized = false;

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

                        function isNumber(n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        }

                        element.bind('keydown', function(e) {
                            if (e.keyCode === 37) {
                                if (selectedRange === range3) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }
                            if (e.keyCode === 39 || e.keyCode === 191) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range3Start, range3End, range3, true);
                                }
                            }

                            if (e.keyCode === 8) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range3Start, range3End, range3, true);
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
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
                                else if (selectedRange === range3 && !isNaN(selectedText)) {
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2, true);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
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
                                    setRange(range3Start, range3End, range3, true);
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && !isNaN(selectedText)) {
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }

                            if (e.keyCode === 9 && !e.shiftKey) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                } else if (selectedRange === range2) {
                                    setRange(range3Start, range3End, range3, true);
                                    e.preventDefault();
                                }
                            }
                            if (e.keyCode === 9 && e.shiftKey) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                    e.preventDefault();
                                } else if (selectedRange === range3) {
                                    setRange(range2Start, range2End, range2, true);
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
                                    if (position1Format === 'mm') {
                                        if (oldValue === 1 && [0, 1, 2].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else if (oldValue === 0 && [1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else {
                                            if ((rangeInitialized || isNaN(oldValue)) && newValue <= 1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range1Start, range1End, range1, false);
                                            } else if (rangeInitialized && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range2Start, range2End, range2, true);
                                            }
                                            else {
                                                if ([4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                    setRange(range2Start, range2End, range2, false);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range3Start, range3End, range3, true);
                                                } else {
                                                    setRange(range2Start, range2End, range2, true);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range2Start, range2End, range2, false);
                                                }
                                            }
                                        }
                                    }
                                } else if (selectedRange === range2) {
                                    if (position2Format === 'dd') {
                                        if ([0, 1, 2].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range3Start, range3End, range3, true);
                                        } else if (oldValue === 3 && [0, 1].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range3Start, range3End, range3, true);
                                        } else if (oldValue === 3 && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setRange(range3Start, range3End, range3, true);
                                            setValue(zeroPad(newValue, 4));
                                            setRange(range3Start, range3End, range3, false);
                                        } else {
                                            if ((rangeInitialized || isNaN(oldValue))) {
                                                setValue('0' + newValue.toString());
                                                if ([4, 5, 6, 7, 8, 9].indexOf(newValue) > -1)
                                                    setRange(range3Start, range3End, range3, true);
                                                else
                                                    setRange(range2Start, range2End, range2, false);
                                            } else {
                                                setRange(range3Start, range3End, range3, true);
                                                setValue(zeroPad(newValue, 4));
                                                setRange(range3Start, range3End, range3, false);
                                            }
                                        }
                                    }
                                } else if (selectedRange === range3) {
                                    if (position3Format === 'yyyy') {
                                        if (rangeInitialized) {
                                            newValue = getCharFromKeyCode(e);
                                            var numberStr = newValue.toString();
                                            newValue = parseInt('200' + numberStr);
                                        } else if ([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009].indexOf(oldValue) > -1) {
                                            newValue = getCharFromKeyCode(e);
                                            var numberStr = newValue.toString();
                                            newValue = parseInt('20' + (oldValue % 10).toString() + numberStr);
                                        } else if (!isNaN(newValue) && selectedText.length >= 4) {
                                            var trimmedOldValue = selectedText.substring(1);
                                            newValue = trimmedOldValue + getCharFromKeyCode(e).toString();
                                        }
                                        setValue(zeroPad(newValue, 4));
                                        setRange(range3Start, range3End, range3, false);
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

                            if (range3.indexOf(caretPosition) > -1)
                                setRange(range3Start, range3End, range3, true);
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
                                element[0].value = 'mm/dd/yyyy';
                        });

                        element.addClass('ttl-date-selection');

                        ngModelCtrl.$formatters.push(function (val) {
                            ngModelCtrl.$setValidity('invalid-date', true);
                            var date = Date.parse(val);
                            if (!isNaN(date)) {
                                var utc = new Date(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate());
                                return $filter('date')(utc, 'MM/dd/yyyy');
                            } else {
                                return 'mm/dd/yyyy';
                            }
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if (val === 'mm/dd/yyyy') {
                                ngModelCtrl.$setValidity('invalid-date', true);
                                return null;
                            }

                            var dateParts = val.split(/[\/]+/);
                            var datePartsJoined = dateParts.join('');
                            var isNumeric = isNumber(datePartsJoined);
                            if (!isNumeric) {
                                ngModelCtrl.$setValidity('invalid-date', false);
                                return new Date('Invalid');
                            }

                            var year = parseInt(dateParts[2]);
                            var month = parseInt(dateParts[0]);
                            var day = parseInt(dateParts[1]);
                            var feb = year % 4 === 0 && (year % 100 || year % 400 === 0) ? 29 : 28;
                            var monthDays = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                            var numberOfDays = monthDays[month - 1];
                            day = (numberOfDays - day) >= 0 ? day : numberOfDays;
                            if (day !== parseInt(dateParts[1])) {
                                ngModelCtrl.$setViewValue(dateParts[0] + '/' + zeroPad(day, 2) + '/' + dateParts[2]);
                            }
                            ngModelCtrl.$setValidity('invalid-date', true);
                            return new Date(year, (month - 1), day);
                        });
                    }
                };
            }]);
})();