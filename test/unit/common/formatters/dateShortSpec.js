(function() {
    "use strict";
    describe('std-date-short filter', function() {
        var filter;

        beforeEach(module('std.formatters'));
        beforeEach(module('std.filter'));

        beforeEach(function () {
            inject(function (_stdDateShortFilter_) {
                filter = _stdDateShortFilter_;
            });
        });

        it('returns value.$', function () {
            expect(filter({ value: { $: new Date(2013, 0, 2, 3, 4, 5) } })).toEqual('01/02/2013');
        });
        
        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();