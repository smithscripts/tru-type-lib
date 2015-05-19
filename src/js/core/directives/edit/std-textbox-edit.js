(function(){
    'use strict';

    var module = angular.module('std.textbox.edit', []);

    /**
     * @ngdoc directive
     * @name std.textbox.edit.directive:stdTextboxEdit
     * @restrict E
     *
     * @description
     * Modifies the default behavior of the html A tag so that the default action is prevented when
     * the href attribute is empty.
     *
     * This change permits the easy creation of action links with the `ngClick` directive
     * without changing the location or causing page reloads, e.g.:
     * `<a href="" ng-click="list.addItem()">Add Item</a>`
     */
    module.directive('stdTextboxEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-textbox-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();