(function() {
    "use strict";
    describe('std-usa-zip filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdUsaZipFilter_) {
                filter = _stdUsaZipFilter_;
            });
        });

        it('returns value if length <=5', function () {
            expect(filter({ value: { $: '55118' } })).toEqual('55118');
            expect(filter({ value: { $: '123' } })).toEqual('123');
        });

        it('returns value with dash after 5th char if length >5', function () {
            expect(filter({ value: { $: '123456789' } })).toEqual('12345-6789');
            expect(filter({ value: { $: '1234567890' } })).toEqual('12345-67890');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();