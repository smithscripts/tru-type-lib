(function(){
    'use strict';

    var module = angular.module('std.datetime.query', []);

    module.controller('stdDatetimeQueryController', ['$scope', 'stdOperatorLookup',
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

    module.directive('stdDatetimeQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-datetime-query.html'),
                    controller: 'stdDatetimeQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();