(function(){
    'use strict';

    var module = angular.module('std.float.edit', []);

    module.directive('stdFloatEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-float-edit.html'),
                    link: function(scope, element, attrs, ngModelCtrl) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();