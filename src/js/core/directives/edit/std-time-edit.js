(function(){
    'use strict';

    var module = angular.module('std.time.edit', []);

    module.directive('stdTimeEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-time-edit.html'),
                    link: function(scope, element, attrs) {
                        scope.data = {period: scope.field.property.period};
                        scope.setPeriod = function() {
                            scope.field.property.period = scope.data.period === 'AM' ? 'PM' : 'AM';
                        };
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();