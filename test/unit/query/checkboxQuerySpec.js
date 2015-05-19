(function() {
    "use strict";
    describe('std-checkbox-query', function() {
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

            var elm = angular.element('<std-checkbox-query label="Foo Bar" field="searchFields.Field1"></std-checkbox-query>');
            elm.appendTo(searchGroup);
            element = compile(elm)(scope);
            scope.$digest();

            isoScope = element.isolateScope();
            ctrl = element.controller('stdCheckboxQuery');
        };

        beforeEach(module('query.builder'));
        beforeEach(module('query.data.model'));
        beforeEach(module('tru.search.group'));
        beforeEach(module('std.operator.lookup'));
        beforeEach(module('std.checkbox.query'));

        beforeEach(inject(function ($rootScope, $templateCache, $compile, queryDataModel) {
            $templateCache.put('src/templates/query/std-checkbox-query.html', __html__['src/templates/query/std-checkbox-query.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new queryDataModel;
        }));

        afterEach(function(){
            doc.find('body').html('');
        });

        describe('label integration', function() {
            it('label should have the following attributes', function () {
                compileAndAppendElement();
                var label = document.getElementsByTagName('tru-label')[0];
                expect(label).toHaveAttr('label', 'Foo Bar');
            });
        });

        describe('value property', function() {
            it('when property.value is true, the checkbox should be removed from the dom', function () {
                dataModel.propertyValue = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).not.toExist();
            });

            it('when property.value is false, the checkbox should be removed from the dom', function () {
                dataModel.propertyValue = false;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).not.toExist();
            });

            it('when property.value is undefined the checkbox should be in the dom', function () {
                dataModel.propertyValue = undefined;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toExist();
            });

            it('when property.value has value, the readonly element should be in the dom', function () {
                dataModel.propertyValue = true;
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

            it('when property.value has value, the readonly element value should be set', function () {
                dataModel.propertyValue = true;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('true');
            });
        });

        describe('default property', function() {
            it('when property.default is not undefined the checkbox value should be set', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input.checked).toBe(true);
            });
        });

        describe('onClear()', function() {
            it('when property.value is not undefined, clear should not change the readonly value', function () {
                dataModel.propertyValue = true;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('clear')[0];
                expect(p.innerHTML).toBe('true');
                button.click();
                expect(p.innerHTML).toBe('true');
            });

            it('when property.value is undefined, clear should set value.$ to undefined', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                var button = document.getElementsByName('clear')[0];
                isoScope.field.value.$ = true;
                scope.$digest();
                expect(input.checked).toBe(true);
                button.click();
                expect(input.checked).toBe(false);
                expect(isoScope.field.value.$).toBe(undefined);
            });
        });

        describe('onDefault()', function() {
            it('when the control property.value is not undefined, default should not change the readonly value', function () {
                dataModel.propertyValue = true;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('default')[0];
                expect(p.innerHTML).toBe('true');
                expect(isoScope.field.value.$).toBe(true);
                button.click();
                expect(p.innerHTML).toBe('true');
                expect(isoScope.field.value.$).toBe(true);
            });

            it('when property.default is not undefined, default should set value.$ to property.default', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                var button = document.getElementsByName('default')[0];
                isoScope.field.value.$ = false;
                scope.$digest();
                expect(input.checked).toBe(false);
                expect(isoScope.field.value.$).toBe(false);
                button.click();
                scope.$digest();
                expect(input.checked).toBe(true);
                expect(isoScope.field.value.$).toBe(true);
            });

            it('when not special value is set, default should set value.$ to undefined', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                var button = document.getElementsByName('default')[0];
                isoScope.field.value.$ = true;
                scope.$digest();
                expect(input.checked).toBe(true);
                expect(isoScope.field.value.$).toBe(true);
                button.click();
                scope.$digest();
                expect(input.checked).toBe(false);
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

            it('when value.$ has value, queryPredicate.set() should be called', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalled();
            });

            it('when operator is set to equal, queryPredicate.set() should be called with eq', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'eq', true)
            });
        });

        describe('operator - common', function() {
            it('when value.$ is undefined, ttl-operator-icon-has-value class should not be applied', function () {
                compileAndAppendElement();
                var div = element[0].querySelectorAll('.ttl-operator-icon-wrapper')[0];
                expect(div).not.toHaveClass('ttl-operator-icon-has-value');
            });

            it('when value.$ has value, ttl-operator-icon-has-value class should be applied', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();
                var div = element[0].querySelectorAll('.ttl-operator-icon-wrapper')[0];
                expect(div).toHaveClass('ttl-operator-icon-has-value');
            });

            it('clicking operator-icon should prevent setting value.$ to undefined when property.value has value', function () {
                dataModel.propertyValue = true;
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var i = element[0].querySelectorAll('.ttl-operator-icon')[0];
                i.click();
                expect(p.innerHTML).toBe('true');
                expect(isoScope.field.value.$).toBe(true);
            });

            it('clicking operator-icon should set value.$ to undefined when property.value is undefined', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                var i = element[0].querySelectorAll('.ttl-operator-icon')[0];
                i.click();
                expect(input.checked).toBe(false);
                expect(isoScope.field.value.$).toBe(undefined);
            });
        });

        describe('operator - equal', function() {
            it('when operator = "equal", ico-equal class should be applied', function () {
                compileAndAppendElement();
                var i = element[0].querySelectorAll('.ico-equal')[0];
                expect(i).toExist();
            });

            it('when operator = "equal", title message should be set', function () {
                compileAndAppendElement();
                var div = element[0].querySelectorAll('.ttl-operator-icon-wrapper')[0];
                expect(div.getAttribute('title')).toBe('Equal To');
            });
        });

        describe('operator - click', function() {
            it('clicking icon should set value.$ to undefined when property.value is undefined', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();

                var input = document.getElementsByTagName('input')[0];
                expect(input.checked).toBe(true);

                var icon = document.getElementsByTagName('i')[0];
                icon.click();
                expect(isoScope.field.value.$).toBe(undefined);
                expect(input.checked).toBe(false);
            });

            it('clicking icon should not clear the value.$ when property.value has value', function () {
                dataModel.propertyValue = true;
                compileAndAppendElement();

                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('true');

                var icon = document.getElementsByTagName('i')[0];
                icon.click();
                expect(isoScope.field.value.$).toBe(true);
                expect(p.innerHTML).toBe('true');
            });
        });

        describe('operator - appearance', function() {
            it('should have class ttl-operator-icon-has-value when value.$ has value', function () {
                dataModel.defaultValue = true;
                compileAndAppendElement();

                var div = document.getElementsByClassName('ttl-operator-icon-wrapper')[0];
                expect(div).toHaveClass('ttl-operator-icon-has-value');
            });

            it('should not have class ttl-operator-icon-has-value when value.$ is undefined', function () {
                compileAndAppendElement();

                var div = document.getElementsByClassName('ttl-operator-icon-wrapper')[0];
                expect(div).not.toHaveClass('ttl-operator-icon-has-value');
            });
        });
    });

})();