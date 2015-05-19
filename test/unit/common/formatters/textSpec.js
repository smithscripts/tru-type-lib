(function() {
    "use strict";
    describe('std-text filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdTextFilter_) {
                filter = _stdTextFilter_;
            });
        });

        it('returns value.$', function () {
            expect(filter({ value: { $: '' } })).toEqual('');
            expect(filter({ value: { $: 'Some Text!!' } })).toEqual('Some Text!!');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();