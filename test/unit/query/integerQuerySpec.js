(function() {
    "use strict";
    describe('std-integer-query', function() {
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

            var elm = angular.element('<std-integer-query label="Foo Bar" field="searchFields.Field1"></std-integer-query>');
            elm.appendTo(searchGroup);
            elm = compile(elm)(scope);
            scope.$digest();

            isoScope = elm.isolateScope();
            ctrl = elm.controller('stdIntegerTextboxQuery');
        };

        beforeEach(module('query.builder'));
        beforeEach(module('query.data.model'));
        beforeEach(module('tru.search.group'));
        beforeEach(module('std.integer.only'));
        beforeEach(module('std.operator.lookup'));
        beforeEach(module('std.integer.query'));

        beforeEach(inject(function ($rootScope, $templateCache, $compile, $timeout, queryDataModel) {
            $templateCache.put('src/templates/query/std-integer-query.html', __html__['src/templates/query/std-integer-query.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            timeout = $timeout;
            dataModel = new queryDataModel;
        }));

        afterEach(function(){
            doc.find('body').html('');
        });

        describe('property.value', function() {
            it('when property.value has value, undefined the input should be removed from the dom', function () {
                dataModel.propertyValue = '4567';
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
                dataModel.propertyValue = '12345';
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
                dataModel.propertyValue = '12345';
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('12345');
            });

            it('when property.value has value, value.$ should be set to property.value', function () {
                dataModel.propertyValue = '4567';
                compileAndAppendElement();
                expect(isoScope.field.value.$).toBe('4567');
            });
        });

        describe('property.default', function() {
            it('when property.default has value, value.$ should be set to property.default', function () {
                dataModel.defaultValue = '12345';
                compileAndAppendElement();
                expect(isoScope.field.value.$).toBe('12345');
            });
        });

        describe('onClear()', function() {
            it('when property.value is not undefined, clicking clear should not set the readonly value to undefined', function () {
                dataModel.propertyValue = '1234';
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('clear')[0];
                expect(p.innerHTML).toBe('1234');
                button.click();
                expect(p.innerHTML).toBe('1234');
            });

            it('when property.value is undefined, clicking clear should set the field value to undefined', function () {
                dataModel.defaultValue = undefined;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                var button = document.getElementsByName('clear')[0];
                isoScope.field.value.$ = 3;
                scope.$digest();
                expect(input.value).toBe('3');
                button.click();
                expect(isoScope.field.value.$).toBe(undefined);
            });
        });

        describe('onDefault()', function() {
            it('when property.value has value, clicking default should not change the readonly value', function () {
                dataModel.propertyValue = '1234';
                compileAndAppendElement();
                var p = document.getElementsByTagName('p')[0];
                var button = document.getElementsByName('default')[0];
                expect(p.innerHTML).toBe('1234');
                button.click();
                expect(p.innerHTML).toBe('1234');
            });

            it('when property.default has value, clicking default should set the value to property.default', function () {
                dataModel.defaultValue = '12345';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                var button = document.getElementsByName('default')[0];
                isoScope.field.value.$ = '89';
                scope.$digest();
                expect(input.value).toBe('89');
                button.click();
                expect(input.value).toBe('12345');
            });

            it('when no special value is set, clicking default should set value.$ to undefined', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                var button = document.getElementsByName('default')[0];
                isoScope.field.value.$ = '5';
                scope.$digest();
                expect(input.value).toBe('5');
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
                dataModel.defaultValue = '12345';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalled();
            });

            it('when operator is set to equal, queryPredicate.set() should be called with eq', function () {
                dataModel.defaultValue = '12345';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'eq', '12345')
            });
        });

        describe('operators', function() {
            it('should set predicate operator to gt when greater-than and search button is clicked', function () {
                dataModel.defaultValue = '12345';
                dataModel.operator = 'greater-than';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'gt', '12345')
            });

            it('should set predicate operator to ge when greater-than-or-equal and search button is clicked', function () {
                dataModel.defaultValue = '12345';
                dataModel.operator = 'greater-than-or-equal';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'ge', '12345')
            });

            it('should set predicate operator to lt when less-than and search button is clicked', function () {
                dataModel.defaultValue = '12345';
                dataModel.operator = 'less-than';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'lt', '12345')
            });

            it('should set predicate operator to le when less-than-or-equal and search button is clicked', function () {
                dataModel.defaultValue = '12345';
                dataModel.operator = 'less-than-or-equal';
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'set');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.set).toHaveBeenCalledWith('', 'le', '12345')
            });
        });

        describe('operator - click', function() {
            it('clicking icon should set value.$ to undefined when property.value is undefined', function () {
                dataModel.defaultValue = '12345';
                compileAndAppendElement();

                var input = document.getElementsByTagName('input')[0];
                expect(input.value).toBe('12345');

                var icon = document.getElementsByTagName('i')[0];
                icon.click();
                expect(isoScope.field.value.$).toBe(undefined);
                expect(input.value).toBe('');
            });

            it('clicking icon should not clear the value.$ when property.value has value', function () {
                dataModel.propertyValue = '12345';
                compileAndAppendElement();

                var p = document.getElementsByTagName('p')[0];
                expect(p.innerHTML).toBe('12345');

                var icon = document.getElementsByTagName('i')[0];
                icon.click();
                expect(isoScope.field.value.$).toBe('12345');
                expect(p.innerHTML).toBe('12345');
            });
        });

        describe('operator - appearance', function() {
            it('should have class ttl-operator-icon-has-value when value.$ has value', function () {
                dataModel.defaultValue = '12345';
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

        describe('integer', function() {
            it('should not allow non-numeric characters', function () {
                dataModel.defaultValue = '12345';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');

                angular.element(input).val('12345x').trigger('input');
                scope.$digest();

                expect(input).toHaveValue('12345');
            });

            it('should allow numeric values', function () {
                dataModel.defaultValue = '12345';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');

                angular.element(input).val('123456').trigger('input');
                scope.$digest();

                expect(input).toHaveValue('123456');
            });

            it('numeric values should update the model', function () {
                dataModel.defaultValue = '12345';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');

                angular.element(input).val('123456').trigger('input');
                scope.$digest();

                expect(isoScope.field.value.$).toBe(123456);
            });

            it('negative numeric values should update the model', function () {
                dataModel.defaultValue = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');
                expect(isoScope.field.value.$).toBe(12345);

                angular.element(input).val('-123456').trigger('input');
                scope.$digest();

                expect(isoScope.field.value.$).toBe(-123456);
            });

            it('should allow a negative integers', function () {
                dataModel.defaultValue = '12345';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12345');

                angular.element(input).val('-12345').trigger('input');
                scope.$digest();

                expect(input).toHaveValue('-12345');
            });

            iit('should not allow more than one negative character', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('-').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('-');
                angular.element(input).val('--').trigger('input');
                scope.$digest();

                expect(input).toHaveValue('-');
            });

            it('negative character should set the model to undefined', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('-').trigger('input');
                scope.$digest();

                expect(isoScope.field.value.$).toBe(undefined);
            });

            it('negative character should set nullable control model to null', function () {
                dataModel.isNullable = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('-').trigger('input');
                scope.$digest();

                expect(isoScope.field.value.$).toBe(null);
            });


            it('should not allow decimals', function () {
                dataModel.defaultValue = '12';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('12');

                angular.element(input).val('12.').trigger('input');
                scope.$digest();

                expect(input).toHaveValue('12');
            });

            it('cursor should hold the correct position when inserting character', function () {
                //TODO: Research how to test cursor/caret position.
            });
        });

        describe('keypress', function() {
            it('should call preventDefault when the spacebar is pressed', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];

                var press = jQuery.Event("keypress");
                press.keyCode = 32;
                press.preventDefault = function() {};

                spyOn(press, 'preventDefault');

                jQuery(input).trigger(press);

                expect(press.preventDefault).toHaveBeenCalled();
            });
        });
    });

})();