(function () {
    'use strict';

    var module = angular.module('std.or.list.checkbox.query', []);

    module.controller('stdOrListCheckboxQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value ? $scope.field.property.value : [];
            var ctrlDefault = $scope.field.property.default ? $scope.field.property.default : [];
            var ctrlValueHasValue = ctrlValue.length > 0;
            var ctrlDefaultHasValue = ctrlDefault.length > 0;
            var operator = operatorLookup[$scope.field.property.operator].operator;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    angular.forEach($scope.data.choices, function (choice) { choice.checked = false; });
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        angular.forEach($scope.data.choices, function (choice) {
                            choice.checked = ctrlDefault.indexOf(choice.value.$) !== -1;
                        });
                    else
                        angular.forEach($scope.data.choices, function (choice) { choice.checked = false; });
                }
            }();

            var onPredicateCB = function () {
                return function () {
                    var queryPredicate = $scope.field.queryPredicate;
                    var predicates = [];

                    angular.forEach($scope.data.choices, function (choice) {
                        if (choice.checked)
                            predicates.push(queryPredicate.create('', operator, choice.value.$));
                    });

                    if (predicates.length) {
                        var predicate = predicates[0];
                        for (var i = 1; i < predicates.length; i++) {
                            predicate = predicate.or(predicates[i]);
                        }
                        queryPredicate.set(predicate);
                    } else
                        queryPredicate.clear();
                }
            }();

            $scope.data = { choices: [], labels: [] };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return !ctrlValueHasValue;
            };

            $scope.onOperatorClick = function () {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                if ($scope.checked) {
                    angular.forEach($scope.data.choices, function (choice) {
                        choice.checked = false;
                    });
                } else {
                    angular.forEach($scope.data.choices, function (choice) {
                        choice.checked = true;
                    });
                }
            };

            $scope.$watch('data.choices', function () {
                $scope.checked = $scope.data.choices.filter(function (obj) {
                    return obj.checked === true
                }).length > 0;
            }, true);

            $scope.field.queryChoices($scope).then(function (results) {
                angular.forEach(results, function (choice) {
                    if (ctrlValueHasValue) {
                        if (ctrlValue.indexOf(choice.value.$) !== -1) {
                            $scope.data.labels.push(choice.label);
                            choice["checked"] = true;
                        }
                    } else if (ctrlDefaultHasValue) {
                        choice["checked"] = ctrlDefault.indexOf(choice.value.$) !== -1;
                    } else {
                        choice["checked"] = false;
                    }
                    $scope.data.choices.push(choice);
                });

                if ($scope.field.type.isNullable) {
                    $scope.data.choices.push({
                        checked: false,
                        label: 'Null',
                        value: { $: null }
                    })
                }
            });

            $scope.init = function () {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdOrListCheckboxQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-or-list-checkbox-query.html'),
                    controller: 'stdOrListCheckboxQueryController',
                    link: function (scope, element, attrs, searchGroupCtrl) {
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();