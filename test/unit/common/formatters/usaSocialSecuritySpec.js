(function() {
    "use strict";
    describe('std-usa-social-security filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdUsaSocialSecurityFilter_) {
                filter = _stdUsaSocialSecurityFilter_;
            });
        });

        it('formats value', function () {
            expect(filter({ value: { $: '123456789' } })).toEqual('123-45-6789');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });
    });
})();