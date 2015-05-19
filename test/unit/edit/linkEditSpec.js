(function() {
    "use strict";
    describe('std-link-edit', function() {
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
            scope.fields = dataModel.getFields();
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var elm = angular.element('<std-link-edit label="Foo Bar" field="fields.Field1"></std-link-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.isolateScope();
            ctrl = element.controller('stdLinkEdit');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.link.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, editDataModel) {
            $templateCache.put('src/templates/edit/std-link-edit.html', __html__['src/templates/edit/std-link-edit.html']);

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

        describe('attributes', function() {
            it('Anchor should have the following attributes', function () {
                compileAndAppendElement();
                var a = document.getElementsByTagName('a')[0];
                expect(a).toHaveAttr('data-ng-click', 'field.goTo()');
                expect(a).toHaveAttr('href', '#');
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

                var button = document.getElementsByTagName('a')[0];
                expect(button).toHaveAttr('disabled', 'disabled');
            });

            it('input should be enabled when editing and user is found in edit roles', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = true;
                compileAndAppendElement();

                var button = document.getElementsByTagName('a')[0];
                expect(button).not.toHaveAttr('disabled');
            });
        });

        describe('value', function() {
            it('should set the element to the specified value', function () {
                dataModel.value = 'Yeah';
                compileAndAppendElement();
                var a = document.getElementsByTagName('a')[0];
                expect(a).toHaveText('Yeah');
            });
        });

        describe('navigation', function() {
            it('should call navigation function when link is clicked', function () {
                compileAndAppendElement();
                spyOn(scope.fields.Field1, 'goTo').and.callThrough();
                var a = document.getElementsByTagName('a')[0];
                angular.element(a).click();
                expect(scope.fields.Field1.goTo).toHaveBeenCalled()
            });
        });
    });

})();