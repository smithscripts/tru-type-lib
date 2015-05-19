(function() {
    "use strict";
    describe('std-id filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdIdFilter_) {
                filter = _stdIdFilter_;
            });
        });

        it('returns recordId()', function () {
            var value = {};
            var cfg = { recordId: function () { return value; } };
            expect(filter(cfg)).toBe(value);
        });
    });
})();