(function () {
    'use strict';

    var module = angular.module('std.dropdown.edit', []);

    module.controller('stdDropdownEditController', ['$scope',
        function ($scope) {
            var self = this;

            self.init = function () {
                $scope.data = {};
                $scope.field.queryChoices($scope).then(function (results) {
                    $scope.choices = [];
                    angular.forEach(results, function (value, key) {
                        $scope.choices.push(value);
                    });

                    if ($scope.field.type.isNullable)
                        $scope.choices.unshift({ label: ' ', value: { $: -1 } });

                    if ($scope.field.value.$)
                        $scope.data.value = $scope.field.value.$;

                    if ($scope.field.type.isNullable && !$scope.field.value.$)
                        $scope.data.value = $scope.choices[0].value.$;
                });
            };

            self.init();

            $scope.onChange = function () {
                if ($scope.data.value === -1)
                    $scope.field.value.$ = null;
                else
                    $scope.field.value.$ = $scope.data.value;
            };

            $scope.$watch('field.value.$', function () { self.init(); });
        }]);

    module.directive('stdDropdownEdit',
        ['$templateCache', 'stdDisplay',
            function ($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-dropdown-edit.html'),
                    controller: 'stdDropdownEditController',
                    link: function (scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();