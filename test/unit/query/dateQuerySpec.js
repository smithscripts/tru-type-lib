(function() {
    "use strict";
    describe('std-date-query', function() {
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

            var elm = angular.element('<std-date-query label="Foo Bar" field="searchFields.Field1"></std-date-query>');
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
        beforeEach(module('std.date.query'));

        beforeEach(inject(function ($rootScope, $templateCache, $compile, queryDataModel) {
            $templateCache.put('src/templates/query/std-date-query.html', __html__['src/templates/query/std-date-query.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new queryDataModel;
        }));

        afterEach(function(){
            doc.find('body').html('');
            dataModel.defaultValue = undefined;
            dataModel.operator = 'equal';
        });

        describe('setup / integration', function() {
            //
            //it('should (label) have the following attributes', function () {
            //    dataModel.defaultValue = new Date().toISOString().substring(0, 10);
            //    compileAndAppendElement();
            //    spyOn(isoScope.field.queryPredicate, 'clear');
            //    var button = document.getElementsByName('search')[0];
            //    button.click();
            //    expect(isoScope.field.queryPredicate.clear).toHaveBeenCalled();
            //});
        });
    });

})();