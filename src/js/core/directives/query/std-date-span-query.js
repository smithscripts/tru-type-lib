(function () {
    'use strict';

    var module = angular.module('std.date.span.query', []);

    module.controller('stdDateSpanQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {

        }]);

    module.directive('stdDateSpanQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-date-span-query.html'),
                    controller: 'stdDateSpanQueryController',
                    link: {
                        pre: function (scope, element) {
                            scope.field.children.start.property.operator = 'greater-than-or-equal';
                            scope.field.children.end.property.operator = 'less-than-or-equal';
                            scope.field.children.start.property.default = scope.field.property.startDefault;
                            scope.field.children.end.property.default = scope.field.property.endDefault;
                        },
                        post: function (scope, element, attrs, searchGroupCtrl) {
                            var startLabel = angular.element(element[0].querySelectorAll('.tvl-container-dat-label')[1]);
                            var endLabel = angular.element(element[0].querySelectorAll('.tvl-container-dat-label')[2]);
                            startLabel.remove();
                            endLabel.remove();

                            var onPredicateCB = function () {
                                return function () {
                                    var predicates = [];
                                    var queryPredicate = scope.field.queryPredicate;

                                    var start = scope.field.children.start.value.$;
                                    var end = scope.field.children.end.value.$;

                                    if (start && end) {
                                        var startStartValue = new Date(start.toUTCString());
                                        var startEndValue = new Date(end.toUTCString());

                                        startStartValue.setHours(0,0,0,0);
                                        predicates.push(queryPredicate.create('Start', 'ge', startStartValue));
                                        startEndValue.setHours(23,59,59,999);
                                        predicates.push(queryPredicate.create('Start', 'le', startEndValue));

                                        if (predicates.length) {
                                            var predicate = undefined;
                                            for (var i = 0; i < predicates.length; i++) {
                                                if (i === 0) {
                                                    predicate = predicates[i];
                                                } else {
                                                    predicate = predicate.and(predicates[i]);
                                                }
                                            }
                                            queryPredicate.set(predicate);
                                        } else {
                                            queryPredicate.clear();
                                        }
                                    } else if (start) {
                                        var startStartValue = new Date(start.toUTCString());
                                        queryPredicate.set('Start', 'ge', startStartValue);
                                    } else if (end) {
                                        var startEndValue = new Date(end.toUTCString());
                                        queryPredicate.set('Start', 'le', startEndValue);
                                    } else {
                                        queryPredicate.clear();
                                    }

                                }
                            }();

                            searchGroupCtrl.registerPredicate(onPredicateCB);
                        }
                    }
                };
            }
        ]);
})();