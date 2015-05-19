(function () {
    'use strict';

    var module = angular.module('std.grid.focus', []);

    module.directive('stdGridFocus',
        ['$document',
            function ($document) {
                return {
                    scope: {
                        stdGridFocus: '='
                    },
                    link: function (scope, element, attrs) {
                        //scope.$watch('stdGridFocus', function(newValue) {
                        //    if (newValue) {
                        //        element[0].querySelectorAll('.ui-grid-viewport')[0].focus();
                        //    }
                        //});

                        document.addEventListener('focus', function (e) {
                            scope.stdGridFocus = isDescendant(element[0], e.target) || e.target.tagName.toLowerCase() === 'body';
                        }, true);

                        function isDescendant(parent, child) {
                            var node = child.parentNode;
                            while (node != null) {
                                if (node == parent) {
                                    return true;
                                }
                                node = node.parentNode;
                            }
                            return false;
                        }
                    }
                };
            }]);
})();