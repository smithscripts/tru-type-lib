(function() {
    "use strict";
    describe('std-datetime-range-query', function() {
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

            var elm = angular.element('<std-datetime-range-query label="Foo Bar" field="searchFields.Field1"></std-datetime-range-query>');
            elm.appendTo(searchGroup);
            elm = compile(elm)(scope);
            scope.$digest();

            isoScope = elm.isolateScope();
            ctrl = elm.controller('stdDatetimeRangeQuery');
        };

        beforeEach(module('query.builder'));
        beforeEach(module('query.data.model'));
        beforeEach(module('tru.search.group'));
        beforeEach(module('std.operator.lookup'));
        beforeEach(module('std.datetime.range.query'));

        beforeEach(inject(function ($rootScope, $templateCache, $compile, queryDataModel) {
            //$templateCache.put('src/templates/tru-search-group.html', __html__['src/templates/tru-search-group.html']);
            $templateCache.put('src/templates/query/std-datetime-range-query.html', __html__['src/templates/query/std-datetime-range-query.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new queryDataModel;
        }));

        afterEach(function(){
            doc.find('body').html('');
            dataModel.defaultValue = undefined;
        });

        describe('setup / integration', function() {
            it('should (label) have the following attributes', function () {
                compileAndAppendElement();
                var label = document.getElementsByTagName('tru-label')[0];
                expect(label).toHaveAttr('label', 'Foo Bar');
            });

            it('should (input) have the following attributes', function () {
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveAttr('data-ng-model', 'startDatetime');
                expect(input).toHaveAttr('data-ng-disabled', 'field.property.startValue');
                expect(input).toHaveAttr('data-ng-trim', 'false');
                expect(input).toHaveAttr('type', 'datetime-local');

                var input = document.getElementsByTagName('input')[1];
                expect(input).toHaveAttr('data-ng-model', 'endDatetime');
                expect(input).toHaveAttr('data-ng-disabled', 'field.property.endValue');
                expect(input).toHaveAttr('data-ng-trim', 'false');
                expect(input).toHaveAttr('type', 'datetime-local');
            });

            it('default value should set input to correct value', function () {
                dataModel.startDefault = '2014-10-30T13:00';
                dataModel.endDefault = '2014-11-30T13:00';
                compileAndAppendElement();
                var input = document.getElementsByTagName('input')[0];
                expect(input).toHaveValue('2014-10-30T13:00');
                var input = document.getElementsByTagName('input')[1];
                expect(input).toHaveValue('2014-11-30T13:00');
            });
        });

        describe('callbacks', function() {
            it('should clear input values when clear button is clicked', function () {
                dataModel.startDefault = '2014-10-30T13:00';
                dataModel.endDefault = '2014-11-30T13:00';
                compileAndAppendElement();
                var input1 = document.getElementsByTagName('input')[0];
                var input2 = document.getElementsByTagName('input')[1];
                expect(input1).toHaveValue('2014-10-30T13:00');
                expect(input2).toHaveValue('2014-11-30T13:00');
                var button = document.getElementsByName('clear')[0];
                button.click();
                expect(input1).toHaveValue('');
                expect(input2).toHaveValue('');
            });

            it('should set input values to default value when default button is clicked', function () {
                dataModel.startDefault = '2014-10-30T13:00';
                dataModel.endDefault = '2014-11-30T13:00';
                compileAndAppendElement();
                var input1 = document.getElementsByTagName('input')[0];
                var input2 = document.getElementsByTagName('input')[1];
                expect(input1).toHaveValue('2014-10-30T13:00');
                expect(input2).toHaveValue('2014-11-30T13:00');
                isoScope.startDatetime = '1999-10-30T13:00';
                isoScope.endDatetime = '1999-11-30T13:00';
                scope.$digest();
                expect(input1).toHaveValue('1999-10-30T13:00');
                expect(input2).toHaveValue('1999-11-30T13:00');

                var button = document.getElementsByName('default')[0];
                button.click();
                expect(input1).toHaveValue('2014-10-30T13:00');
                expect(input2).toHaveValue('2014-11-30T13:00');
            });

            it('should call clear predicate when start and end values are empty and search button is clicked', function () {
                dataModel.default = [];
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'clear');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.clear).toHaveBeenCalled()
            });

            it('should call clear predicate when start and end values are null and search button is clicked', function () {
                dataModel.default = null;
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'clear');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.clear).toHaveBeenCalled()
            });

            it('should call clear predicate when start and end values are undefined and search button is clicked', function () {
                dataModel.default = undefined;
                compileAndAppendElement();
                spyOn(isoScope.field.queryPredicate, 'clear');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.clear).toHaveBeenCalled()
            });

            it('should call create predicate once when start input has value and search button is clicked', function () {
                compileAndAppendElement();
                isoScope.startDatetime = '1999-10-30T13:00';
                spyOn(isoScope.field.queryPredicate, 'create');
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.create).toHaveBeenCalledWith('', 'gt', jasmine.any(Date));
                expect(isoScope.field.queryPredicate.create.calls.count()).toBe(1);
            });

            it('should call create predicate twice when start and end input values are set and search button is clicked', function () {
                compileAndAppendElement();
                isoScope.startDatetime = '1999-10-30T13:00';
                isoScope.endDatetime = '1999-10-30T13:00';
                spyOn(isoScope.field.queryPredicate, 'create').and.returnValue({ and: function() {}})
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.create).toHaveBeenCalledWith('', 'gt', jasmine.any(Date));
                expect(isoScope.field.queryPredicate.create.calls.count()).toBe(2);
            });

            it('should set predicate operator to ge when startDateInclusive equals "greater-than-or-equal" and search button is clicked', function () {
                dataModel.startDateInclusive = 'greater-than-or-equal';
                compileAndAppendElement();
                isoScope.startDatetime = '1999-10-30T13:00';
                spyOn(isoScope.field.queryPredicate, 'create').and.returnValue({ and: function() {}})
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.create).toHaveBeenCalledWith('', 'ge', jasmine.any(Date));
                expect(isoScope.field.queryPredicate.create.calls.count()).toBe(1);
            });

            it('should set predicate operator to gt when startDateInclusive equals "greater-than and search button is clicked', function () {
                dataModel.startDateInclusive = 'greater-than';
                compileAndAppendElement();
                isoScope.startDatetime = '1999-10-30T13:00';
                spyOn(isoScope.field.queryPredicate, 'create').and.returnValue({ and: function() {}})
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.create).toHaveBeenCalledWith('', 'gt', jasmine.any(Date));
                expect(isoScope.field.queryPredicate.create.calls.count()).toBe(1);
            });

            it('should set predicate operator to le when endDateInclusive equal "less-than-or-equal" and search button is clicked', function () {
                dataModel.endDateInclusive = 'less-than-or-equal';
                compileAndAppendElement();
                isoScope.endDatetime = '1999-10-30T13:00';
                spyOn(isoScope.field.queryPredicate, 'create').and.returnValue({ and: function() {}})
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.create).toHaveBeenCalledWith('', 'le', jasmine.any(Date));
                expect(isoScope.field.queryPredicate.create.calls.count()).toBe(1);
            });

            it('should set predicate operator to lt when endDateInclusive is false and search button is clicked', function () {
                dataModel.endDateInclusive = 'less-than';
                compileAndAppendElement();
                isoScope.endDatetime = '1999-10-30T13:00';
                spyOn(isoScope.field.queryPredicate, 'create').and.returnValue({ and: function() {}})
                var button = document.getElementsByName('search')[0];
                button.click();
                expect(isoScope.field.queryPredicate.create).toHaveBeenCalledWith('', 'lt', jasmine.any(Date));
                expect(isoScope.field.queryPredicate.create.calls.count()).toBe(1);
            });
        });

        describe('layout/view', function() {
            it('should set startDatetime textbox to readonly when "startValue" is set', function () {
                dataModel.startValue = '1999-10-30T13:00';
                compileAndAppendElement();
                var input1 = document.getElementsByTagName('input')[0];
                var input2 = document.getElementsByTagName('input')[1];
                expect(input1.disabled).toBe(true);
                expect(input2.disabled).toBe(false);
            });

            it('should set endDatetime textbox to readonly when "endValue" is set', function () {
                dataModel.endValue = '1999-10-30T13:00';
                compileAndAppendElement();
                var input1 = document.getElementsByTagName('input')[0];
                var input2 = document.getElementsByTagName('input')[1];
                expect(input1.disabled).toBe(false);
                expect(input2.disabled).toBe(true);
            });
        });
    });

})();