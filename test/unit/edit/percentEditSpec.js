(function() {
    "use strict";
    describe('std-percent-edit', function() {
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
            dataModel.typeProperty.maxLength = 12;
            dataModel.typeProperty.decimalPlaces = 2;
            scope.fields = dataModel.getFields();
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var elm = angular.element('<std-percent-edit label="Foo Bar" field="fields.Field1"></std-percent-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.isolateScope();
            ctrl = element.controller('stdPercentEdit');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.percent'));
        beforeEach(module('std.percent.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, editDataModel) {
            $templateCache.put('src/templates/edit/std-percent-edit.html', __html__['src/templates/edit/std-percent-edit.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new editDataModel;
            dataModel.typeProperty.decimalPlaces = 2;
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

        describe('percent', function() {
            it('should not allow non-numeric characters', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                input.focus();
                angular.element(input).val('12345x').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('12345');
            });

            it('should allow numeric values', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                input.focus();
                angular.element(input).val('123456').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('123456');
            });

            it('should allow a decimal', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                input.focus();
                angular.element(input).val('123456.').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('123456.');
            });

            it('should not allow more than one decimal', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                input.focus();
                angular.element(input).val('123456..').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('123456.');
            });

            it('should not allow fraction values beyond the 100th place', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                input.focus();
                angular.element(input).val('123456.123').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('123456.12');
            });

            it('numeric values should update the model', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                input.focus();
                angular.element(input).val('123456.7').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(123456.7);
            });

            it('tenth decimal place values should update the model', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                input.focus();
                angular.element(input).val('123456.7').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(123456.7);
            });

            it('hundredth place decimal values should update the model', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                input.focus();
                angular.element(input).val('123456.77').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(123456.77);
            });

            it('hundredth place decimal values should update the model', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                input.focus();
                angular.element(input).val('123456.77').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(123456.77);
            });

            it('input should not allow a thousandth place decimal', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                input.focus();
                angular.element(input).val('123456.779').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('123456.77');
            });

            it('model should not allow a thousandth place decimal', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                input.focus();
                angular.element(input).val('123456.779').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(123456.77);
            });

            it('negative numeric values should update the model', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                expect(isoScope.field.value.$).toBe(12345);
                input.focus();
                angular.element(input).val('-123456').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(-123456);
            });

            it('should not allow more than one negative character', function () {
                dataModel.isEditing = true;
                dataModel.value = '-';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('-');
                input.focus();
                angular.element(input).val('--').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('-');
            });

            it('negative character should set the model to undefined', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('-').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(undefined);
            });

            it('negative character should set nullable control model to null', function () {
                dataModel.isEditing = true;
                dataModel.isNullable = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('-').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(null);
            });

            it('when input is set to empty string the model should be set to undefined', function () {
                dataModel.isEditing = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(undefined);
            });

            it('when input is set to empty string and isNullable the model should be set to undefined', function () {
                dataModel.isEditing = true;
                dataModel.isNullable = true;
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(null);
            });

            it('cursor should hold the correct position when inserting character', function () {
                //TODO: Research how to test cursor/caret position.
            });
        });

        describe('events', function() {
            it('should call preventDefault when the spacebar is pressed', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                var press = jQuery.Event("keypress");
                press.keyCode = 32;
                press.preventDefault = function() {};
                spyOn(press, 'preventDefault');
                jQuery(input).trigger(press);
                expect(press.preventDefault).toHaveBeenCalled();
            });

            it('should prepend % on blur', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('12.12').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(12.12);
                expect(input).toHaveValue('12.12');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(12.12);
                expect(input.value).toBe('12.12%');
            });

            it('should prepend %0 when input value is .00 on blur', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('.0').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input).toHaveValue('.0');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input.value).toBe('0.0%');
            });

            it('should append 00 when input value is 0. on blur', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('0.').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input).toHaveValue('0.');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input.value).toBe('0.0%');
            });

            it('should append 00 when input value is a whole number on blur', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('1234').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(1234);
                expect(input).toHaveValue('1234');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(1234.0);
                expect(input.value).toBe('1234.0%');
            });

            it('should append 0 after the negative character when input value is a -.12 on blur', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('-.12').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(-0.12);
                expect(input).toHaveValue('-.12');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(-0.12);
                expect(input.value).toBe('-0.12%');
            });

            it('should do nothing when input value is a empty string', function () {
                dataModel.isEditing = true;
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