(function(){
    'use strict';

    var module = angular.module('query.data.model', []);

    module.factory('fieldQueryPredicateManagerFactory',
        [
            function() {
                function FieldQueryPredicateManager(columnNamePrefix) {
                    var _value = null;

                    function create(columnName, operator, value) {
                        return  {
                            and: ''
                        }
                    }

                    /**
                     * Clears the query predicate.
                     */
                    function clear() {
                        _value = null;
                    }

                    /**
                     * Returns the query predicate.
                     */
                    function get() {
                        return _value;
                    };

                    /**
                     * Sets the query predicate.
                     */
                    function set(columnNameOrPredicate, operator, value) {

                    }

                    /**
                     * Returns the breeze predicate of the predicate.  This is an internal interface.
                     */
                    function getBreezePredicate() {

                    };

                    return {
                        create: create,
                        clear: clear,
                        get: get,
                        set: set,
                        getBreezePredicate: getBreezePredicate
                    };
                }

                return {
                    FieldQueryPredicateManager: FieldQueryPredicateManager
                };
            }
        ]);


    module.factory('queryDataModel',
        ['fieldQueryPredicateManagerFactory',
            function(fieldQueryPredicateManagerFactory) {
                var Instance = function() {
                    this.self = this;
                    this.operator = 'equal';
                    this.value = {};
                    this.defaultValue = undefined;
                    this.startValue = undefined,
                    this.endValue = undefined,
                    this.startDefault = undefined;
                    this.endDefault = undefined;
                    this.startDateInclusive = 'greater-than';
                    this.endDateInclusive = 'greater-than';
                    this.propertyValue = undefined;
                    this.isNullable = undefined;
                    this.decimalPlaces = 0;
                    this.getFields = function() {
                        this.Field1 = {
                            isSearchContext: true,
                            value: this.value,
                            configName: '',
                            queryPredicate: {
                                create: function() {
                                    return {
                                        or: function() {
                                            return new function() {};
                                        }
                                    }
                                },
                                set: function() {

                                },
                                clear: function() {

                                }
                            },
                            property: {
                                default: this.defaultValue,
                                startValue: this.startValue,
                                endValue: this.endValue,
                                startDefault: this.startDefault,
                                endDefault: this.endDefault,
                                startDateInclusive: this.startDateInclusive,
                                endDateInclusive: this.endDateInclusive,
                                labelPosition: '',
                                operator: this.self.operator,
                                value: this.propertyValue,
                            },
                            queryChoices: function() {
                                return {
                                    then: function(fn) {
                                        var results =  [
                                            { value: { $: 1 }, label: 'High - 1' },
                                            { value: { $: 2 }, label: '2' },
                                            { value: { $: 3 }, label: '3' },
                                            { value: { $: 4 }, label: '4' },
                                            { value: { $: 5 }, label: 'Low - 5' }
                                        ]
                                        fn(results);
                                    }
                                }
                            },
                            type: {
                                isNullable: this.isNullable,
                                property: {
                                    decimalPlaces: this.decimalPlaces
                                },
                                queryChoices: function() {
                                    return {
                                        then: function(fn) {
                                            var results =  [
                                                { value: { $: 1 }, label: 'High - 1' },
                                                { value: { $: 2 }, label: '2' },
                                                { value: { $: 3 }, label: '3' },
                                                { value: { $: 4 }, label: '4' },
                                                { value: { $: 5 }, label: 'Low - 5' }
                                            ]
                                            fn(results);
                                        }
                                    }
                                },
                                choices: [
                                    { value: { $: 1 }, label: 'High - 1' },
                                    { value: { $: 2 }, label: '2' },
                                    { value: { $: 3 }, label: '3' },
                                    { value: { $: 4 }, label: '4' },
                                    { value: { $: 5 }, label: 'Low - 5' }
                                ]
                            }
                        };

                        this.fields = {
                            Field1: this.Field1
                        };
                        return this.fields;
                    };

                };

                return Instance;
            }
        ]);
})();