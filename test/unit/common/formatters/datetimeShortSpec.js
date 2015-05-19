(function() {
    "use strict";
    describe('std-datetime-short filter', function() {
        var filter;

        beforeEach(module('std.formatters'));
        beforeEach(module('std.filter'));

        beforeEach(function () {
            inject(function (_stdDatetimeShortFilter_) {
                filter = _stdDatetimeShortFilter_;
            });
        });

        it('returns value.$', function () {
            expect(filter({ value: { $: new Date(2013, 0, 2, 3, 4, 5) } })).toEqual('01/02/2013 03:04 AM');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();