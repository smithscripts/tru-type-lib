(function () {
    'use strict';

    var module = angular.module('std.integer.range.query', []);

    module.controller('stdIntegerRangeQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var startValue = $scope.field.property.startValue;
            var endValue = $scope.field.property.endValue;
            var startDefault = $scope.field.property.startDefault;
            var endDefault = $scope.field.property.endDefault;
            var startInclusive = 'greater-than-or-equal'; //$scope.field.property.startInclusive;
            var endInclusive = 'less-than-or-equal'; //$scope.field.property.endInclusive;

            var onClearCB = function () {
                return function () {
                    $scope.data.startValue = undefined;
                    $scope.data.endValue = undefined;
                }
            }();

            var onDefaultCB = function () {
                return function () {
                    $scope.data.startValue = startDefault;
                    $scope.data.endValue = endDefault;
                }
            }();

            var startOperator = operatorLookup[startInclusive].operator;
            var endOperator = operatorLookup[endInclusive].operator;

            var onPredicateCB = function () {
                return function () {
                    var queryPredicate = $scope.field.queryPredicate;
                    var predicates = [];

                    if ($scope.data.startValue) {
                        predicates.push(queryPredicate.create('', startOperator, $scope.data.startValue));
                    }

                    if ($scope.data.endValue) {
                        predicates.push(queryPredicate.create('', endOperator, $scope.data.endValue));
                    }
                    if (predicates.length) {
                        var predicate = predicates[0];
                        if (predicates.length > 1)
                            predicate = predicate.and(predicates[1]);
                        queryPredicate.set(predicate);
                    } else
                        queryPredicate.clear();
                }
            }();

            $scope.data = {
                startValue: undefined,
                endValue: undefined
            };

            $scope.startOperatorImage = operatorLookup[startInclusive].operatorImage;
            $scope.startOperatorImageMessage = operatorLookup[startInclusive].operatorImageMessage;
            $scope.endOperatorImage = operatorLookup[endInclusive].operatorImage;
            $scope.endOperatorImageMessage = operatorLookup[endInclusive].operatorImageMessage;

            $scope.init = function () {
                if (startValue)
                    $scope.startValue = startValue;
                if (endValue)
                    $scope.endValue = endValue;
                if (startDefault)
                    $scope.startValue = startDefault;
                if (endDefault)
                    $scope.endValue = endDefault;

                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdIntegerRangeQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-integer-range-query.html'),
                    controller: 'stdIntegerRangeQueryController',
                    link: function (scope, element, attrs, searchGroupCtrl) {
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();