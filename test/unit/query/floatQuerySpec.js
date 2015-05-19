(function() {
    "use strict";
    describe('std-float-query', function() {
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

            var elm = angular.element('<std-float-query label="Foo Bar" field="searchFields.Field1"></std-float-query>');
            elm.appendTo(searchGroup);
            elm = compile(elm)(scope);
            scope.$digest();

            isoScope = elm.isolateScope();
            ctrl = elm.controller('stdFloatQuery');
        };

        beforeEach(module('query.builder'));
        beforeEach(module('query.data.model'));
        beforeEach(module('tru.search.group'));
        beforeEach(module('std.float'));
        beforeEach(module('std.operator.lookup'));
        beforeEach(module('std.float.query'));

        beforeEach(inject(function ($rootScope, $templateCache, $compile, $timeout, queryDataModel) {
            $templateCache.put('src/templates/query/std-float-query.html', __html__['src/templates/query/std-float-query.html']);

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

            it('should not have class ttl-operator-icon-has-value when value.$ is null', function () {
                dataModel.defaultValue = null;
                compileAndAppendElement();
                var div = document.getElementsByClassName('ttl-operator-icon-wrapper')[0];
                expect(div).not.toHaveClass('ttl-operator-icon-has-value');
            });

            it('should not have class ttl-operator-icon-has-value when value.$ is an empty string', function () {
                dataModel.defaultValue = '';
                compileAndAppendElement();
                var div = document.getElementsByClassName('ttl-operator-icon-wrapper')[0];
                expect(div).not.toHaveClass('ttl-operator-icon-has-value');
            });
        });

        describe('float', function() {
            it('should set input if value is number', function () {
                dataModel.defaultValue = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('1.2345');
            });

            it('should not allow non-numeric values other then (-,.)', function () {
                dataModel.defaultValue = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('1.2345x').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('1.2345');
            });

            it('input should allow scientific notation', function () {
                dataModel.defaultValue = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('123e-7').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('123e-7');
            });

            it('model should allow scientific notation', function () {
                dataModel.defaultValue = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('123e-7').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(123e-7);
            });

            it('negative value should update input', function () {
                dataModel.defaultValue = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('-1.2345').trigger('input');
                scope.$digest();
                expect(input).toHaveValue('-1.2345');
            });

            it('negative value should update model', function () {
                dataModel.defaultValue = 1.2345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                angular.element(input).val('-1.2345').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(-1.2345);
            });

            it('negative character should set nullable control model to null', function () {
                dataModel.isNullable = true;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('-').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(null);
            });

            it('when input is set to empty string the model should be set to undefined', function () {
                dataModel.defaultValue = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(undefined);
            });

            it('when input is set to empty string and isNullable the model should be set to undefined', function () {
                dataModel.isNullable = true;
                dataModel.defaultValue = 12345;
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(null);
            });

            it('when input is set to second non-numeric character the model should be set to undefined', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('..').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(undefined);
            });

            it('cursor should hold the correct position when inserting character', function () {
                //TODO: Research how to test cursor/caret position.
            });
        });

        describe('events', function() {
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

            it('should prepend 0 when input value is .00 on blur', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('.00').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input).toHaveValue('.00');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input.value).toBe('0.00');
            });

            it('should append 0 when input value is 0. on blur', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('0.').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input).toHaveValue('0.');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(0.0);
                expect(input.value).toBe('0.0');
            });

            it('should append 0 when input value is a whole number on blur', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('1234').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(1234);
                expect(input).toHaveValue('1234');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(1234.0);
                expect(input.value).toBe('1234.0');
            });

            it('should append 0 after the negative character when input value is a -.12 on blur', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('-.12').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(-0.12);
                expect(input).toHaveValue('-.12');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(-0.12);
                expect(input.value).toBe('-0.12');
            });

            it('should do nothing when input value is a empty string', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                input.focus();
                angular.element(input).val('').trigger('input');
                scope.$digest();
                expect(isoScope.field.value.$).toBe(undefined);
                expect(input).toHaveValue('');
                angular.element(input).triggerHandler('blur');
                expect(isoScope.field.value.$).toBe(undefined);
                expect(input.value).toBe('');
            });
        });
    });

})();