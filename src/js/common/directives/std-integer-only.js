(function () {
    'use strict';

    var module = angular.module('std.integer.only', []);

    module.directive('stdIntegerOnly',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdIntegerOnly: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdIntegerOnly.type.isNullable;
                        var isEditContext = scope.stdIntegerOnly.isEditContext;
                        var isSearchContext = scope.stdIntegerOnly.isSearchContext;

                        ngModelCtrl.$parsers.push(function (val) {
                            var parts = String(val).split('');
                            var isNegative = parts[0] === '-' ? true : false;
                            var clean = val.toString().replace(/[^0-9]+/g, '');

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

                            //clean === '' because isNaN return false for empty string.
                            if (clean === '' && isSearchContext) {
                                return undefined;
                            } else if (clean === '' && isEditContext) {
                                return null;
                            } else if (isNaN(clean) && isSearchContext) {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else if (isNaN(clean) && isEditContext) {
                                return null;
                            } else
                                return parseInt(clean);
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