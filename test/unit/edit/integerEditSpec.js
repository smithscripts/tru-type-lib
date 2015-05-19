(function() {
    "use strict";
    describe('std-integer-edit', function() {
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
            dataModel.typeProperty = {
                maxLength: 12
            };
            scope.fields = dataModel.getFields();
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var elm = angular.element('<std-integer-edit label="Foo Bar" field="fields.Field1"></std-integer-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.isolateScope();
            ctrl = element.controller('stdIntegerEdit');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.integer.only'));
        beforeEach(module('std.integer.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, editDataModel) {
            $templateCache.put('src/templates/edit/std-integer-edit.html', __html__['src/templates/edit/std-integer-edit.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new editDataModel;
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

        describe('integer', function() {
            it('should not allow non-numeric characters', function () {
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');

                angular.element(input).val('12345x').trigger('input');
                scope.$digest();

                expect(input).toHaveValue('12345');
            });

            it('should allow numeric values', function () {
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');

                angular.element(input).val('123456').trigger('input');
                scope.$digest();

                expect(input).toHaveValue('123456');
            });

            it('numeric values should update the model', function () {
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');

                angular.element(input).val('123456').trigger('input');
                scope.$digest();

                expect(isoScope.field.value.$).toBe(123456);
            });

            it('negative numeric values should update the model', function () {
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                expect(isoScope.field.value.$).toBe(12345);

                angular.element(input).val('-123456').trigger('input');
                scope.$digest();

                expect(isoScope.field.value.$).toBe(-123456);
            });

            it('should allow a negative integers', function () {
                dataModel.value = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');

                angular.element(input).val('-12345').trigger('input');
                scope.$digest();

                expect(input).toHaveValue('-12345');
            });

            it('should not allow more than one negative character', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('-').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('-');

                angular.element(input).val('--').trigger('input');
                scope.$digest();

                expect(input).toHaveValue('-');
            });

            it('negative character should set the model to null', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('-').trigger('input');
                scope.$digest();

                expect(input).toHaveValue('-');
                expect(isoScope.field.value.$).toBe(null);
            });

            it('negative character should set nullable control model to null', function () {
                dataModel.isNullable = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('-').trigger('input');
                scope.$digest();

                expect(isoScope.field.value.$).toBe(null);
            });

            it('negative character should set control model to null', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('-').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(null);
            });


            it('should not allow decimals', function () {
                dataModel.value = 12;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12');

                angular.element(input).val('12.').trigger('input');
                scope.$digest();

                expect(input).toHaveValue('12');
            });

            it('cursor should hold the correct position when inserting character', function () {
                //TODO: Research how to test cursor/caret position.
            });
        });

        describe('keypress', function() {
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
        });
    });

})();