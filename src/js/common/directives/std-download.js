(function(){
    'use strict';

    var module = angular.module('std.download', []);

    module.directive('stdDownload',
        ['$templateCache', '$sce',
            function($templateCache, $sce) {
                return {
                    restrict: 'E',
                    scope: {
                        url: '=',
                        refs: '='
                    },
                    template: $templateCache.get('src/templates/common/download.html'),
                    link: function(scope, element, attrs) {
                        scope.data = {
                            url: undefined,
                            refs: undefined
                        };
                        scope.$watch('url', function(newValue) {
                            if (newValue) {
                                scope.data.url = $sce.trustAsResourceUrl(scope.url);
                                scope.data.refs = scope.refs;
                                element[0].submit();
                            }
                        });
                    }
                };
            }
        ]);
})();