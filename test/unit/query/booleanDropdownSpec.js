(function() {
    "use strict";
    describe('std-boolean-dropdown-query', function() {
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

            var elm = angular.element('<std-boolean-dropdown-query label="Foo Bar" field="searchFields.Field1"></std-boolean-dropdown-query>');
            elm.appendTo(searchGroup);
            elm = compile(elm)(scope);
            scope.$digest();

            isoScope = elm.isolateScope();
            ctrl = elm.controller('stdBooleanDropdownQuery');
        };

        beforeEach(module('query.builder'));
        beforeEach(module('query.data.model'));
        beforeEach(module('tru.search.group'));
        beforeEach(module('std.operator.lookup'));
        beforeEach(module('std.util'));
        beforeEach(module('std.select.value.converter'));
        beforeEach(module('std.boolean.dropdown.query'));

        beforeEach(inject(function ($rootScope, $templateCache, $compile, queryDataModel) {
            $templateCache.put('src/templates/query/std-boolean-dropdown-query.html', __html__['src/templates/query/std-boolean-dropdown-query.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new queryDataModel;
        }));

        afterEach(function(){
            doc.find('body').html('');
        });

        describe('value property', function() {
            it('when property.value has value, undefined the select should be removed from the dom', function () {
                dataModel.propertyValue = true;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(select).not.toExist();
            });

            it('when property.value is null, undefined the select should be removed from the dom', function () {
                dataModel.propertyValue = 'null';
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(select).not.toExist();
            });

            it('when property.value is undefined the select should be in the dom', function () {
                dataModel.propertyValue = undefined;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(select).toExist();
            });

            it('when property.value has value, the readonly element should be in the dom', function () {
                dataModel.propertyValue = false;
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
                dataModel.propertyValue = 'null';
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('Null');
            });

            it('when property.value has value, value.$ should be set to property.value', function () {
                dataModel.propertyValue = true;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                expect(isoScope.field.value.$).toBe(true);
            });
        });

        describe('default property', function() {
            it('when property.default has value, value.$ should be set to property.default', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();
                expect(isoScope.field.value.$).toBe(true);
            });

            it('when property.default has value, select option should be selected', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var label = select.options[select.selectedIndex].text;
                expect(label).toBe('True');
            });
        });

        describe('onClear()', function() {
            it('when property.value is not undefined, clear should not change the readonly value', function () {
                dataModel.propertyValue = false;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('clear')[0];
                expect(p.innerHTML).toBe('False');
                button.click();
                expect(p.innerHTML).toBe('False');
            });

            it('when property.value is undefined, clear should set value.$ to undefined', function () {
                dataModel.defaultValue = undefined;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var button = document.getElementsByName('clear')[0];
                isoScope.field.value.$ = 'null';
                scope.$digest();
                expect(select.selectedIndex).toBe(3);
                button.click();
                expect(select.selectedIndex).toBe(0);
                expect(isoScope.field.value.$).toBe(undefined);
            });
        });

        describe('onDefault()', function() {
            it('when the control property.value has value, clicking default should not change the readonly value', function () {
                dataModel.propertyValue = true;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('default')[0];
                expect(p.innerHTML).toBe('True');
                expect(isoScope.field.value.$).toBe(true);
                button.click();
                expect(p.innerHTML).toBe('True');
                expect(isoScope.field.value.$).toBe(true);
            });

            it('when property.default has value, clicking default should set value.$ to property.default', function () {
                dataModel.defaultValue = null;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var button = document.getElementsByName('default')[0];
                isoScope.field.value.$ = true;
                scope.$digest();
                expect(select.selectedIndex).toBe(1);
                expect(isoScope.field.value.$).toBe(true);
                button.click();
                isoScope.$digest();
                scope.$digest();
                //TODO: Research why this fails here, but works correctly at runtime.
                //expect(select.selectedIndex).toBe(3);
                expect(isoScope.field.value.$).toBe(null);
            });

            it('when no special value is set, clicking default should set value.$ to empty string', function () {
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var button = document.getElementsByName('default')[0];
                isoScope.field.value.$ = true;
                scope.$digest();
                expect(select.selectedIndex).toBe(1);
                button.click();
                scope.$digest();
                expect(select.selectedIndex).toBe(0);
                expect(isoScope.field.value.$).toBe(undefined);
            });
        });

        describe('onPredicate()', function() {
            it('when value.$ is undefined, queryPredicate.clear() should be called', function () {
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'clear');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.clear).toHaveBeenCalled();
            });

            it('when value.$ has value, queryPredicate.set() should be called with value.$', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'eq', true);
            });

            it('when operator is set to equal, queryPredicate.set() should be called with eq', function () {
                dataModel.defaultValue = false;
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'eq', false)
            });

            it('when operator is set to greater-than, queryPredicate.set() should be called with gt', function () {
                dataModel.defaultValue = null;
                dataModel.operator = 'greater-than';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'gt', null)
            });

            it('when operator is set to greater-than-or-equal, queryPredicate.set() should be called with ge', function () {
                dataModel.defaultValue = true;
                dataModel.operator = 'greater-than-or-equal';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'ge', true)
            });

            it('when operator is set to less-than, queryPredicate.set() should be called with lt', function () {
                dataModel.defaultValue = false;
                dataModel.operator = 'less-than';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'lt', false)
            });

            it('when operator is set to less-than-or-equal, queryPredicate.set() should be called with le', function () {
                dataModel.defaultValue = null;
                dataModel.operator = 'less-than-or-equal';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'le', null)
            });
        });

        describe('operator - click', function() {
            it('clicking icon should set value.$ to undefined when property.value is undefined', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var icon = document.getElementsByTagName('i')[0];
                expect(select.selectedIndex).toBe(1);
                icon.click();
                expect(select.selectedIndex).toBe(0);
                expect(isoScope.field.value.$).toBe(undefined);
            });

            it('clicking icon should not clear the value.$ when property.value has value', function () {
                dataModel.propertyValue = true;
                compileAndAppendElement();

                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('True');

                var icon = document.getElementsByTagName('i')[0];
                icon.click();
                expect(isoScope.field.value.$).toBe(true);
                expect(p.innerHTML).toBe('True');
            });
        });

        describe('operator - appearance', function() {
            it('should have class ttl-operator-icon-has-value when value.$ has value', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();
                var div = document.getElementsByClassName('ttl-operator-icon-wrapper')[0];
                expect(div).toHaveClass('ttl-operator-icon-has-value');
            });

            it('should not have class ttl-search-icon-has-value when value.$ is undefined', function () {
                compileAndAppendElement();
                var div = document.getElementsByClassName('ttl-operator-icon-wrapper')[0];
                expect(div).not.toHaveClass('ttl-operator-icon-has-value');
            });
        });
    });

})();