(function () {
    'use strict';

    var module = angular.module('std.indeterminate', []);

    module.directive('stdIndeterminate',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                      stdIndeterminate: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        if (!scope.stdIndeterminate) return;
                        var truthy = true;
                        var falsy = false;
                        var nully = null;
                        ngModelCtrl.$formatters = [];
                        ngModelCtrl.$parsers = [];
                        ngModelCtrl.$render = function() {
                            var d = ngModelCtrl.$viewValue;
                            element.data('checked', d);
                            switch(d){
                                case truthy:
                                    element.prop('indeterminate', false);
                                    element.prop('checked', true);
                                    break;
                                case falsy:
                                    element.prop('indeterminate', false);
                                    element.prop('checked', false);
                                    break;
                                default:
                                    element.prop('indeterminate', true);
                            }
                        };
                        element.bind('click', function() {
                            var d;
                            switch(element.data('checked')){
                                case falsy:
                                    d = truthy;
                                    break;
                                case truthy:
                                    d = nully;
                                    break;
                                default:
                                    d = falsy;
                            }
                            ngModelCtrl.$setViewValue(d);
                            scope.$apply(ngModelCtrl.$render);
                        });
                    }
                };
            }]);
})();