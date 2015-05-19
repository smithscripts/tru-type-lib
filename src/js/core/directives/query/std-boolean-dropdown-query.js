(function(){
    'use strict';

    var module = angular.module('std.boolean.dropdown.query', []);

    module.controller('stdBooleanDropdownQueryController', ['$scope', 'stdOperatorLookup', 'stdUtil',
        function ($scope, operatorLookup, util) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

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
                        $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;
                    if (typeof value !== 'undefined') {
                        queryPredicate.set('', operator, value);
                    } else {
                        queryPredicate.clear();
                    }
                }
            }();

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '';
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.choices = [
                { value: { $: undefined }, label: '' },
                { value: { $: true }, label: 'True' },
                { value: { $: false }, label: 'False' },
                { value: { $: 'null' }, label: 'Null' }
            ];
            $scope.data = { label: undefined };

            if (ctrlValueHasValue) {
                $scope.data.label = $scope.choices.filter(function (obj) {
                    return obj.value.$ === ctrlValue;
                })[0].label;
                $scope.field.value.$ = util.tryParseInt(ctrlValue, ctrlValue);
            }
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
            else
                $scope.field.value.$ = undefined;

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdBooleanDropdownQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-boolean-dropdown-query.html'),
                    controller: 'stdBooleanDropdownQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();