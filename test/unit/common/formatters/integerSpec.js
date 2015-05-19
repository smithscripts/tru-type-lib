(function() {
    "use strict";
    describe('std-integer filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdIntegerFilter_) {
                filter = _stdIntegerFilter_;
            });
        });

        it('returns value.$', function () {
            expect(filter({ value: { $: 12345 } })).toEqual('12345');
            expect(filter({ value: { $: -123 } })).toEqual('-123');
            expect(filter({ value: { $: 0 } })).toEqual('0');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();