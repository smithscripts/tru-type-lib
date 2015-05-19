(function() {
    "use strict";
    describe('std-float filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdFloatFilter_) {
                filter = _stdFloatFilter_;
            });
        });

        it('returns value.$', function () {
            expect(filter({ value: { $: 12345 } })).toEqual('12345');
            expect(filter({ value: { $: -123 } })).toEqual('-123');
            expect(filter({ value: { $: 12.345 } })).toEqual('12.345');
            expect(filter({ value: { $: 0 } })).toEqual('0');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();