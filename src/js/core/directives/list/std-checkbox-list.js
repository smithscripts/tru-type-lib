(function () {
    'use strict';

    var module = angular.module('std.checkbox.list', []);

    module.controller('stdCheckboxListController', ['$scope',
        function ($scope) {

        }]);

    module.directive('stdCheckboxList',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '='
                    },
                    template: $templateCache.get('src/templates/list/std-checkbox-list.html'),
                    controller: 'stdCheckboxListController',
                    link: function (scope, element) {
                        scope.data = { disabled: true };
                    }
                };
            }
        ]);
})();