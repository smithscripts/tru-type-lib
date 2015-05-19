(function() {
    "use strict";
    describe('std-multiline-edit', function() {
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
            dataModel.fieldProperty['rows'] = '9';
            scope.fields = dataModel.getFields();
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var elm = angular.element('<std-multiline-edit label="Foo Bar" field="fields.Field1"></std-multiline-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();

            isoScope = element.isolateScope();

            ctrl = element.controller('stdMultilineEdit');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.multiline.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, editDataModel) {
            $templateCache.put('src/templates/edit/std-multiline-edit.html', __html__['src/templates/edit/std-multiline-edit.html']);

            scope = $rootScope.$new();
            compile = $compile;
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
                var textarea = document.getElementsByTagName('textarea')[0];
                expect(textarea).toHaveAttr('data-ng-model');
                expect(textarea).toHaveAttr('data-ng-disabled');
                expect(textarea).toHaveAttr('data-ng-trim');
                expect(textarea).toHaveAttr('data-z-validate');
                expect(textarea).toHaveAttr('rows');
            });
        });

        describe('editing', function() {
            it('should set the textarea to a read-only state when not editing', function () {
                compileAndAppendElement();
                var textarea = document.getElementsByTagName('textarea')[0];
                expect(textarea).toHaveAttr('disabled', 'disabled');
            });

            it('should set the textarea to an editable state when editing', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                var textarea = document.getElementsByTagName('textarea')[0];
                expect(textarea).not.toHaveAttr('disabled');
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

            it('textarea should be disabled when editing and user is not found in edit roles', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = false;
                compileAndAppendElement();

                var textarea = document.getElementsByTagName('textarea')[0];
                expect(textarea).toHaveAttr('disabled', 'disabled');
            });

            it('textarea should be enabled when editing and user is found in edit roles', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = true;
                compileAndAppendElement();

                var textarea = document.getElementsByTagName('textarea')[0];
                expect(textarea).not.toHaveAttr('disabled');
            });
        });

        describe('data', function() {
            it('should set the correct number of rows', function () {
                compileAndAppendElement();
                var textarea = document.getElementsByTagName('textarea')[0];
                expect(textarea).toHaveAttr('rows', '9')
            });

            it('should set the textarea to the specified value', function () {
                dataModel.value = 'Blah';
                compileAndAppendElement();
                var textarea = document.getElementsByTagName('textarea')[0];
                expect(textarea).toHaveValue('Blah');
            });
        });
    });

})();