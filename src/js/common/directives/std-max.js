(function () {
    'use strict';

    var module = angular.module('std.max', []);

    module.directive('stdMax',
        [
            function () {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var max = parseInt(attrs.stdMax);
                        ngModelCtrl.$parsers.push(function (val) {
                            var enteredValue = parseInt(val);
                            if (enteredValue > max) {
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