(function () {
    'use strict';

    var module = angular.module('std.usa.dollar', []);

    module.directive('stdUsaDollar',
        ['$document',
            function ($document) {
                return {
                    require: 'ngModel',
                    scope: {
                        stdUsaDollar: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdUsaDollar.type.isNullable;
                        var decimalPlaces = scope.stdUsaDollar.type.property.decimalPlaces;

                        if (typeof decimalPlaces === 'undefined')
                            decimalPlaces = 2;

                        var wholePlaces = 38 - decimalPlaces;

                        ngModelCtrl.$parsers.push(function (val) {
                            if (element[0] !== $document[0].activeElement) return ngModelCtrl.$modelValue;
                            var number = Number(val).toPrecision();

                            var numericParts = String(val).split('.');

                            if (numericParts.length >= 2) {
                                var wholeNumberPrecision = numericParts[0].length > wholePlaces;
                                var fractionalNumberPrecision = numericParts[1].length > decimalPlaces;
                            } else {
                                wholeNumberPrecision = numericParts[0].length > wholePlaces;
                            }

                            if (number === 'NaN' || wholeNumberPrecision || fractionalNumberPrecision) {
                                var allParts = String(val).split('');
                                var isNegative = allParts[0] === '-' ? true : false;
                                var numericParts = String(val).split('.');
                                var clean = '';

                                if (numericParts.length >= 2) {
                                    var wholeNumber = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                    var fractionalNumber = numericParts[1].toString().replace(/[^0-9]+/g, '').substring(0, decimalPlaces);
                                    clean = wholeNumber + '.' + fractionalNumber;
                                } else {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
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

                        element.bind('focus', function (event) {
                            element.val(element.val().replace('$', ''));
                        });

                        element.bind('blur', function (event) {
                            if (element.val() === '') return;
                            var numericParts = element.val().split('.');
                            var whole = '';
                            var fraction = '';
                            if (numericParts.length >= 2) {
                                if (numericParts[0] === '-') {
                                    whole = '$-0';
                                } else {
                                    whole = numericParts[0] === '' ? '$0' : '$' + numericParts[0].toString().replace(/[^0-9]+/g, '');
                                }
                                fraction = numericParts[1] === '' || numericParts[1] === '0' ? '00' : numericParts[1].toString().replace(/[^0-9]+/g, '');
                                element.val(whole + '.' + fraction);
                            } else
                                element.val('$' + element.val() + '.00');
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