(function () {
    'use strict';

    var module = angular.module('std.select.value.converter', []);

    module.directive('stdSelectValueConverter',
        [
            function () {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        ngModelCtrl.$formatters.push(function (val) {
                            if (val === null)
                                return 'null';
                            return val;
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if (val === null)
                                return undefined;
                            if (val === 'null')
                                return null;
                            return val;
                        });
                    }
                };
            }]);
})();