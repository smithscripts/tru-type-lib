(function(){
    'use strict';

    var module = angular.module('std.decimal.edit', []);

    module.directive('stdDecimalEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-decimal-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();