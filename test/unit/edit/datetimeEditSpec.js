(function() {
    "use strict";
    describe('std-datetime-edit', function() {
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
            scope.fields = dataModel.getFields();
        };

        var compileAndAppendElement = function() {
            addLabelContainerAttribute();
            assignFields();

            var elm = angular.element('<std-datetime-edit label="Foo Bar" field="fields.Field1"></std-datetime-edit>');
            element = compile(elm)(scope);
            element.appendTo(document.body);
            scope.$digest();
            isoScope = element.scope();
            ctrl = element.controller('stdDatetimeEditController');
        };

        beforeEach(module('edit.data.model'));
        beforeEach(module('std.datetime.edit'));

        beforeEach(function() {
            mockStdDisplay = {
                setVisibility: function () {}
            };

            module(function ($provide) {
                $provide.value('stdDisplay', mockStdDisplay);
            });
        });

        beforeEach(inject(function ($rootScope, $templateCache, $compile, editDataModel) {
            $templateCache.put('src/templates/edit/std-datetime-edit.html', __html__['src/templates/edit/std-datetime-edit.html']);

            scope = $rootScope.$new();
            compile = $compile;
            doc = angular.element(document);
            dataModel = new editDataModel;
        }));

        afterEach(function(){
            doc.find('body').html('');
            dataModel.isEditing = false;
            dataModel.required = false;
            dataModel.canDisplay = true;
            dataModel.canEdit = true;
            dataModel.minLength = undefined;
            dataModel.maxLength = undefined;
            dataModel.validation = undefined;
            dataModel.mockValue = undefined;
        });

        describe('editing', function() {
            it('All controls should be set to a read-only state when not editing', function () {
                compileAndAppendElement();
                //var dateInput = document.getElementsByTagName('input')[0];
                //var timeInput = document.getElementsByTagName('input')[1];
                //var dateButton = document.getElementsByTagName('button')[0];
                //var timeButton = document.getElementsByTagName('button')[1];
                //
                //expect(dateInput).toHaveAttr('disabled', 'disabled');
                //expect(timeInput).toHaveAttr('disabled', 'disabled');
                //expect(dateButton).toHaveAttr('disabled', 'disabled');
                //expect(timeButton).toHaveAttr('disabled', 'disabled');
            });

            it('All controls should be set to a editing state when editing', function () {
                dataModel.isEditing = true;
                compileAndAppendElement();
                scope.$digest();

                var dateInput = document.getElementsByTagName('input')[0];
                var timeInput = document.getElementsByTagName('input')[1];
                var dateButton = document.getElementsByTagName('button')[0];
                var timeButton = document.getElementsByTagName('button')[1];

                expect(dateInput).not.toHaveAttr('disabled', 'disabled');
                expect(timeInput).not.toHaveAttr('disabled', 'disabled');
                expect(dateButton).not.toHaveAttr('disabled', 'disabled');
                expect(timeButton).not.toHaveAttr('disabled', 'disabled');
            });
        });

        describe('access', function() {
            it('should call display service with false when user does not have access', function () {
                dataModel.canDisplay = false;
                spyOn(mockStdDisplay, 'setVisibility');
                compileAndAppendElement();
                expect(mockStdDisplay.setVisibility).toHaveBeenCalledWith(jasmine.any(Object), false);
            });

            it('should call display service with true when user does have access', function () {
                dataModel.canDisplay = true;
                spyOn(mockStdDisplay, 'setVisibility');
                compileAndAppendElement();
                expect(mockStdDisplay.setVisibility).toHaveBeenCalledWith(jasmine.any(Object), true);
            });

            it('All controls should be set to a read-only state when user is not found in edit roles', function () {
                dataModel.isEditing = true;
                dataModel.canEdit = false;
                compileAndAppendElement();

                //var dateInput = document.getElementsByTagName('input')[0];
                //var timeInput = document.getElementsByTagName('input')[1];
                //var dateButton = document.getElementsByTagName('button')[0];
                //var timeButton = document.getElementsByTagName('button')[1];
                //
                //expect(dateInput).toHaveAttr('disabled', 'disabled');
                //expect(timeInput).toHaveAttr('disabled', 'disabled');
                //expect(dateButton).toHaveAttr('disabled', 'disabled');
                //expect(timeButton).toHaveAttr('disabled', 'disabled');
            });
        });


        // Javascript Date is not formating  correctly in test. new Date(2014, 9, 25, 0, 30) outputs 10242014

        //describe('init', function() {
        //    iit('should set date to MM/DD/YYYY', function () {
        //        var local = new Date('2014-10-25T00:30');
        //        var offset = local.getTimezoneOffset() / 60;
        //        dataModel.value = { $: new Date(2014, 9, 25, 0, 30)};
        //        compileAndAppendElement();
        //        var dateInput = document.getElementsByTagName('input')[0];
        //        expect(dateInput).toHaveValue('10252014');
        //    });
        //});

        //var init = function () {
        //    var datetime = new parseDatetime(scope.field.value.$);
        //    scope.data = {
        //        date: datetime.months.toString() + datetime.days.toString() + datetime.years.toString(),
        //        time: datetime.hours.toString() + ':' + datetime.minutes.toString(),
        //        period: datetime.period
        //    };
        //}();
    });

})();