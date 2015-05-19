(function() {
    "use strict";
    describe('std-boolean filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdBooleanFilter_) {
                filter = _stdBooleanFilter_;
            });
        });

        it('returns value.$', function () {
            expect(filter({ value: { $: true } })).toEqual('True');
            expect(filter({ value: { $: false } })).toEqual('False');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();