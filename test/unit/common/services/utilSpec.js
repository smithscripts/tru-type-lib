(function() {
    "use strict";
    describe('std-util service', function() {
        var scope, compile, doc, service, element;

        function createAndAppendInput() {
            element = angular.element('<input>');
            element = compile(element)(scope);
            doc.find('body').append(element);
        }

        function setInputValue(value) {
            element[0].value = value;
        }

        function setInputCursorPosition(cursorPos) {
            element[0].focus();
            element[0].setSelectionRange(cursorPos, cursorPos);
        }

        beforeEach(module('std.util'));

        beforeEach(function () {
            inject(function ($rootScope, $compile, _stdUtil_) {
                scope = $rootScope.$new();
                compile = $compile;
                doc = angular.element(document);
                service = _stdUtil_;
            });
        });

        it('should return the cursor position', function () {
            createAndAppendInput();
            setInputValue('This is a test');
            setInputCursorPosition(5);
            expect(service.getCursorPosition(element[0])).toBe(5);
            setInputCursorPosition(0);
            expect(service.getCursorPosition(element[0])).toBe(0);
        });
    });
})();