(function(){
    'use strict';

    var module = angular.module('query.builder', []);

    module.factory('controlBuilderQueryFactory',
        [
            function() {
                var queryBuilder = {
                    Predicate: function(columnName, operator, value) {
                        return {
                            columnName: columnName,
                            operator: operator,
                            value: value
                        }
                    }
                };

                return queryBuilder;
            }
        ]);
})();