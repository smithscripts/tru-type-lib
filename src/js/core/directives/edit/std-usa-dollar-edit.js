(function(){
    'use strict';

    var module = angular.module('std.usa.dollar.edit', []);

    module.directive('stdUsaDollarEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-usa-dollar-edit.html'),
                    link: function(scope, element, attrs, ngModelCtrl) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();