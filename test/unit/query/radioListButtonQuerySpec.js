(function() {
    "use strict";
    describe('std-radio-list-button-query', function() {
        var compile,
            doc,
            scope,
            timeout,
            isoScope,
            element,
            ctrl,
            dataModel;

        var addLabelContainerAttribute = function() {
            $('body').attr('data-tru-label-container','');
            compile($('body'))(scope);
        };

        var assignFields = function() {
            scope.searchFields = dataModel.getFields();
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var searchGroup = angular.element('<tru-search-group fields="searchFields"></tru-search-group>');
            searchGroup = compile(searchGroup)(scope);
            searchGroup.appendTo(document.body);
            scope.$digest();

            var elm = angular.element('<std-radio-list-button-query label="Foo Bar" field="searchFields.Field1"></std-radio-list-button-query>');
            elm.appendTo(searchGroup);
            elm = compile(elm)(scope);
            scope.$digest();

            isoScope = elm.isolateScope();
            ctrl = elm.controller('stdRadioListButtonQuery');
        };

        beforeEach(module('query.data.model'));
        beforeEach(module('tru.search.group'));
        beforeEach(module('std.operator.lookup'));
        beforeEach(module('std.radio.list.button.query'));

        beforeEach(inject(function ($rootScope, $templateCache, $compile, queryDataModel) {
            $templateCache.put('src/templates/query/std-radio-list-button-query.html', __html__['src/templates/query/std-radio-list-button-query.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new queryDataModel;
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
            dataModel.default = [];
        });

        describe('property.value', function() {
            it('when property.value has value, undefined the checkbox list should be removed from the dom', function () {
                dataModel.propertyValue = [1,2];
                compileAndAppendElement();
                var group = document.getElementsByClassName('tickGroup')[0];
                expect(group).not.toExist();
            });

            it('when property.value is undefined the checkbox list should be in the dom', function () {
                dataModel.propertyValue = undefined;
                compileAndAppendElement();
                var group = document.getElementsByClassName('tickGroup')[0];
                expect(group).toExist();
            });

            it('when property.value has value, the readonly element should be in the dom', function () {
                dataModel.propertyValue = [1,2];
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                expect(p).toExist();
            });

            it('when property.value is undefined the readonly element should be removed from the dom', function () {
                dataModel.propertyValue = undefined;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                expect(p).not.toExist();
            });

            it('when property.value has value, the readonly element value should be set to label', function () {
                dataModel.propertyValue = [1,2];
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('High - 1,2');
            });
        });

        describe('property.default', function() {
            it('when property.default has value, the related checkboxes should be checked', function () {
                dataModel.defaultValue = [2];
                compileAndAppendElement();
                var inputs = document.getElementsByTagName('input');
                expect(inputs[1].checked).toBe(true);
            });
        });

        describe('onClear()', function() {
            it('when property.value has value, clicking clear should not change the readonly value', function () {
                dataModel.propertyValue = [1,2];
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('clear')[0];
                expect(p.innerHTML).toBe('High - 1,2');
                button.click();
                expect(p.innerHTML).toBe('High - 1,2');
            });

            it('when property.value is undefined, clicking clear should un-check all values', function () {
                dataModel.defaultValue = [2];
                compileAndAppendElement();
                var inputs = document.getElementsByTagName('input');
                var button = document.getElementsByName('clear')[0];
                expect(inputs[1].checked).toBe(true);
                button.click();
                for (var i = 0; i < inputs.length; i++) {
                    expect(inputs[i].checked).toBe(false);
                }
            });
        });

        describe('onDefault()', function() {
            it('when property.value has value, clicking default should not change the readonly value', function () {
                dataModel.propertyValue = [1,2];
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('default')[0];
                expect(p.innerHTML).toBe('High - 1,2');
                expect(isoScope.data.choices[0].checked).toBe(true);
                expect(isoScope.data.choices[1].checked).toBe(true);
                button.click();
                expect(p.innerHTML).toBe('High - 1,2');
                expect(isoScope.data.choices[0].checked).toBe(true);
                expect(isoScope.data.choices[1].checked).toBe(true);
            });

            it('when property.default has value, clicking default should set checkboxes to property.default', function () {
                dataModel.defaultValue = [5];
                compileAndAppendElement();
                var inputs = document.getElementsByTagName('input');
                var button1 = document.getElementsByName('clear')[0];
                var button2 = document.getElementsByName('default')[0];
                expect(inputs[4].checked).toBe(true);
                expect(isoScope.data.choices[4].checked).toBe(true);
                button1.click();
                for (var i = 0; i < inputs.length; i++) {
                    expect(inputs[i].checked).toBe(false);
                }
                button2.click();
                expect(inputs[4].checked).toBe(true);
                expect(isoScope.data.choices[4].checked).toBe(true);
            });

            it('when no special value is set, clicking default should clear all checkboxes', function () {
                compileAndAppendElement();
                var inputs = document.getElementsByTagName('input');
                var button = document.getElementsByName('default')[0];
                inputs[0].click();
                inputs[3].click();
                scope.$digest();
                expect(isoScope.data.choices[0].checked).toBe(true);
                expect(isoScope.data.choices[3].checked).toBe(true);
                button.click();
                for (var i = 0; i < inputs.length; i++) {
                    expect(inputs[i].checked).toBe(false);
                }
            });
        });

        describe('onPredicate()', function() {
            it('when no checkboxes are checked, queryPredicate.clear() should be called', function () {
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                spyOn(isoScope.field.queryPredicate, 'clear');
                var inputs = document.getElementsByTagName('input');
                var clear = document.getElementsByName('clear')[0];
                var search = document.getElementsByName('search')[0];
                inputs[0].click();
                inputs[3].click();
                search.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalled();
                clear.click();
                search.click();
                expect(isoScope.field.queryPredicate.clear).toHaveBeenCalled();
            });

            it('when checkboxes are checked, queryPredicate.set() should be called with a function.', function () {
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var inputs = document.getElementsByTagName('input');
                var search = document.getElementsByName('search')[0];
                inputs[0].click();
                inputs[3].click();
                search.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalled();
            });
        });

        describe('operator - click', function() {
            it('clicking icon should un-check all checkboxes when property.value is undefined', function () {
                dataModel.defaultValue = [2];
                compileAndAppendElement();
                var inputs = document.getElementsByTagName('input');
                var icon = document.getElementsByTagName('i')[0];
                expect(inputs[1].checked).toBe(true);
                icon.click();
                for (var i = 0; i < inputs.length; i++) {
                    expect(inputs[i].checked).toBe(false);
                }
            });

            it('clicking icon should not clear checkboxes when property.value has value', function () {
                dataModel.propertyValue = [1,2];
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('High - 1,2');
                expect(isoScope.data.choices[0].checked).toBe(true);
                expect(isoScope.data.choices[1].checked).toBe(true);
                var icon = document.getElementsByTagName('i')[0];
                icon.click();
                expect(p.innerHTML).toBe('High - 1,2');
                expect(isoScope.data.choices[0].checked).toBe(true);
                expect(isoScope.data.choices[1].checked).toBe(true);
            });
        });

        describe('operator - appearance', function() {
            it('should have class ttl-operator-icon-has-value when a radio button is checked', function () {
                dataModel.defaultValue = [1,2];
                compileAndAppendElement();
                var div = document.getElementsByClassName('ttl-operator-icon-wrapper')[0];
                expect(div).toHaveClass('ttl-operator-icon-has-value');
            });

            it('should not have class ttl-search-icon-has-value when no radio buttons are checked', function () {
                compileAndAppendElement();
                var div = document.getElementsByClassName('ttl-operator-icon-wrapper')[0];
                expect(div).not.toHaveClass('ttl-operator-icon-has-value');
            });
        });

        describe('nullable', function() {
            it('when isNullable has value, the radio buttons list should append an option with a label of Null', function () {
                dataModel.isNullable = true;
                compileAndAppendElement();
                var inputs = document.getElementsByTagName('input');
                var lastCheckbox = inputs[inputs.length - 1];
                expect(lastCheckbox.parentNode.innerText).toBe(' Null');
                expect(isoScope.data.choices[inputs.length - 1].value.$).toBe(null);
            });
        });
    });

})();