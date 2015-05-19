(function(){
    'use strict';

    var module = angular.module('std.masked.edit', []);

    module.directive('stdMaskedEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-masked-edit.html'),
                    link: function(scope, element) {
                        scope.data = { value: scope.field.value.$ };
                        scope.onChange = function() {
                            scope.field.value.$ = scope.data.value;
                        };
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();