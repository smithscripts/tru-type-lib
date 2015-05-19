(function() {
    "use strict";
    describe('std-ref filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdRefFilter_) {
                filter = _stdRefFilter_;
            });
        });
        it('returns value.$', function () {
            expect(filter({ value: { $: 0 } })).toEqual('0');
            expect(filter({ value: { $: 123 } })).toEqual('123');
        });
        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();