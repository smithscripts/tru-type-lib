(function () {
    "use strict";
    describe('stdFilter', function () {
        var filter;
        beforeEach(function () {
            module('std.formatters');
            inject(function (_stdFilter_) {
                filter = _stdFilter_;
            });
        });
        describe('formatDate', function() {
            it('returns formatted date', function() {
                expect(filter.formatDate(new Date(2013, 0, 2, 3, 4, 5), 'MM/dd/yyyy hh:mm a')).toEqual('01/02/2013 03:04 AM');
            });
            it('returns null for null', function() {
                expect(filter.formatDate(null)).toBeNull();
            });
            it('returns invalid for invalid date', function() {
                expect(filter.formatDate(new Date('invalid'))).toEqual('(invalid date)');
            });
        });
    });
})();