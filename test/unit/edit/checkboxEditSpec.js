(function() {
    "use strict";
    describe('std-checkbox-edit', function() {
        var compile,
            doc,
            scope,
            timeout,
            isoScope,
            element,
            ctrl,
            dataModel,
            mockStdDisplay,
            mockStdUtil;

        var addLabelContainerAttribute = function() {
            $('body').attr('data-tru-label-container','');
            compile($('body'))(scope);
        };

        var assignFields = function() {
            scope.fields = dataModel.getFields();
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var elm = angular.element('<std-checkbox-edit label="Foo Bar" field="fields.Field1"></std-checkbox-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.isolateScope();
            ctrl = element.controller('stdCheckboxEdit');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.util'));
        beforeEach(module('std.checkbox.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(function() {
            mockStdUtil = {
                getClosest: function () {}
            };

            module(function ($provide) {
                $provide.value('stdUtil', mockStdUtil);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, $timeout, editDataModel) {
            $templateCache.put('src/templates/edit/std-checkbox-edit.html', __html__['src/templates/edit/std-checkbox-edit.html']);

            scope = $rootScope.$new();
            compile = $compile;
            timeout = $timeout;
            doc = angular.element(document);
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


        describe('label integration', function() {
            it('should (label) have the following attributes', function () {
                compileAndAppendElement();
                var label = document.getElementsByTagName('tru-label')[0];
                expect(label).toHaveAttr('label', 'Foo Bar');
            });
        });

        describe('attributes', function() {
            it('should (input) have the following attributes', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveAttr('data-ng-checked', 'field.value.$');
                expect(input).toHaveAttr('data-ng-disabled', '!field.editor.isEditing || !field.type.canEdit');
                expect(input).toHaveAttr('type', 'checkbox');
            });
        });

        describe('editing', function() {
            it('should set the input to a read-only state when not editing', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveAttr('disabled');
            });

            it('should set the input to an editable state when editing', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).not.toHaveAttr('disabled');
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

            it('input should be disabled when editing and user is not found in edit roles', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = false;
                compileAndAppendElement();

                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveAttr('disabled', 'disabled');
            });

            it('input should be enabled when editing and user is found in edit roles', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = true;
                compileAndAppendElement();

                var input = document.getElementsByTagName('input')[0];
                expect(input).not.toHaveAttr('disabled');
            });
        });

        describe('value', function() {
            it('should set the checkbox to unchecked when value is false', function () {
                dataModel.value = false;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input.checked).toBe(false);
            });

            it('should set the checkbox to checked when value is true', function () {
                dataModel.value = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input.checked).toBe(true);
            });
        });
    });

})();