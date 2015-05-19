(function() {
    "use strict";
    describe('std-date-edit', function() {
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

            var elm = angular.element('<std-date-edit label="Foo Bar" field="fields.Field1"></std-date-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.isolateScope();
            ctrl = element.controller('stdDateEditController');
        };

        var replaceRange = function(s, start, end, substitute) {
            return s.substring(0, start) + substitute + s.substring(end);
        };

        var jasmineExtensions = {
            jQuerySpies: {},
            spyOnEvent: function(element, eventName) {
                var control = {
                    triggered: false
                };
                $(element).bind(eventName, function() {
                    control.triggered = true;
                });
                jasmineExtensions.jQuerySpies[element[eventName]] = control;
            }
        };

        var spyOnEvent = jasmineExtensions.spyOnEvent;

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.date'));
        beforeEach(module('std.date.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, $timeout, editDataModel) {
            $templateCache.put('src/templates/edit/std-date-edit.html', __html__['src/templates/edit/std-date-edit.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new editDataModel;
            timeout = $timeout;

            jasmine.addMatchers({
                toHaveBeenTriggered: function() {
                    return {
                        compare: function (actual, expected) {
                            var control = jasmineExtensions.jQuerySpies[actual];
                            return {
                                pass: control.triggered
                            };
                        }
                    };
                }
            });
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

        describe('keydown - left arrow', function() {
            it('when the second range is selected, the left arrow should select the first range', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);

                e = jQuery.Event("keydown", {
                    keyCode: 37,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when the third range is selected, the left arrow should select the second range', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(6, 6);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);

                e = jQuery.Event("keydown", {
                    keyCode: 37,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(e.preventDefault).toHaveBeenCalled();
            });
        });

        describe('keydown - right arrow', function() {
            it('when the first range is selected, the right arrow should select the second range', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(0, 0);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);

                e = jQuery.Event("keydown", {
                    keyCode: 39,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when the second range is selected, the right arrow should select the third range', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);

                e = jQuery.Event("keydown", {
                    keyCode: 39,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
                expect(e.preventDefault).toHaveBeenCalled();
            });
        });

        describe('keydown - backspace', function() {
            it('when the first range is selected and is a number, backspace should set the text to the default format', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(0, 0);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                input.value = replaceRange(input.value, 0, 2, '12') ;

                e = jQuery.Event("keydown", {
                    keyCode: 8,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                expect(input.value.substring(0, 2)).toBe('MM');
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when the first range is selected and is formatted text, backspace should set selected range to 3', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(0, 0);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                input.value = replaceRange(input.value, 0, 2, '12') ;

                e = jQuery.Event("keydown", {
                    keyCode: 8,
                    preventDefault: function() { return }
                });
                angular.element(input).trigger(e);
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
            });

            it('when the second range is selected and is a number, backspace should set the text to the default format', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                input.value = replaceRange(input.value, 3, 5, '21') ;

                e = jQuery.Event("keydown", {
                    keyCode: 8,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(input.value.substring(3, 5)).toBe('dd');
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when the second range is selected and is formatted text, backspace should set selected range to 1', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                input.value = replaceRange(input.value, 3, 5, '21') ;

                e = jQuery.Event("keydown", {
                    keyCode: 8,
                    preventDefault: function() { return }
                });
                angular.element(input).trigger(e);
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                expect(input.value.substring(3, 5)).toBe('dd');
            });

            it('when the third range is selected and is a number, backspace set the text to the default format', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(6, 6);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
                input.value = replaceRange(input.value, 6, 10, '1975') ;

                e = jQuery.Event("keydown", {
                    keyCode: 8,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
                expect(input.value.substring(6, 10)).toBe('yyyy');
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when the third range is selected and is formatted text, backspace should set selected range to 2', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(6, 6);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
                input.value = replaceRange(input.value, 6, 10, '1975') ;

                e = jQuery.Event("keydown", {
                    keyCode: 8,
                    preventDefault: function() { return }
                });
                angular.element(input).trigger(e);
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(input.value.substring(6, 10)).toBe('yyyy');
            });
        });

        describe('keydown - delete', function() {
            it('when the first range is selected and is a number, delete should set the text to the default format', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(0, 0);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                input.value = replaceRange(input.value, 0, 2, '12') ;

                e = jQuery.Event("keydown", {
                    keyCode: 46,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                expect(input.value.substring(0, 2)).toBe('MM');
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when the first range is selected and is formatted text, delete should set selected range to 2', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(0, 0);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                input.value = replaceRange(input.value, 0, 2, '12') ;

                e = jQuery.Event("keydown", {
                    keyCode: 46,
                    preventDefault: function() { return }
                });
                angular.element(input).trigger(e);
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
            });

            it('when the second range is selected and is a number, delete should set the text to the default format', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                input.value = replaceRange(input.value, 3, 5, '21') ;

                e = jQuery.Event("keydown", {
                    keyCode: 46,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(input.value.substring(3, 5)).toBe('dd');
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when the second range is selected and is formatted text, delete should set selected range to 3', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                input.value = replaceRange(input.value, 3, 5, '21') ;

                e = jQuery.Event("keydown", {
                    keyCode: 46,
                    preventDefault: function() { return }
                });
                angular.element(input).trigger(e);
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
                expect(input.value.substring(3, 5)).toBe('dd');
            });

            it('when the third range is selected and is a number, delete set the text to the default format', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(6, 6);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
                input.value = replaceRange(input.value, 6, 10, '1975') ;

                e = jQuery.Event("keydown", {
                    keyCode: 46,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
                expect(input.value.substring(6, 10)).toBe('yyyy');
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when the third range is selected and is formatted text, delete should set selected range to 1', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(6, 6);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
                input.value = replaceRange(input.value, 6, 10, '1975') ;

                e = jQuery.Event("keydown", {
                    keyCode: 46,
                    preventDefault: function() { return }
                });
                angular.element(input).trigger(e);
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                expect(input.value.substring(6, 10)).toBe('yyyy');
            });
        });

        describe('keydown - tab', function() {
            it('when the first range is selected, tab should set the range to 2', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(0, 0);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);

                e = jQuery.Event("keydown", {
                    keyCode: 9,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when the second range is selected, tab should set the range to 3', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 5);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);

                e = jQuery.Event("keydown", {
                    keyCode: 9,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
                expect(e.preventDefault).toHaveBeenCalled();
            });
        });

        describe('keydown - tab + shift', function() {
            it('when the second range is selected, tab + shift should set the range to 1', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);

                e = jQuery.Event("keydown", {
                    keyCode: 9,
                    shiftKey: true,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when the third range is selected, tab + shift should set the range to 2', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(6, 10);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);

                e = jQuery.Event("keydown", {
                    keyCode: 9,
                    shiftKey: true,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(e.preventDefault).toHaveBeenCalled();
            });
        });

        describe('keydown - spacebar', function() {
            it('should call preventDefault when the spacebar is pressed', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("keydown", {
                    keyCode: 32,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(e.preventDefault).toHaveBeenCalled();
            });
        });

        describe('keydown - range1', function() {
            it('when 1 is entered, range one value should be 01 and still be selected', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(0, 0);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);

                e = jQuery.Event("keydown", {
                    keyCode: 49,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                expect(input.value.substring(0, 2)).toBe('01');
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when a 1 is followed by a 2 range one value should be 12', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(0, 0);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);

                e = jQuery.Event("keydown", {
                    keyCode: 49,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
                expect(input.value.substring(0, 2)).toBe('01');
                expect(e.preventDefault).toHaveBeenCalled();

                e = jQuery.Event("keydown", {
                    keyCode: 50,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(input.value.substring(0, 2)).toBe('12');
                expect(e.preventDefault).toHaveBeenCalled();
            });
        });

        describe('keydown - range2', function() {
            it('when 1 is entered, range two value should be 01 and still be selected', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);

                e = jQuery.Event("keydown", {
                    keyCode: 49,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(input.value.substring(3, 5)).toBe('01');
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when 2 is entered range two value should be 02 and still be selected', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);

                e = jQuery.Event("keydown", {
                    keyCode: 50,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(input.value.substring(3, 5)).toBe('02');
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when 3 is entered range two value should be 03 and still be selected', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);

                e = jQuery.Event("keydown", {
                    keyCode: 51,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(input.value.substring(3, 5)).toBe('03');
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when a 3 is followed by a 1 range two value should be 31', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);

                e = jQuery.Event("keydown", {
                    keyCode: 51,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
                expect(input.value.substring(3, 5)).toBe('03');
                expect(e.preventDefault).toHaveBeenCalled();

                e = jQuery.Event("keydown", {
                    keyCode: 49,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
                expect(input.value.substring(3, 5)).toBe('31');
                expect(e.preventDefault).toHaveBeenCalled();
            });

            it('when range two initial value is > 3 range three should be selected', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                angular.element(input).trigger(e);

                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);

                e = jQuery.Event("keydown", {
                    keyCode: 52,
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
                expect(input.value.substring(3, 5)).toBe('04');
                expect(e.preventDefault).toHaveBeenCalled();
            });
        });

        describe('mouseup', function() {
            it('should select first range', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(0, 0);
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(0);
                expect(input.selectionEnd).toBe(2);
            });

            it('should select second range', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(3, 3);
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(3);
                expect(input.selectionEnd).toBe(5);
            });

            it('should select third range', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(6, 6);
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(input.selectionStart).toBe(6);
                expect(input.selectionEnd).toBe(10);
            });
        });

        describe('cut', function() {
            it('should call preventDefault when cut is clicked', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("cut", {
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(e.preventDefault).toHaveBeenCalled();
            });
        });

        describe('paste', function() {
            it('should call preventDefault when paste is clicked', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("cut", {
                    preventDefault: function() { return }
                });
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(e.preventDefault).toHaveBeenCalled();
            });
        });

        describe('blur', function() {
            it('should set input to null date format when model is null', function () {
                dataModel.value = new Date(2015, 3, 20);
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input.value).toBe('04/20/2015');

                var e = jQuery.Event("mouseup", {
                    preventDefault: function() { return }
                });
                input.focus();
                input.setSelectionRange(0, 0);
                angular.element(input).trigger(e);

                var e = jQuery.Event("keydown", {
                    keyCode: 8,
                    preventDefault: function() { return }
                });
                angular.element(input).trigger(e);
                expect(input.value).toBe('MM/20/2015');

                var e = jQuery.Event("blur", {
                    preventDefault: function() { return }
                });
                angular.element(input).trigger(e);
                expect(input.value).toBe('MM/dd/yyyy');
            });

            it('should do nothing when model is defined', function () {
                dataModel.value = new Date(2015, 3, 20);
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input.value).toBe('04/20/2015');


                var e = jQuery.Event("blur", {
                    preventDefault: function() { return }
                });
                angular.element(input).trigger(e);
                expect(input.value).toBe('04/20/2015');
            });
        });

        describe('mousemove', function() {
            it('should call preventDefault when paste is clicked', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var e = jQuery.Event("mousemove", {
                    stopPropagation: function() { return },
                    preventDefault: function() { return },
                    cancelBubble: undefined,
                    returnValue: undefined
                });
                spyOn(e, 'stopPropagation');
                spyOn(e, 'preventDefault');
                angular.element(input).trigger(e);
                expect(e.stopPropagation).toHaveBeenCalled();
                expect(e.preventDefault).toHaveBeenCalled();
                expect(e.cancelBubble).toBe(true);
                expect(e.returnValue).toBe(false);
            });
        });

        function fillInDate(input) {
            var e = jQuery.Event("mouseup", {
                preventDefault: function() { return }
            });
            input.focus();
            input.setSelectionRange(0, 2);
            angular.element(input).trigger(e);

            input.value = replaceRange(input.value, 0, 2, '12');
            input.value = replaceRange(input.value, 3, 5, '21');
            input.value = replaceRange(input.value, 6, 10, '1975') ;
        }

        function fillInInCompleteDate(input) {
            var e = jQuery.Event("mouseup", {
                preventDefault: function() { return }
            });
            input.focus();
            input.setSelectionRange(0, 2);
            angular.element(input).trigger(e);

            input.value = replaceRange(input.value, 0, 2, '12');
            input.value = replaceRange(input.value, 3, 5, '21');
        }

        describe('formatters', function() {
            it('when model is undefined, view should be set to format string', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input.value).toBe('MM/dd/yyyy');
            });

            it('when model is date, view should be set to that date', function () {
                dataModel.value = new Date('12/12/1999');
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input.value).toBe('12/12/1999');
            });
        });

        describe('parsers', function() {
            it('should set $modelValue when string matches date format', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                fillInDate(input);
                angular.element(input).val(input.value).trigger('input');
                scope.$digest();
                var dateValue = isoScope.field.value.$;

                expect(dateValue.getMonth() + 1).toBe(12);
                expect(dateValue.getDate()).toBe(21);
                expect(dateValue.getFullYear()).toBe(1975);
            });

            it('should set model when string matches date format and retain original time when model has already been set', function () {
                dataModel.value = new Date('12/12/1999 09:15:44');
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                fillInDate(input);
                angular.element(input).val(input.value).trigger('input');
                scope.$digest();
                var dateValue = isoScope.field.value.$;

                expect(dateValue.getMonth() + 1).toBe(12);
                expect(dateValue.getDate()).toBe(21);
                expect(dateValue.getFullYear()).toBe(1975);
                expect(dateValue.getHours()).toBe(9);
                expect(dateValue.getMinutes()).toBe(15);
                expect(dateValue.getSeconds()).toBe(44);
            });

            it('should set model to $modelValue when date is incomplete', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                fillInInCompleteDate(input);
                angular.element(input).val(input.value).trigger('input');
                scope.$digest();
                var dateValue = isoScope.field.value.$;

                expect(isoScope.field.value.$).toBe(isoScope.field.value.$);
            });
        });
    });

})();