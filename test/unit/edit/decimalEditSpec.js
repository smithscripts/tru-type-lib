(function() {
    "use strict";
    describe('std-decimal-edit', function() {
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
            dataModel.typeProperty.maxLength = 12
            scope.fields = dataModel.getFields();
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var elm = angular.element('<std-decimal-edit label="Foo Bar" field="fields.Field1"></std-decimal-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.isolateScope();
            ctrl = element.controller('stdDecimalEdit');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.decimal'));
        beforeEach(module('std.decimal.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, editDataModel) {
            $templateCache.put('src/templates/edit/std-decimal-edit.html', __html__['src/templates/edit/std-decimal-edit.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new editDataModel;

            dataModel.isNullable = false;
            dataModel.typeProperty.decimalPlaces = 5;
        }));

        afterEach(function(){
            doc.find('body').html('');
        });

        describe('label integration', function() {
            it('should (label) have the following attributes', function () {
                compileAndAppendElement();
                var label = document.getElementsByTagName('tru-label')[0];
                expect(label).toHaveAttr('label', 'Foo Bar');
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

        describe('decimal', function() {
            it('should set input if value is number', function () {
                dataModel.value = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('1.2345');
            });

            it('should not allow non-numeric values other then (-,.)', function () {
                dataModel.value = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('1.2345x').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('1.2345');
            });

            it('input should allow scientific notation', function () {
                dataModel.value = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('123e-7').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('123e-7');
            });

            it('model should allow scientific notation', function () {
                dataModel.value = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('123e-7').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(123e-7);
            });

            it('negative value should update input', function () {
                dataModel.value = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('-1.2345').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('-1.2345');
            });

            it('negative value should update model', function () {
                dataModel.value = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('-1.2345').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(-1.2345);
            });

            it('negative character should set nullable control model to null', function () {
                dataModel.isNullable = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('-').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(null);
            });

            it('when input is set to empty string the model should be set to undefined', function () {
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(undefined);
            });

            it('when input is set to empty string and isNullable the model should be set to undefined', function () {
                dataModel.isNullable = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(null);
            });

            it('when input is set to second non-numeric character the model should be set to undefined', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('..').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(undefined);
            });

            it('cursor should hold the correct position when inserting character', function () {
                //TODO: Research how to test cursor/caret position.
            });
        });

        describe('precision', function() {
            it('when decimalPlaces is 5 input should not allow a 6th decimal place', function () {
                dataModel.typeProperty.decimalPlaces = 5;
                dataModel.value = 1.12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('1.123456').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(1.12345);
            });

            it('when decimalPlaces is 30 input should not allow a 9 whole number', function () {
                dataModel.typeProperty.decimalPlaces = 30;
                dataModel.value = 12345678.12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('123456789.12345').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(12345678.12345);
            });
        });

        describe('events', function() {
            it('should call preventDefault when the spacebar is pressed', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var press = jQuery.Event("keypress");
                press.keyCode = 32;
                press.preventDefault = function() {};

                spyOn(press, 'preventDefault');

                jQuery(input).trigger(press);

                expect(press.preventDefault).toHaveBeenCalled();
            });

            it('should prepend 0 when input value is .00 on blur', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('.00').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input).toHaveValue('.00');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input.value).toBe('0.00');
            });

            it('should append 0 when input value is 0. on blur', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('0.').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input).toHaveValue('0.');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input.value).toBe('0.0');
            });

            it('should append 0 when input value is a whole number on blur', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('1234').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(1234);
                expect(input).toHaveValue('1234');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(1234.0);
                expect(input.value).toBe('1234.0');
            });

            it('should append 0 after the negative character when input value is a -.12 on blur', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('-.12').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(-0.12);
                expect(input).toHaveValue('-.12');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(-0.12);
                expect(input.value).toBe('-0.12');
            });

            it('should do nothing when input value is a empty string', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(undefined);
                expect(input).toHaveValue('');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(undefined);
                expect(input.value).toBe('');
            });
        });
    });

})();