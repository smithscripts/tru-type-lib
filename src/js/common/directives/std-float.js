(function () {
    'use strict';

    var module = angular.module('std.float', []);

    module.directive('stdFloat',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdFloat: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdFloat;

                        ngModelCtrl.$formatters.push(function (val) {
                            return val;
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if ((val.toString().split('.').length - 1) > 1) {
                                ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
                                ngModelCtrl.$render();
                                return ngModelCtrl.$modelValue;
                            }

                            var number = Number(val).toPrecision();

                            if (number === 'NaN') {
                                var allParts = String(val).split('');
                                var isNegative = allParts[0] === '-' ? true : false;
                                var numericParts = String(val).split('.');
                                var clean = '';

                                if (numericParts.length >= 2) {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '') + '.' + numericParts[1].toString().replace(/[^0-9]+/g, '');
                                } else {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '');
                                }

                                if (val !== clean) {
                                    if (isNegative)
                                        clean = '-' + clean;

                                    if (ngModelCtrl.$viewValue !== clean) {
                                        var start = element[0].selectionStart;
                                        var end = element[0].selectionEnd + clean.length - val.length;
                                        ngModelCtrl.$setViewValue(clean);
                                        ngModelCtrl.$render();
                                        element[0].setSelectionRange(start, end);
                                    }
                                }

                                if (!isNaN(ngModelCtrl.$modelValue)) {
                                    return +ngModelCtrl.$modelValue;
                                } else {
                                    if (isNullable)
                                        return null;
                                    else
                                        return undefined;
                                }
                            } else if (val === '') {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else {
                                return +number;
                            }
                        });

                        element.bind('blur', function (event) {
                            if (element.val() === '') return;
                            var numericParts = element.val().split('.');
                            var whole = '';
                            var fraction = '';
                            if (numericParts.length >= 2) {
                                if (numericParts[0] === '-') {
                                    whole = '-0';
                                } else {
                                    whole = numericParts[0] === '' ? '0' : numericParts[0].toString().replace(/[^0-9]+/g, '');
                                }
                                fraction = numericParts[1] === '' ? '0' : numericParts[1].toString().replace(/[^0-9]+/g, '');
                                element.val(whole + '.' + fraction);
                            } else
                                element.val(element.val() + '.0');
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();