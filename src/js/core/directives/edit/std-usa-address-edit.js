(function(){
    'use strict';

    var module = angular.module('std.usa.address.edit', []);

    module.directive('stdUsaAddressEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-usa-address-edit.html'),
                    link: {
                        pre: function (scope, element) {
                            scope.field.children.zip.property.entryFilter = scope.field.property.zipEntryFilter;
                            scope.field.children.zip.property.watermark = scope.field.property.zipWatermark;
                        },
                        post: function(scope, element) {
                            var stateLabel = angular.element(element[0].querySelectorAll('label')[4]);
                            var zipLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            stateLabel.addClass('ttl-no-label-width');
                            zipLabel.addClass('ttl-no-label-width');
                            display.setVisibility(element, scope.field.type.canDisplay);
                        }
                    }
                };
            }
        ]);
})();