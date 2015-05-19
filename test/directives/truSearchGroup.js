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

    module.directive("truSearchGroup",[function(){
        return {
            restrict:"E",
            scope: {
                fields: '=',
                label: '@',
                onSearch: '&onSearch',
                searchResults: '='
            },
            transclude: true,
            replace:true,
            controller: 'truSearchGroupController',
            template: '<div><div ng-transclude></div><button name="clear" ng-click="clear()">Clear</button><button name="default" ng-click="default()">Default</button><button name="search" ng-click="search()">Search</button></div>',
            link: function(scope, element, attrs) {

            }
        }
    }]);

})();