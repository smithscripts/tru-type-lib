(function() {
    "use strict";
    describe('std-usa-address-edit', function() {
        var compile,
            doc,
            scope,
            timeout,
            isoScope,
            element,
            ctrl,
            dataModel,
            mockStdDisplay;

        var addLabelContainerAttribute = function() {
            $('body').attr('data-tru-label-container','');
            compile($('body'))(scope);
        };

        var assignFields = function() {
            var fields = dataModel.getFields();
            fields.Field1.property = {
                address1: '1234 Blah Street NW',
                address2: '',
                city: 'Minneapolis',
                state: 'Minnesota',
                zip: '55442'
            };
            scope.fields = fields;
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var elm = angular.element('<std-usa-address-edit label="Foo Bar" field="fields.Field1"></std-usa-address-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.isolateScope();
            ctrl = element.controller('stdUsaAddressEdit');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.usa.address.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, editDataModel) {
            $templateCache.put('src/templates/edit/std-usa-address-edit.html', __html__['src/templates/edit/std-usa-address-edit.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new editDataModel;
        }));

        afterEach(function(){
            doc.find('body').html('');
        });

        describe('setup / integration', function() {

        });

        describe('access', function() {

        });
    });

})();