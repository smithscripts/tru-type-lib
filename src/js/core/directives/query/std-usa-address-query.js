(function () {
    'use strict';

    var module = angular.module('std.usa.address.query', []);

    module.controller('stdUsaAddressQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {

        }]);

    module.directive('stdUsaAddressQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-usa-address-query.html'),
                    controller: 'stdUsaAddressQueryController',
                    link: {
                        pre: function (scope, element) {
                            scope.field.children.address1.property.operator = 'contains';
                            scope.field.children.address2.property.operator = 'contains';
                            scope.field.children.city.property.operator = 'contains';
                            scope.field.children.zip.property.operator = 'contains';
                            scope.field.children.zip.property.entryFilter = scope.field.property.zipEntryFilter;
                            scope.field.children.zip.property.watermark = scope.field.property.zipWatermark;
                        },
                        post: function (scope, element, attrs, searchGroupCtrl) {
                            var stateLabel = angular.element(element[0].querySelectorAll('label')[4]);
                            var zipLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            stateLabel.addClass('ttl-no-label-width');
                            zipLabel.addClass('ttl-no-label-width');

                            var onPredicateCB = function () {
                                return function () {
                                    var predicates = [];
                                    var queryPredicate = scope.field.queryPredicate;

                                    var address1 = scope.field.children.address1.value.$;
                                    if (typeof address1 !== 'undefined')
                                        predicates.push(queryPredicate.create('Address1', 'contains', address1));

                                    var address2 = scope.field.children.address2.value.$;
                                    if (typeof address2 !== 'undefined')
                                        predicates.push(queryPredicate.create('Address2', 'contains', address2));

                                    var city = scope.field.children.city.value.$;
                                    if (typeof city !== 'undefined')
                                        predicates.push(queryPredicate.create('City', 'contains', city));

                                    var state = scope.field.children.state.value.$;
                                    if (typeof state !== 'undefined' && state !== '')
                                        predicates.push(queryPredicate.create('StateStdUSAStateRef', 'eq', state));

                                    var zip = scope.field.children.zip.value.$;
                                    if (typeof zip !== 'undefined')
                                        predicates.push(queryPredicate.create('Zip', 'contains', zip));

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
                                    } else
                                        queryPredicate.clear();
                                }
                            }();

                            searchGroupCtrl.registerPredicate(onPredicateCB);
                        }
                    }
                };
            }
        ]);
})();