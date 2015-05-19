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

        describe('label integration', function() {
            //it('label should have the following attributes', function () {
            //    compileAndAppendElement();
            //    var label = document.getElementsByTagName('tru-label')[0];
            //    expect(label).toHaveAttr('label', 'Foo Bar');
            //});
        });
    });

})();