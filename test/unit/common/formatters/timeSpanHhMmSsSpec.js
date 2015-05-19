(function() {
    "use strict";
    describe('std-time-short filter', function() {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdTimeSpanHhMmSsFilter_) {
                filter = _stdTimeSpanHhMmSsFilter_;
            });
        });

        it('formats values', function () {
            expect(filter({
                children: {
                    days: { value: { $: 1 } },
                    hours: { value: { $: 2 } },
                    minutes: { value: { $: 3 } },
                    seconds: { value: { $: 4 } },
                    milliseconds: { value: { $: 5 } }
                }
            })).toEqual('2 H, 3 M, 4.5 S');
        });
    });
})();