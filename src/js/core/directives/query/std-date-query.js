(function(){
    'use strict';

    var module = angular.module('std.date.query', []);

    module.controller('stdDateQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;

                    if (value) {
                        var predicates = [];
                        var startValue = new Date(value);
                        var endValue = new Date(value);
                        if (operator === 'eq') {
                            startValue.setHours(0,0,0,0);
                            endValue.setHours(23,59,59,999);
                            predicates.push(queryPredicate.create('', 'gt', startValue));
                            predicates.push(queryPredicate.create('', 'lt', endValue));
                            queryPredicate.set(predicates[0].and(predicates[1]));
                        }
                        if (operator === 'lt') {
                            startValue.setHours(0,0,0,0);
                            queryPredicate.set('', 'lt', startValue);
                        }
                        if (operator === 'gt') {
                            startValue.setHours(23,59,59,999);
                            queryPredicate.set('', 'gt', startValue);
                        }
                        if (operator === 'le') {
                            startValue.setHours(23,59,59,999);
                            queryPredicate.set('', 'le', startValue);
                        }
                        if (operator === 'ge') {
                            startValue.setHours(0,0,0,0);
                            queryPredicate.set('', 'ge', startValue);
                        }
                    } else {
                        queryPredicate.clear();
                    }
                }
            }();

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === "undefined");
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field.value.$ === 'undefined');
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdDateQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-date-query.html'),
                    controller: 'stdDateQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();