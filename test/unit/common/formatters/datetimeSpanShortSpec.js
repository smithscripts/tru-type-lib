(function() {
    "use strict";
    describe('std-datetime-span-short filter', function() {
        var filter;

        beforeEach(module('std.formatters'));
        beforeEach(module('std.filter'));

        beforeEach(function () {
            inject(function (_stdDatetimeSpanShortFilter_) {
                filter = _stdDatetimeSpanShortFilter_;
            });
        });

        it('formats both datetimes', function () {
            var start = new Date(2013, 0, 2, 3, 4, 5);
            var end = new Date(2014, 5, 7, 8, 9, 10);
            expect(filter({
                children: {
                    start: { value: { $: start } },
                    end: { value: { $: end } }
                }
            })).toEqual('01/02/2013 03:04 AM - 06/07/2014 08:09 AM');
        });

        it('omits start if null', function () {
            expect(filter({
                children: {
                    start: { value: { $: null } },
                    end: { value: { $: new Date(2014, 5, 7, 8, 9, 10) } }
                }
            })).toEqual('06/07/2014 08:09 AM');
        });

        it('omits end if null', function () {
            expect(filter({
                children: {
                    start: { value: { $: new Date(2014, 5, 7, 8, 9, 10) } },
                    end: { value: { $: null } }
                }
            })).toEqual('06/07/2014 08:09 AM - ');
        });

        it('returns blank for both null', function () {
            expect(filter({
                children: {
                    start: { value: { $: null } },
                    end: { value: { $: null } }
                }
            })).toEqual('');
        });

        it('formats both datetimes when years differ', function () {
            var start = new Date(2013, 0, 2, 3, 4, 5);
            var end = new Date(start.getTime());
            end.setYear(2014);
            expect(filter({
                children: {
                    start: { value: { $: start } },
                    end: { value: { $: end } }
                }
            })).toEqual('01/02/2013 03:04 AM - 01/02/2014 03:04 AM');
        });

        it('formats both datetimes when months differ', function () {
            var start = new Date(2013, 0, 2, 3, 4, 5);
            var end = new Date(start.getTime());
            end.setMonth(1);
            expect(filter({
                children: {
                    start: { value: { $: start } },
                    end: { value: { $: end } }
                }
            })).toEqual('01/02/2013 03:04 AM - 02/02/2013 03:04 AM');
        });

        it('formats both datetimes when days differ', function () {
            var start = new Date(2013, 0, 2, 3, 4, 5);
            var end = new Date(start.getTime());
            end.setDate(3);
            expect(filter({
                children: {
                    start: { value: { $: start } },
                    end: { value: { $: end } }
                }
            })).toEqual('01/02/2013 03:04 AM - 01/03/2013 03:04 AM');
        });

        it('omits date part of end if same as start', function () {
            expect(filter({
                children: {
                    start: { value: { $: new Date(2013, 0, 2, 3, 4, 5) } },
                    end: { value: { $: new Date(2013, 0, 2, 6, 7, 8) } }
                }
            })).toEqual('01/02/2013 03:04 AM - 06:07 AM');
        });
    });
})();