(function(){
    'use strict';

    var module = angular.module('std.date.edit', []);

    module.directive('stdDateEdit',
        ['$templateCache', '$timeout', '$document', 'stdDisplay',
            function($templateCache, $timeout, $document, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-date-edit.html'),
                    link: function(scope, element, attrs) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();