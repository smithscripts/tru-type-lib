(function () {
    'use strict';

    var module = angular.module('std.adorner.edit', []);

    module.controller('stdAdornerEditController', ['$scope',
        function ($scope) {

        }]);

    module.directive('stdAdornerEdit',
        ['$templateCache', '$compile', '$timeout', 'stdUtil',
            function ($templateCache, $compile, $timeout, stdUtil) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-adorner-edit.html'),
                    controller: 'stdAdornerEditController',
                    link: function (scope, element) {
                        var grid = stdUtil.getClosestParentByClass(element[0], '.ui-grid-render-container');
                        var cell = element.parent().parent();
                        var cellContent = element.parent();

                        scope.onFocus = function () {
                            cell.css('overflow', 'visible');
                            cellContent.css('overflow', 'visible');
                            var html = '<div class="ttl-adorner" style="position:relative;overflow:" tru-focus-first focus="true" tru-label-container><div style="position:absolute;z-index:1000;top:0;left:0;background:#fff;border:1px lightgray solid;width:inherit;padding:5px;"><std-usa-address-edit field="field"></std-usa-address-edit></div></div>';
                            element.html(html);
                            $compile(element.contents())(scope);

                            var inputs = element[0].querySelectorAll('input,select,textarea');
                            var lastInput = inputs[inputs.length - 1];
                            lastInput.onkeydown = function (e) {
                                e = e || window.event;
                                if (e.keyCode == 9) {
                                    grid.focus();
                                    cell.css('overflow', 'hidden');
                                    cellContent.css('overflow', 'hidden');
                                    element.remove();
                                }
                            }
                        }
                    }
                };
            }
        ]);
})();