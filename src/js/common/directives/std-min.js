(function () {
    'use strict';

    var module = angular.module('std.min', []);

    module.directive('stdMin',
        [
            function () {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var min = parseInt(attrs.stdMin);
                        ngModelCtrl.$parsers.push(function (val) {
                            var enteredValue = parseInt(val);
                            if (enteredValue < min) {
                                ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
                                ngModelCtrl.$render();
                                return ngModelCtrl.$modelValue;
                            }

                            return val;
                        });
                    }
                };
            }]);
})();