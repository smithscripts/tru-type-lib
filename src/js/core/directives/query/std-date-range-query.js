(function(){
    'use strict';

    var module = angular.module('std.date.range.query', []);

    module.controller('stdDateRangeQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlStartValue = $scope.field.property.startValue;
            var ctrlEndValue = $scope.field.property.endValue;
            var ctrlStartDefault = $scope.field.property.startDefault;
            var ctrlEndDefault = $scope.field.property.endDefault;
            var ctrlStartValueHasValue = typeof ctrlStartValue !== 'undefined';
            var ctrlStartDefaultHasValue = typeof ctrlStartDefault !== 'undefined';
            var ctrlEndValueHasValue = typeof ctrlEndValue !== 'undefined';
            var ctrlEndDefaultHasValue = typeof ctrlEndDefault !== 'undefined';

            var startDateInclusive = 'greater-than-or-equal'; //$scope.field.property.startInclusive;
            var endDateInclusive = 'less-than-or-equal'; //$scope.field.property.endInclusive;
            var startOperator = operatorLookup[startDateInclusive].operator;
            var endOperator = operatorLookup[endDateInclusive].operator;

            var onClearCB = function(){
                return function() {
                    if (!ctrlStartValueHasValue)
                        $scope.data.startDate = undefined;

                    if (!ctrlEndValueHasValue)
                        $scope.data.endDate = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (!ctrlStartValueHasValue) {
                        if (ctrlStartDefaultHasValue)
                            $scope.data.startDate = ctrlStartDefault;
                        else
                            $scope.data.startDate = undefined;
                    }

                    if (!ctrlEndValueHasValue) {
                        if (ctrlEndDefaultHasValue)
                            $scope.data.endDate = ctrlEndDefault;
                        else
                            $scope.data.endDate = undefined;
                    }
                }
            }();

            var onPredicateCB = function() {
                return function () {
                    var queryPredicate = $scope.field.queryPredicate;
                    var predicates = [];

                    if ($scope.data.startDate) {
                        var startValue = new Date($scope.data.startDate.toUTCString());
                        startValue.setHours(0,0,0,0);
                        predicates.push(queryPredicate.create('', startOperator, startValue));
                    }

                    if ($scope.data.endDate) {
                        var endValue = new Date($scope.data.endDate.toUTCString());
                        endValue.setHours(23,59,59,999);
                        predicates.push(queryPredicate.create('', endOperator, endValue));
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
                startDate: undefined,
                endDate: undefined
            };

            $scope.startOperatorImage = operatorLookup[startDateInclusive].operatorImage;
            $scope.startOperatorImageMessage = operatorLookup[startDateInclusive].operatorImageMessage;
            $scope.endOperatorImage = operatorLookup[endDateInclusive].operatorImage;
            $scope.endOperatorImageMessage = operatorLookup[endDateInclusive].operatorImageMessage;

            $scope.onStartOperatorClick = function() {
                if (ctrlStartValueHasValue || $scope.field.editor.isEditing) return;
                $scope.data.startDate = undefined;
            };

            $scope.onEndOperatorClick = function() {
                if (ctrlEndValueHasValue || $scope.field.editor.isEditing) return;
                $scope.data.endDate = undefined;
            };

            $scope.init = function() {
                if (ctrlStartValueHasValue)
                    $scope.data.startDate = ctrlStartValue;
                if (ctrlStartDefaultHasValue)
                    $scope.data.startDate = ctrlStartDefault;
                if (ctrlEndValueHasValue)
                    $scope.data.endDate = ctrlEndValue;
                if (ctrlEndDefaultHasValue)
                    $scope.data.endDate = ctrlEndDefault;

                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdDateRangeQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-date-range-query.html'),
                    controller: 'stdDateRangeQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();