(function() {
    "use strict";
    describe('std-file-edit', function() {
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
            dataModel.children = {
                filename: {
                    value: { $: 'test.jpg' }
                },
                mimeType: {
                    type: {
                        queryChoices: function() {
                            return {
                                then: function(fn) {
                                    var results =  [
                                        { value: { $: 1 }, label: 'image/jpeg' },
                                        { value: { $: 2 }, label: 'image/png' }
                                    ];
                                    fn(results);
                                }
                            }
                        }
                    },
                    value: { $: 1 }
                }
            };
            dataModel.value = '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'
            scope.fields = dataModel.getFields();
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var elm = angular.element('<std-file-edit label="Foo Bar" field="fields.Field1"></std-file-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.isolateScope();
            ctrl = element.controller('stdFileEdit');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.file.reader'));
        beforeEach(module('std.file.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, editDataModel) {
            $templateCache.put('src/templates/edit/std-file-edit.html', __html__['src/templates/edit/std-file-edit.html']);

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
            it('should have the following button attributes', function () {
                compileAndAppendElement();
                var button1 = document.getElementsByTagName('button')[0];
                var button2 = document.getElementsByTagName('a')[0];
                var input = document.getElementsByTagName('input')[0];
                expect(button1).toHaveAttr('data-ng-click', 'upload()');
                expect(button1).toHaveAttr('data-ng-disabled', '!field.editor.isEditing || !field.type.canEdit');
                expect(button2).toHaveAttr('data-ng-click', 'download()');
                expect(button2).toHaveAttr('data-ng-disabled', '!field.value.data');
                expect(button2).toHaveAttr('download');
                expect(button2).toHaveAttr('href');
                expect(input).toHaveAttr('data-ng-model', 'field.property.data');
                expect(input).toHaveAttr('data-std-file-change', 'fileChanged($event)');
                expect(input).toHaveAttr('type', 'file');
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

            it('upload should be disabled when editing and user is not found in edit roles', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = false;
                compileAndAppendElement();

                var button = document.getElementsByTagName('button')[0];
                expect(button).toHaveAttr('disabled', 'disabled');
            });

            it('upload should be enabled when editing and user is found in edit roles', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = true;
                compileAndAppendElement();

                var button = document.getElementsByTagName('button')[0];
                expect(button).not.toHaveAttr('disabled');
            });

            it('download should be disabled when no data is present', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = true;
                compileAndAppendElement();
                scope.fields.Field1.value.data = undefined;
                scope.$digest();
                var button = document.getElementsByTagName('a')[0];
                expect(button).toHaveAttr('disabled', 'disabled');
            });

            it('download should be enabled when data is present', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = true;
                compileAndAppendElement();
                var button = document.getElementsByTagName('a')[0];
                expect(button).not.toHaveAttr('disabled');
            });
        });
    });

})();