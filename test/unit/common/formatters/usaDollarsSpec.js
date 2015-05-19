(function() {
    "use strict";
    describe('std-usa-dolars filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdUsaDollarsFilter_) {
                filter = _stdUsaDollarsFilter_;
            });
        });

        it('returns value.$', function () {
            expect(filter({ value: { $: 11 } })).toEqual('$11.00');
            expect(filter({ value: { $: -34 } })).toEqual('$-34.00');
            expect(filter({ value: { $: 12.345 } })).toEqual('$12.35');
            expect(filter({ value: { $: 0 } })).toEqual('$0.00');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();