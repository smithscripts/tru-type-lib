(function() {
    "use strict";
    describe('std-masked-edit', function() {
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
            dataModel.fieldProperty['entryFilter'] = '(999) 999-9999';
            dataModel.fieldProperty['watermark'] = '(___) ___-____';
            scope.fields = dataModel.getFields();
        };

        var keydownEvent = function(el, keyCode) {
            var e = $.Event('keydown');
            e.which = keyCode;
            e.keyCode = keyCode;
            $(el).trigger(e);
            scope.$digest();
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var elm = angular.element('<std-masked-edit label="Foo Bar" field="fields.Field1"></std-masked-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.isolateScope();
            ctrl = element.controller('stdMaskedEdit');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.mask'));
        beforeEach(module('std.masked.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, $timeout, editDataModel) {
            $templateCache.put('src/templates/edit/std-masked-edit.html', __html__['src/templates/edit/std-masked-edit.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            timeout = $timeout;
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
            it('should (input) have the following attributes', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveAttr('data-ng-model', 'data.value');
                expect(input).toHaveAttr('data-ng-model-options', '{ updateOn: \'default blur\'}');
                expect(input).toHaveAttr('data-ng-change', 'onChange()');
                expect(input).toHaveAttr('data-ng-disabled', '!field.editor.isEditing || !field.type.canEdit');
                expect(input).toHaveAttr('data-ng-trim', 'false');
                expect(input).toHaveAttr('data-std-mask', '(999) 999-9999');
                expect(input).toHaveAttr('data-z-validate');
                expect(input).toHaveAttr('placeholder');
                expect(input).toHaveAttr('type', 'text');
            });
        });

        describe('editing', function() {
            it('should set the input to a read-only state when not editing', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveAttr('disabled', 'disabled');
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

        describe('data', function() {
            it('should format a standard phone# number on control initialization', function () {
                dataModel.value = '6128452301';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('(612) 845-2301');
            });

            it('should not allow 11 or more digits for a standard phone#', function () {
                dataModel.value = '6128452301';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                dataModel.value += '5555';
                scope.$digest();
                expect(input).toHaveValue('(612) 845-2301');
            });

            it('should only allow numbers for a standard phone#', function () {
                dataModel.value = '612845230';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                //Unable to test keyboard events

                //dataModel.value += 'A';
                //
                //var e = new window.KeyboardEvent('keydown', {
                //    bubbles: true,
                //    cancelable: true,
                //    shiftKey: true
                //});
                //
                ///**
                // * Assing 27 as keyCode
                // */
                //delete e.keyCode;
                //Object.defineProperty(e, 'keyCode', {'value': 49});
                //
                //input.dispatchEvent(e);
                //
                ////keydownEvent(angular.element(input), 49);
                //scope.$digest();
                //console.log(dataModel.value);
                //expect(input).toHaveValue('(___) ___-____');
                ////dataModel.value += '1';
                //
                ////scope.$digest();
                ////expect(input).toHaveValue('(612) 845-2301');
            });
        });
    });

})();