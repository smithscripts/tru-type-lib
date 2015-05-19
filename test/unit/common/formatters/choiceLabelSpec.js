(function () {
    "use strict";
    describe('std-choice-label filter', function () {
        var filter;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdChoiceLabelFilter_) {
                filter = _stdChoiceLabelFilter_;
            });
        });

        it('returns choice label for value.$', function () {
            var cfg = {
                value: { $: 1 },
                type: {
                    choices: [
                        { label: 'a', value: { $: 0 } },
                        { label: 'label-text', value: { $: 1 } },
                        { label: 'c', value: { $: 2 } }
                    ]
                }
            };
            expect(filter(cfg)).toEqual('label-text');
        });

        it('returns null for null value.$', function () {
            expect(filter({ value: { $: null } })).toBeNull();
        });

        it('returns null for missing choice', function () {
            var cfg = {
                value: { $: 1 },
                type: {
                    choices: [
                        { label: 'a', value: { $: 0 } }
                    ]
                }
            };
            expect(filter(cfg)).toEqual(null);
        });
    });
})();