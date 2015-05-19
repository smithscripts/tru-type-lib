(function() {
    "use strict";
    describe('std-dropdown-edit', function() {
        var compile,
            doc,
            scope,
            timeout,
            isoScope,
            element,
            ctrl,
            dataModel,
            mockStdDisplay;

        var addLabelContainerAttribute = function() {
            $('body').attr('data-tru-label-container','');
            compile($('body'))(scope);
        };

        var assignFields = function() {
            dataModel.queryChoices = function() {
                return {
                    then: function(fn) {
                        var results =  [
                            { value: { $: 1 }, label: 'High - 1' },
                            { value: { $: 2 }, label: '2' },
                            { value: { $: 3 }, label: '3' },
                            { value: { $: 4 }, label: '4' },
                            { value: { $: 5 }, label: 'Low - 5' }
                        ];
                        fn(results);
                    }
                }
            };
            scope.fields = dataModel.getFields();
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var elm = angular.element('<std-dropdown-edit label="Foo Bar" field="fields.Field1"></std-dropdown-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.isolateScope();
            ctrl = element.controller('stddropdownEdit');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.dropdown.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, $timeout, editDataModel) {
            $templateCache.put('src/templates/edit/std-dropdown-edit.html', __html__['src/templates/edit/std-dropdown-edit.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            timeout = $timeout;
            dataModel = new editDataModel;
        }));

        afterEach(function(){
            doc.find('body').html('');
            dataModel.isEditing = false;
            dataModel.required = false;
            dataModel.canDisplay = true;
            dataModel.canEdit = true;
            dataModel.minLength = undefined;
            dataModel.maxLength = undefined;
            dataModel.validation = undefined;
            dataModel.mockValue = undefined;
        });

        describe('attributes', function() {
            it('select should have the following attributes', function () {
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(select).toHaveAttr('data-ng-model', 'data.value');
                expect(select).toHaveAttr('data-ng-options', 'x.value.$ as x.label for x in choices');
                expect(select).toHaveAttr('data-ng-change', 'onChange()');
                expect(select).toHaveAttr('data-ng-disabled', '!field.editor.isEditing || !field.type.canEdit');
                expect(select).toHaveAttr('data-z-validate');
            });
        });

        describe('editing', function() {
            it('select should be disabled when not editing', function () {
                dataModel.isEditing = false;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(select).toHaveAttr('disabled');
            });

            it('select should be enabled when editing', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(select).not.toHaveAttr('disabled');
            });
        });

        describe('access', function() {
            it('should call display service with false when user does not have access', function () {
                dataModel.canDisplay = false;
                spyOn(mockStdDisplay, 'setVisibility');
                compileAndAppendElement();
                expect(mockStdDisplay.setVisibility).toHaveBeenCalledWith(jasmine.any(Object), false);
            });

            it('should call display service with true when user does have access', function () {
                dataModel.canDisplay = true;
                spyOn(mockStdDisplay, 'setVisibility');
                compileAndAppendElement();
                expect(mockStdDisplay.setVisibility).toHaveBeenCalledWith(jasmine.any(Object), true);
            });

            it('select should be disabled when editing and user is not found in edit roles', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = false;
                compileAndAppendElement();

                var select = document.getElementsByTagName('select')[0];
                expect(select).toHaveAttr('disabled', 'disabled');
            });

            it('select should be enabled when editing and user is found in edit roles', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = true;
                compileAndAppendElement();

                var select = document.getElementsByTagName('select')[0];
                expect(select).not.toHaveAttr('disabled');
            });
        });

        describe('isNullable', function() {
            it('choices should contain an object with the value null at index 0 when field isNullable', function () {
                dataModel.isNullable = true;
                compileAndAppendElement();
                expect(isoScope.choices[0].value.$).toBe(-1);
            });

            it('choices should contain the correct number of items when field isNullable', function () {
                dataModel.isNullable = true;
                compileAndAppendElement();
                expect(isoScope.choices.length).toBe(6);
            });

            it('choices should not contain an object with a null value at index 0 when field is not Nullable', function () {
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(isoScope.choices[0].value.$).not.toBe(-1);
            });

            it('choices should contain the correct number of items when field is not Nullable', function () {
                compileAndAppendElement();
                expect(isoScope.choices.length).toBe(5);
            });
        });

        describe('defaults', function() {
            it('should select a value when value.$ has a value', function () {
                dataModel.value = 3;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(select.options[2].selected).toBe(true);
            });

            it('should select null when isNullable and value.$ has no value', function () {
                dataModel.isNullable = true;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(isoScope.choices[0].value.$).toBe(-1);
                expect(select.options[0].selected).toBe(true);
            });
        });

        describe('onChange', function() {
            it('when the empty option is selected it should set value.$ to null', function () {
                dataModel.value = 3;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(select.options[2].selected).toBe(true);

                isoScope.data.value = -1;
                isoScope.onChange();
                scope.$digest();
                expect(select.options[0].selected).toBe(true);
                expect(scope.fields.Field1.value.$).toBe(null);
            });

            it('when a value is selected it should set value.$ to that object value', function () {
                dataModel.value = 3;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(select.options[2].selected).toBe(true);

                isoScope.data.value = 5;
                isoScope.onChange();
                scope.$digest();
                expect(select.options[4].selected).toBe(true);
                expect(scope.fields.Field1.value.$).toBe(5);
            });
        });
    });

})();