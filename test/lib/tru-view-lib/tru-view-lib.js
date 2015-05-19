(function(){
    'use strict';

    var module = angular.module('tru.column', []);

    module.controller('truColumnController', ['$scope',
        function ($scope) {

        }]);

    module.directive('truColumn',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    transclude: true,
                    replace: true,
                    scope: true,
                    controller: 'truColumnController',
                    template: $templateCache.get('src/templates/tru-column.html')
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('tru.group.box', []);

    module.controller('truGroupBoxController', ['$scope',
        function ($scope) {

        }]);

    module.directive('truGroupBox',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    transclude: true,
                    replace: true,
                    scope: true,
                    controller: 'truGroupBoxController',
                    template: $templateCache.get('src/templates/tru-group-box.html'),
                    link: function(scope, element, attrs) {
                        scope.label = attrs.label;
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('tru.row', []);

    module.controller('truRowController', ['$scope',
        function ($scope) {

        }]);

    module.directive('truRow',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    transclude: true,
                    replace: true,
                    scope: true,
                    controller: 'truRowController',
                    template: $templateCache.get('src/templates/tru-row.html')
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('tru.label.container', []);

    module.controller('truLabelContainerController', ['$scope',
        function ($scope) {
            var self = this;
            self.labelCount = 0;
            self.labels = [];

            self.addLabel = function (label) {
                self.labels.push(label);
            };

            self.setMaxWidth = function() {
                var max = 0;
                jQuery.fn.evenIfHidden = function (callback) {

                    return this.each(function () {
                        var s = $(this);
                        var styleBackups = [];

                        var hiddenElements = s.parents().andSelf().filter(':hidden');

                        if (!hiddenElements.length) {
                            callback(s);
                            return true; //continue the loop
                        }

                        hiddenElements.each(function () {
                            var style = $(this).attr('style');
                            style = typeof style == 'undefined' ? '' : style;
                            styleBackups.push(style);
                            $(this).attr('style', style + ' display: block !important;');
                        });

                        hiddenElements.eq(0).css('left', -10000);

                        callback(s);

                        hiddenElements.each(function () {
                            $(this).attr('style', styleBackups.shift());
                        });

                    });
                };

                angular.forEach(self.labels, function (lbl) {
                    $(lbl).evenIfHidden(function (l) {
                        if (l.width() > max)
                            max = l.width();
                    });
                });
                angular.forEach(self.labels, function (lbl) {
                    angular.element(lbl).css('width', (max + 1) + 'px');
                });
            }

            $scope.containerInit = function(labelCount) {
                self.setMaxWidth();
            };
        }]);

    module.directive('truLabelContainer',
        [
            function() {
                return {
                    restrict: 'A',
                    controller: 'truLabelContainerController',
                    link: function(scope, element, atrrs) {
                        scope.containerInit();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('tru.label', []);

    module.directive('truLabel',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    transclude: true,
                    replace: true,
                    scope: {
                        field: "=",
                        label: "@"
                    },
                    require: '^truLabelContainer',
                    template: $templateCache.get('src/templates/tru-label.html'),
                    link: function (scope, element, attrs, ctrl) {
                        var left = true;
                        var top = false;
                        var none = false;

                        var label = element[0].querySelectorAll('label')[0];
                        label.innerText = scope.label;

                        if (left)
                            ctrl.addLabel(label);

                        var container = angular.element(element[0].querySelectorAll('.tvl-container-dat')[0]);
                        var containerLabel = angular.element(element[0].querySelectorAll('.tvl-container-dat-label')[0]);
                        var containerContent = angular.element(element[0].querySelectorAll('.tvl-container-dat-content')[0]);

                        if (top) {
                            container.removeClass('tvl-container-dat');
                            containerLabel.removeClass('tvl-container-dat-label');
                            containerContent.removeClass('tvl-container-dat-content');
                            container.addClass('tvl-container-dat-top');
                            containerLabel.addClass('tvl-container-dat-label-top');
                            containerContent.addClass('tvl-container-dat-content-top');
                        }

                        if (none) {
                            container.removeClass('tvl-container-dat');
                            containerLabel.removeClass('tvl-container-dat-label');
                            containerContent.removeClass('tvl-container-dat-content');
                        }
                    }
                };
            }]);
})();



(function () {
    'use strict';

    var module = angular.module('tru.layout.manager', []);

    module.factory('truLayoutManagerFactory',
        [
            function () {
                var layout = function (element) {
                    //TODO: Should combine queries into one

                    //Search Views
                    var tcgs = element[0].querySelectorAll('.tvl-container-grid');
                    angular.forEach(tcgs, function (tcg) {
                        var numberOfItems = tcg.children.length;
                        var childWidth = 100 / numberOfItems;
                        angular.forEach(tcg.children, function (target) {
                            angular.element(target).css('width', childWidth + '%');
                        });

                    });

                    //Detail Views
                    var tchs = element[0].querySelectorAll('.tvl-container-hList');
                    angular.forEach(tchs, function (tch) {
                        var numberOfItems = tch.children.length;
                        var childWidth = 100 / numberOfItems;
                        angular.forEach(tch.children, function (target) {
                            angular.element(target).css('width', childWidth + '%');
                        });

                    });
                };

                var layoutManager = {
                    layout: layout
                }

                return layoutManager;
            }
        ]);
})();

(function(){
    'use strict';

    var module = angular.module("tru.search.group",[]);

    module.controller('truSearchGroupController', ['$scope',
        function ($scope) {
            var onClearCallBacks = [];
            var onDefaultCallBacks = [];
            var onPredicateCallBacks = [];
            this.registerClear = function(onClear){
                onClearCallBacks.push(onClear);
            };

            this.registerDefault = function(onDefault){
                onDefaultCallBacks.push(onDefault);
            };

            this.registerPredicate = function(predicate){
                onPredicateCallBacks.push(predicate);
            };

            $scope.clear = function() {
                angular.forEach(onClearCallBacks,function(cb){
                    cb();
                });
            };

            $scope.default = function() {
                angular.forEach(onDefaultCallBacks,function(cb){
                    cb();
                });
            };

            $scope.search = function() {
                angular.forEach(onPredicateCallBacks,function(cb){
                    cb();
                });
                $scope.onSearch();
            };
        }]);

    module.directive("truSearchGroup",
        ['$templateCache', 'truLayoutManagerFactory',
            function ($templateCache, truLayoutManagerFactory) {
                return {
                    restrict: "E",
                    scope: {
                        fields: '=',
                        label: '@',
                        onSearch: '&onSearch',
                        searchResults: '='
                    },
                    transclude: true,
                    replace: true,
                    controller: 'truSearchGroupController',
                    template: $templateCache.get('src/templates/tru-search-group.html'),
                    link: function (scope, element, attrs) {
                        truLayoutManagerFactory.layout(element);
                    }
                }
            }]);

})();
(function () {
    'use strict';

    angular.module('tru.view.lib',
        ['tru.column',
            'tru.group.box',
            'tru.row',
            'tru.label',
            'tru.label.container',
            'tru.layout.manager',
            'tru.search.group']);

})();
angular.module('tru.view.lib').run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('src/templates/tru-column.html',
        "<li>\r" +
        "\n" +
        "    <div class=\"tvl-container-grid js-grid\">\r" +
        "\n" +
        "        <div class=\"tvl-container-grid-col\">\r" +
        "\n" +
        "            <div class=\"tvl-container-panel\">\r" +
        "\n" +
        "                <ul class=\"tvl-container-vList\" data-ng-transclude></ul>\r" +
        "\n" +
        "            </div>\r" +
        "\n" +
        "        </div>\r" +
        "\n" +
        "    </div>\r" +
        "\n" +
        "</li>\r" +
        "\n"
    );


    $templateCache.put('src/templates/tru-group-box.html',
        "<li>\r" +
        "\n" +
        "    <tru-label-container>\r" +
        "\n" +
        "        <fieldset class=\"tvl-container-group\" data-ng-class=\"{'tvl-container-group_clean': !label}\">\r" +
        "\n" +
        "            <legend data-ng-class=\"{'tvl-container-group-hd': label, 'tvl-container-display-none': !label}\">{{label}}</legend>\r" +
        "\n" +
        "            <div class=\"tvl-container-group-bd\" data-ng-class=\"{'tvl-container-group-bd': label}\">\r" +
        "\n" +
        "                <div data-ng-class=\"{'tvl-container-box': label, 'tvl-container-spacerAll': label}\" data-ng-transclude>\r" +
        "\n" +
        "\r" +
        "\n" +
        "                </div>\r" +
        "\n" +
        "            </div>\r" +
        "\n" +
        "        </fieldset>\r" +
        "\n" +
        "    </tru-label-container>\r" +
        "\n" +
        "</li>"
    );


    $templateCache.put('src/templates/tru-label.html',
        "<li>\r" +
        "\n" +
        "    <div class=\"tvl-container-dat\">\r" +
        "\n" +
        "        <div class=\"tvl-container-dat-label\">\r" +
        "\n" +
        "            <label class=\"tvl-container-label\"></label>\r" +
        "\n" +
        "        </div>\r" +
        "\n" +
        "        <div class=\"tvl-container-dat-content tvl-container-input-wrapper text_full\" ng-transclude></div>\r" +
        "\n" +
        "    </div>\r" +
        "\n" +
        "</li>\r" +
        "\n" +
        "\r" +
        "\n"
    );


    $templateCache.put('src/templates/tru-row.html',
        "<li>\r" +
        "\n" +
        "    <div class=\"tvl-container-grid js-grid\">\r" +
        "\n" +
        "        <div class=\"tvl-container-grid-col\">\r" +
        "\n" +
        "            <div class=\"tvl-container-panel\">\r" +
        "\n" +
        "                <ul class=\"tvl-container-hList\" data-ng-transclude></ul>\r" +
        "\n" +
        "            </div>\r" +
        "\n" +
        "        </div>\r" +
        "\n" +
        "    </div>\r" +
        "\n" +
        "</li>\r" +
        "\n"
    );


    $templateCache.put('src/templates/tru-search-group.html',
        "<div>\r" +
        "\n" +
        "    <div ng-transclude></div>\r" +
        "\n" +
        "    <button data-ng-click=\"clear()\"\r" +
        "\n" +
        "            class=\"tvl-btn\"\r" +
        "\n" +
        "            name=\"clear\">Clear\r" +
        "\n" +
        "    </button>\r" +
        "\n" +
        "    <button data-ng-click=\"default()\"\r" +
        "\n" +
        "            class=\"tvl-btn\"\r" +
        "\n" +
        "            name=\"default\">Default\r" +
        "\n" +
        "    </button>\r" +
        "\n" +
        "    <button data-ng-click=\"search()\"\r" +
        "\n" +
        "            class=\"tvl-btn\"\r" +
        "\n" +
        "            name=\"search\">Search\r" +
        "\n" +
        "    </button>\r" +
        "\n" +
        "</div>"
    );

}]);
