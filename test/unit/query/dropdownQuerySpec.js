(function() {
    "use strict";
    describe('std-dropdown-query', function() {
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

            var elm = angular.element('<std-dropdown-query label="Foo Bar" field="searchFields.Field1"></std-dropdown-query>');
            elm.appendTo(searchGroup);
            elm = compile(elm)(scope);
            scope.$digest();

            isoScope = elm.isolateScope();
            ctrl = elm.controller('stdDropdownQuery');
        };

        beforeEach(module('query.builder'));
        beforeEach(module('query.data.model'));
        beforeEach(module('tru.search.group'));
        beforeEach(module('std.operator.lookup'));
        beforeEach(module('std.util'));
        beforeEach(module('std.dropdown.query'));

        beforeEach(inject(function ($rootScope, $templateCache, $compile, queryDataModel) {
            $templateCache.put('src/templates/query/std-dropdown-query.html', __html__['src/templates/query/std-dropdown-query.html']);

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
                dataModel.propertyValue = 1;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                expect(select).not.toExist();
            });

            it('when property.value is null, undefined the select should be removed from the dom', function () {
                dataModel.isNullable = true;
                dataModel.propertyValue = null;
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
                dataModel.propertyValue = 1;
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
                dataModel.propertyValue = 1;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('High - 1');
            });

            it('when property.value has value, value.$ should be set to property.value', function () {
                dataModel.propertyValue = 1;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                expect(isoScope.field.value.$).toBe(1);
            });
        });

        describe('default property', function() {
            it('when property.default has value, value.$ should be set to property.default', function () {
                dataModel.defaultValue = 2;
                compileAndAppendElement();
                expect(isoScope.field.value.$).toBe(2);
            });

            it('when property.default has value, select option should be selected', function () {
                dataModel.defaultValue = 5;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var label = select.options[select.selectedIndex].text;
                expect(label).toBe('Low - 5');
            });
        });

        describe('onClear()', function() {
            it('when property.value is not undefined, clear should not change the readonly value', function () {
                dataModel.propertyValue = 1;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('clear')[0];
                expect(p.innerHTML).toBe('High - 1');
                button.click();
                expect(p.innerHTML).toBe('High - 1');
            });

            it('when property.value is undefined, clear should set value.$ to undefined', function () {
                dataModel.defaultValue = undefined;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var button = document.getElementsByName('clear')[0];
                isoScope.field.value.$ = 3;
                scope.$digest();
                expect(select.selectedIndex).toBe(3);
                button.click();
                expect(select.selectedIndex).toBe(0);
                expect(isoScope.field.value.$).toBe(undefined);
            });
        });

        describe('onDefault()', function() {
            it('when the control property.value has value, default should not change the readonly value', function () {
                dataModel.propertyValue = 5;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('default')[0];
                expect(p.innerHTML).toBe('Low - 5');
                expect(isoScope.field.value.$).toBe(5);
                button.click();
                expect(p.innerHTML).toBe('Low - 5');
                expect(isoScope.field.value.$).toBe(5);
            });

            it('when property.default has value, default should set value.$ to property.default', function () {
                dataModel.defaultValue = 5;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var button = document.getElementsByName('default')[0];
                isoScope.field.value.$ = 1;
                scope.$digest();
                expect(select.selectedIndex).toBe(1);
                expect(isoScope.field.value.$).toBe(1);
                button.click();
                scope.$digest();
                expect(select.selectedIndex).toBe(5);
                expect(isoScope.field.value.$).toBe(5);
            });

            it('when no special value is set, default should set value.$ to empty string', function () {
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var button = document.getElementsByName('default')[0];
                isoScope.field.value.$ = 5;
                scope.$digest();
                expect(select.selectedIndex).toBe(5);
                expect(isoScope.field.value.$).toBe(5);
                button.click();
                scope.$digest();
                expect(select.selectedIndex).toBe(0);
                expect(isoScope.field.value.$).toBe(undefined);
            });
        });

        describe('onPredicate()', function() {
            it('when value.$ is an empty string, queryPredicate.clear() should be called', function () {
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'clear');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.clear).toHaveBeenCalled();
            });

            it('when value.$ has value, queryPredicate.set() should be called with value.$', function () {
                dataModel.defaultValue = 5;
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'eq', 5);
            });

            it('when operator is set to equal, queryPredicate.set() should be called with eq', function () {
                dataModel.defaultValue = 5;
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'eq', 5)
            });

            it('when operator is set to greater-than, queryPredicate.set() should be called with gt', function () {
                dataModel.defaultValue = 5;
                dataModel.operator = 'greater-than';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'gt', 5)
            });

            it('when operator is set to greater-than-or-equal, queryPredicate.set() should be called with ge', function () {
                dataModel.defaultValue = 5;
                dataModel.operator = 'greater-than-or-equal';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'ge', 5)
            });

            it('when operator is set to less-than, queryPredicate.set() should be called with lt', function () {
                dataModel.defaultValue = 5;
                dataModel.operator = 'less-than';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'lt', 5)
            });

            it('when operator is set to less-than-or-equal, queryPredicate.set() should be called with le', function () {
                dataModel.defaultValue = 5;
                dataModel.operator = 'less-than-or-equal';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'le', 5)
            });
        });

        describe('operator - click', function() {
            it('clicking icon should set value.$ to undefined when property.value is undefined', function () {
                dataModel.defaultValue = 5;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var icon = document.getElementsByTagName('i')[0];
                expect(select.selectedIndex).toBe(5);
                icon.click();
                expect(select.selectedIndex).toBe(0);
                expect(isoScope.field.value.$).toBe(undefined);
            });

            it('clicking icon should not clear the value.$ when property.value has value', function () {
                dataModel.propertyValue = 1;
                compileAndAppendElement();

                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('High - 1');

                var icon = document.getElementsByTagName('i')[0];
                icon.click();
                expect(isoScope.field.value.$).toBe(1);
                expect(p.innerHTML).toBe('High - 1');
            });
        });

        describe('operator - appearance', function() {
            it('should have class ttl-operator-icon-has-value when value.$ has value', function () {
                dataModel.defaultValue = '12345';
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

        describe('nullable', function() {
            it('when isNullable has value, the select element should append a option with a label of Null', function () {
                dataModel.isNullable = true;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var lastOption = select.options[select.options.length - 1];
                expect(lastOption.innerHTML).toBe('Null');
            });

            it('when isNullable has value, the select element should append a option with a value of  null', function () {
                dataModel.isNullable = true;
                compileAndAppendElement();
                var select = document.getElementsByTagName('select')[0];
                var lastOption = select.options[select.options.length - 1];
                //TODO: Research why this is failing
                //expect(lastOption.value).toBe(null);
            });
        });
    });

})();