(function() {
    "use strict";
    describe('std-textbox-query', function() {
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

            var elm = angular.element('<std-textbox-query label="Foo Bar" field="searchFields.Field1"></std-textbox-query>');
            elm.appendTo(searchGroup);
            elm = compile(elm)(scope);
            scope.$digest();

            isoScope = elm.isolateScope();
            ctrl = elm.controller('stdTextboxQuery');
        };

        beforeEach(module('query.builder'));
        beforeEach(module('query.data.model'));
        beforeEach(module('tru.search.group'));
        beforeEach(module('std.operator.lookup'));
        beforeEach(module('std.textbox.query'));

        beforeEach(inject(function ($rootScope, $templateCache, $compile, queryDataModel) {
            $templateCache.put('src/templates/query/std-textbox-query.html', __html__['src/templates/query/std-textbox-query.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new queryDataModel;
        }));

        afterEach(function(){
            doc.find('body').html('');
        });

        describe('property.value', function() {
            it('when property.value has value, undefined the input should be removed from the dom', function () {
                dataModel.propertyValue = 'Blah Blah';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).not.toExist();
            });

            it('when property.value is null, the input should be removed from the dom', function () {
                dataModel.isNullable = true;
                dataModel.propertyValue = null;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).not.toExist();
            });

            it('when property.value is undefined the input should be in the dom', function () {
                dataModel.propertyValue = undefined;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toExist();
            });

            it('when property.value has value, the readonly element should be in the dom', function () {
                dataModel.propertyValue = 'Blah Blah';
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
                dataModel.propertyValue = 'Blah Blah';
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('Blah Blah');
            });

            it('when property.value has value, value.$ should be set to property.value', function () {
                dataModel.propertyValue = 'Blah Blah';
                compileAndAppendElement();
                expect(isoScope.field.value.$).toBe('Blah Blah');
            });
        });

        describe('property.default', function() {
            it('when property.default has value, value.$ should be set to property.default', function () {
                dataModel.defaultValue = 'Blah Blah';
                compileAndAppendElement();
                expect(isoScope.field.value.$).toBe('Blah Blah');
            });
        });

        describe('onClear()', function() {
            it('when property.value is not undefined, clicking clear should not set the readonly value to undefined', function () {
                dataModel.propertyValue = 'Blah Blah';
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('clear')[0];
                expect(p.innerHTML).toBe('Blah Blah');
                button.click();
                expect(p.innerHTML).toBe('Blah Blah');
            });

            it('when property.value is undefined, clicking clear should set the field value to undefined', function () {
                dataModel.defaultValue = undefined;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                var button = document.getElementsByName('clear')[0];
                isoScope.field.value.$ = 'Blah Blah';
                scope.$digest();
                expect(input.value).toBe('Blah Blah');
                button.click();
                expect(isoScope.field.value.$).toBe(undefined);
            });
        });

        describe('onDefault()', function() {
            it('when property.value has value, clicking default should not change the readonly value', function () {
                dataModel.propertyValue = 'Blah Blah';
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('default')[0];
                expect(p.innerHTML).toBe('Blah Blah');
                button.click();
                expect(p.innerHTML).toBe('Blah Blah');
            });

            it('when property.default has value, clicking default should set the value to property.default', function () {
                dataModel.defaultValue = 'Blah Blah';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                var button = document.getElementsByName('default')[0];
                isoScope.field.value.$ = 'Blah Blah Blah';
                scope.$digest();
                expect(input.value).toBe('Blah Blah Blah');
                button.click();
                expect(input.value).toBe('Blah Blah');
            });

            it('when no special value is set, clicking default should set value.$ to undefined', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                var button = document.getElementsByName('default')[0];
                isoScope.field.value.$ = 'Blah Blah';
                scope.$digest();
                expect(input.value).toBe('Blah Blah');
                button.click();
                scope.$digest();
                expect(input.value).toBe('');
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
                dataModel.defaultValue = 'Blah Blah';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalled();
            });

            it('when operator is set to equal, queryPredicate.set() should be called with eq', function () {
                dataModel.defaultValue = 'Blah Blah';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'eq', 'Blah Blah')
            });
        });

        describe('operators', function() {
            it('should set predicate operator to gt when greater-than and search button is clicked', function () {
                dataModel.defaultValue = 'Blah Blah';
                dataModel.operator = 'greater-than';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'gt', 'Blah Blah')
            });

            it('should set predicate operator to ge when greater-than-or-equal and search button is clicked', function () {
                dataModel.defaultValue = 'Blah Blah';
                dataModel.operator = 'greater-than-or-equal';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'ge', 'Blah Blah')
            });

            it('should set predicate operator to lt when less-than and search button is clicked', function () {
                dataModel.defaultValue = 'Blah Blah';
                dataModel.operator = 'less-than';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'lt', 'Blah Blah')
            });

            it('should set predicate operator to le when less-than-or-equal and search button is clicked', function () {
                dataModel.defaultValue = 'Blah Blah';
                dataModel.operator = 'less-than-or-equal';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'le', 'Blah Blah')
            });
        });

        describe('operator - click', function() {
            it('clicking icon should set value.$ to undefined when property.value is undefined', function () {
                dataModel.defaultValue = 'Blah Blah';
                compileAndAppendElement();

                var input = document.getElementsByTagName('input')[0];
                expect(input.value).toBe('Blah Blah');

                var icon = document.getElementsByTagName('i')[0];
                icon.click();
                expect(isoScope.field.value.$).toBe(undefined);
                expect(input.value).toBe('');
            });

            it('clicking icon should not clear the value.$ when property.value has value', function () {
                dataModel.propertyValue = 'Blah Blah';
                compileAndAppendElement();

                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('Blah Blah');

                var icon = document.getElementsByTagName('i')[0];
                icon.click();
                expect(isoScope.field.value.$).toBe('Blah Blah');
                expect(p.innerHTML).toBe('Blah Blah');
            });
        });

        describe('operator - appearance', function() {
            it('should have class ttl-operator-icon-has-value when value.$ has value', function () {
                dataModel.defaultValue = 'Blah Blah';
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