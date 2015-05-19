(function() {
    "use strict";
    describe('std-password-edit', function() {
        var compile,
            doc,
            scope,
            timeout,
            isoScope,
            element,
            ctrl,
            timeout,
            dataModel,
            mockStdDisplay;

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

            var elm = angular.element('<std-password-edit label="Foo Bar" field="fields.Field1"></std-password-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.isolateScope();
            ctrl = element.controller('stdPasswordEdit');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.password.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, editDataModel, $timeout) {
            $templateCache.put('src/templates/edit/std-password-edit.html', __html__['src/templates/edit/std-password-edit.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new editDataModel;
            timeout = $timeout;
        }));

        afterEach(function(){
            doc.find('body').html('');
        });

        describe('label integration', function() {
            it('should (row) have the following attributes', function () {
                compileAndAppendElement();
                var row = document.getElementsByTagName('tru-row')[0];
            });

            it('should (label) have the following attributes', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var label = document.getElementsByTagName('tru-label')[0];
                expect(label).toHaveAttr('label', 'Foo Bar');
                var label = document.getElementsByTagName('tru-label')[1];
                expect(label).toHaveAttr('label', 'Confirm Foo Bar');
            });
        });

        describe('attributes', function() {
            it('should (ready only input) have the following attributes', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveAttr('data-ng-show', '!field.editor.isEditing');
                expect(input).toHaveAttr('placeholder');
                expect(input).toHaveAttr('type', 'password');
            });

            it('should (password input) have the following attributes', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[1];
                expect(input).toHaveAttr('data-ng-model', 'data.password');
                expect(input).toHaveAttr('data-ng-show', 'field.editor.isEditing');
                expect(input).toHaveAttr('data-ng-trim', 'false');
                expect(input).toHaveAttr('data-ng-mouseenter', 'mouseEnter()');
                expect(input).toHaveAttr('data-ng-mouseleave', 'mouseLeave()');
                expect(input).toHaveAttr('data-ng-class', '{\'ttl-invalid-input\': invalid}');
                expect(input).toHaveAttr('data-ng-change', 'onChange()');
                expect(input).toHaveAttr('placeholder');
                expect(input).toHaveAttr('type', 'password');
            });

            it('should (confirm input) have the following attributes', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[2];
                expect(input).toHaveAttr('data-ng-model', 'data.confirmPassword');
                expect(input).toHaveAttr('data-ng-trim', 'false');
                expect(input).toHaveAttr('data-ng-mouseenter', 'mouseEnter()');
                expect(input).toHaveAttr('data-ng-mouseleave', 'mouseLeave()');
                expect(input).toHaveAttr('data-ng-class', '{\'ttl-invalid-input\': invalid}');
                expect(input).toHaveAttr('placeholder', 'Confirm Password');
                expect(input).toHaveAttr('type', 'password');
            });
        });

        describe('input edit/adding states', function() {
            it('when the password control is not editing the readonly input should visible', function () {
                compileAndAppendElement();
                var readOnlyInput = document.getElementsByTagName('input')[0];
                expect(readOnlyInput).toBeVisible();
            });

            it('when the control is not editing the edit input should be hidden', function () {
                compileAndAppendElement();
                var editInput = document.getElementsByTagName('input')[1];
                expect(editInput).not.toBeVisible();
            });

            it('when the control is not editing the confirm input should hidden', function () {
                compileAndAppendElement();
                var confirmInput = document.getElementsByTagName('input')[2];
                expect(confirmInput).not.toBeVisible();
            });

            it('when the control is editing the readonly input should hidden', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var readOnlyInput = document.getElementsByTagName('input')[0];
                expect(readOnlyInput).not.toBeVisible();
            });

            it('when the control is editing the edit input should visible', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var editInput = document.getElementsByTagName('input')[1];
                expect(editInput).toBeVisible();
            });

            it('when the control is editing the confirm input should visible', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var confirmInput = document.getElementsByTagName('input')[2];
                expect(confirmInput).toBeVisible();
            });
        });

        describe('placeholders', function() {
            it('when not in edit mode and password is not set the placeholder should be set on the readonly input to "No Password Yet"', function () {
                dataModel.isEditing = false;
                dataModel.value = undefined;
                compileAndAppendElement();
                var readOnlyInput = document.getElementsByTagName('input')[0];
                expect(readOnlyInput).toHaveAttr('placeholder', 'No Password Yet');
            });

            it('when not in edit mode and password is set the placeholder should be set on the readonly input to "Password Exists"', function () {
                dataModel.isEditing = false;
                dataModel.value = {$: 'Blah'};
                compileAndAppendElement();
                var readOnlyInput = document.getElementsByTagName('input')[0];
                expect(readOnlyInput).toHaveAttr('placeholder', 'Password Exists');
            });

            it('when in edit mode and password is not set the placeholder should be set on the edit input to "No Password Yet, Set New Password"', function () {
                dataModel.isEditing = true;
                dataModel.value = undefined;
                compileAndAppendElement();
                var editInput = document.getElementsByTagName('input')[1];
                expect(editInput).toHaveAttr('placeholder', 'No Password Yet, Set New Password');
            });

            it('when in edit mode and password is set the placeholder should be set on the edit input to "Password Exists, Change Password"', function () {
                dataModel.isEditing = true;
                dataModel.value = {$: 'Blah'};
                compileAndAppendElement();
                var editInput = document.getElementsByTagName('input')[1];
                expect(editInput).toHaveAttr('placeholder', 'Password Exists, Change Password');
            });
        });

        describe('validation - display', function() {
            it('when in edit mode and password is valid, invalid indicator should be hidden', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var invalidIndicator = document.getElementsByTagName('span')[0];
                expect(invalidIndicator).not.toBeVisible();
            });

            it('when in edit mode and password is invalid and mouse is over either edit or confirm inputs, invalid indicator should be visible', function () {
                compileAndAppendElement();
                isoScope.field.editor.isEditing = true;
                isoScope.mouseOver = true;
                isoScope.invalid = true;
                isoScope.invalidMessage = 'Test';
                scope.$digest();
                var invalidIndicator = document.getElementsByTagName('span')[0];
                expect(invalidIndicator).toBeVisible();
            });

            it('when not in edit mode and password is invalid and mouse is over either edit or confirm inputs, invalid indicator should be hidden', function () {
                compileAndAppendElement();
                isoScope.field.editor.isEditing = false;
                isoScope.mouseOver = true;
                isoScope.invalid = true;
                isoScope.invalidMessage = 'Test';
                scope.$digest();
                var invalidIndicator = document.getElementsByTagName('span')[0];
                expect(invalidIndicator).not.toBeVisible();
            });
        });

        describe('validation - message', function() {
            it('when password and confirm password do not match the invalidMessage should be..."', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                isoScope.mouseOver = true;
                isoScope.data.password = 'Blah';
                isoScope.data.confirmPassword = 'Blah2';
                ctrl.validate();
                scope.$digest();
                var invalidMessage = document.getElementsByTagName('span')[0];
                expect(invalidMessage).toHaveText('\'Password\' does not match.');
            });

            it('when password is not set the invalidMessage should be..."', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                isoScope.mouseOver = true;
                isoScope.data.password = '';
                isoScope.data.confirmPassword = '';
                scope.$digest();
                ctrl.validate();
                isoScope.$digest();
                scope.$digest();
                var invalidMessage = document.getElementsByTagName('span')[0];
                expect(invalidMessage).toHaveText('\'Password\' is required.');
            });

            it('when password is set and confirm password is not the invalidMessage should be..."', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                isoScope.mouseOver = true;
                isoScope.data.password = 'Blah';
                isoScope.data.confirmPassword = '';
                scope.$digest();
                ctrl.validate();
                isoScope.$digest();
                scope.$digest();
                var invalidMessage = document.getElementsByTagName('span')[0];
                expect(invalidMessage).toHaveText('\'Password\' does not match. \'Confirm Password\' is required.');
            });

            it('when password exceeds maxLength and confirmation password is not set the invalidMessage should be...', function () {
                dataModel.isEditing = true;
                dataModel.maxLength = 10;
                compileAndAppendElement();
                isoScope.mouseOver = true;
                isoScope.data.password = 'BlahBlahBlah';
                isoScope.data.confirmPassword = '';
                scope.$digest();
                ctrl.validate();
                isoScope.$digest();
                scope.$digest();
                var invalidMessage = document.getElementsByTagName('span')[0];
                expect(invalidMessage).toHaveText('\'Password\' does not match. \'Confirm Password\' is required. \'Password\' exceeds maximum character length of 10.');
            });
        });
    });

})();
