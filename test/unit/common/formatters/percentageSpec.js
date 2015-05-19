(function() {
    "use strict";
    describe('std-percentage filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdPercentageFilter_) {
                filter = _stdPercentageFilter_;
            });
        });

        it('returns value.$', function () {
            expect(filter({ value: { $: .11 } })).toEqual('11.00%');
            expect(filter({ value: { $: -.34 } })).toEqual('-34.00%');
            expect(filter({ value: { $: .12345 } })).toEqual('12.35%');
            expect(filter({ value: { $: 0 } })).toEqual('0.00%');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();