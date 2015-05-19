(function(){
    'use strict';

    var module = angular.module('edit.data.model', []);

    module.factory('editDataModel',
        [
            function() {
                var Instance = function() {
                    var self = this;
                    this.isEditing = false;
                    this.canDisplay = true;
                    this.canEdit = true;
                    this.value = undefined;
                    this.queryChoices = undefined;
                    this.isNullable = undefined;
                    this.children = {};
                    this.fieldProperty = {};
                    this.typeProperty = {};

                    //this.getFields = function () {
                    //    this.Field1 = {
                    //        children: this.children,
                    //        editor: {
                    //            isEditing: this.isEditing,
                    //            isAdding: this.isAdding,
                    //            onEntityChange: function() {}
                    //        },
                    //        goTo: function() {
                    //            //This is experimental
                    //        },
                    //        queryChoices: this.queryChoices,
                    //        property: this.fieldProperty,
                    //        type: {
                    //            isNullable: this.isNullable,
                    //            property: this.typeProperty,
                    //            queryChoices: this.queryChoices,
                    //            canDisplay: this.canDisplay,
                    //            canEdit: this.canEdit
                    //        },
                    //        value: {
                    //            $: this.value,
                    //            data: this.value
                    //        }
                    //    };
                    //
                    //
                    //    this.fields = {
                    //        Field1: this.Field1
                    //    };
                    //    return this.fields;
                    //}

                    this.getFields = function () {
                        this.Field1 = Object.create({}, {
                            'isEditContext': {
                                value: true
                            },
                            'children': {
                                value: this.children
                            },
                            'editor': {
                                value: {
                                    isEditing: this.isEditing,
                                    isAdding: this.isAdding,
                                    onEntityChange: function() {}
                                }
                            },
                            'queryChoices': { value: this.queryChoices},
                            'property': { value: this.fieldProperty },
                            'type': {
                                value: {
                                    isNullable: this.isNullable,
                                    property: this.typeProperty,
                                    queryChoices: this.queryChoices,
                                    canDisplay: this.canDisplay,
                                    canEdit: this.canEdit
                                }
                            },
                            'value': {
                                value: (function () {
                                    var value = Object.create({}, {
                                        $: {
                                            get: function () {
                                                return self.value;
                                            },
                                            set: function (value) {
                                                self.value = value;
                                            }
                                        }
                                    });
                                    Object.freeze(value);
                                    return value;
                                })()
                            }
                        });


                        this.fields = {
                            Field1: this.Field1
                        };
                        return this.fields;
                    }
                };

                return Instance;
            }
        ]);
})();