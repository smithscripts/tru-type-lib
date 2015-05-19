(function () {
    'use strict';

    var module = angular.module('std.datetime.span.edit', []);

    module.controller('stdDatetimeSpanEditController', ['$scope', '$timeout', '$element',
        function ($scope, $timeout, $element) {

        }]);

    module.directive('stdDatetimeSpanEdit',
        ['$templateCache', '$timeout', '$filter', 'stdDisplay',
            function ($templateCache, $timeout, $filter, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-datetime-span-edit.html'),
                    controller: 'stdDatetimeSpanEditController',
                    link: function (scope, element) {
                        var fields = element[0].querySelectorAll('input');

                        fields[0].addEventListener('blur', function (event) {
                            var startValue = scope.field.children.start.value.$;
                            var endValue = scope.field.children.end.value.$;
                            if (endValue && endValue instanceof Date && startValue && startValue instanceof Date) {
                                if (startValue > endValue) {
                                    $timeout(function () {
                                        fields[1].value = $filter('date')(startValue, 'MM/dd/yyyy hh:mm a');
                                    }, 0);
                                }
                            }
                        }, true);

                        fields[1].addEventListener('blur', function (event) {
                            var endValue = scope.field.children.end.value.$;
                            var startValue = scope.field.children.start.value.$;
                            if (startValue && startValue instanceof Date && endValue && endValue instanceof Date) {
                                if (startValue > endValue) {
                                    $timeout(function () {
                                        fields[0].value = $filter('date')(endValue, 'MM/dd/yyyy hh:mm a');
                                    }, 0);
                                }
                            }
                        }, true);

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();