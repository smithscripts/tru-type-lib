(function() {
    "use strict";
    describe('std-time-short filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdTimeShortFilter_) {
                filter = _stdTimeShortFilter_;
            });
        });

        it('returns value.$', function () {
            expect(filter({ value: { $: "PT3H4M5S" } })).toEqual('03:04 AM');
            expect(filter({ value: { $: "PT14H4M5S" } })).toEqual('02:04 PM');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();