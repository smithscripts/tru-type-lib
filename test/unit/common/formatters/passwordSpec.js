(function() {
    "use strict";
    describe('std-password filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdPasswordFilter_) {
                filter = _stdPasswordFilter_;
            });
        });

        it('8 stars if length > 0', function () {
            expect(filter({ value: { $: 'x' } })).toEqual('********');
        });

        it('returns blank for blank', function () {
            expect(filter({ value: { $: '' } })).toEqual('');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();