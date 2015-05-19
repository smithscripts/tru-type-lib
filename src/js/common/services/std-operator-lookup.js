(function(){
    'use strict';

    var module = angular.module('std.operator.lookup', []);

    module.factory('stdOperatorLookup',
        [
            function() {
                var operatorLookup = {
                    'equal': {
                        operator: 'eq',
                        operatorImage: 'ico-equal',
                        operatorImageMessage: 'Equal To'
                    },
                    'not-equal': {
                        operator: 'not-eq',
                        operatorImage: 'ico-not-equal',
                        operatorImageMessage: 'Not Equal To'
                    },
                    'greater-than': {
                        operator: 'gt',
                        operatorImage: 'ico-greater-than',
                        operatorImageMessage: 'Greater Than'
                    },
                    'greater-than-or-equal': {
                        operator: 'ge',
                        operatorImage: 'ico-greater-than-or-equal',
                        operatorImageMessage: 'Greater Than Or Equal To'
                    },
                    'less-than': {
                        operator: 'lt',
                        operatorImage: 'ico-less-than',
                        operatorImageMessage: 'Less Than'
                    },
                    'less-than-or-equal': {
                        operator: 'le',
                        operatorImage: 'ico-less-than-or-equal',
                        operatorImageMessage: 'Less Than Or Equal To'
                    },
                    'contains': {
                        operator: 'contains',
                        operatorImage: 'ico-contains',
                        operatorImageMessage: 'Contains'
                    },
                    undefined: {
                        operator: 'eq',
                        operatorImage: 'ico-equal',
                        operatorImageMessage: 'Equal To'
                    }
                };

                return operatorLookup;
            }
        ]);
})();

