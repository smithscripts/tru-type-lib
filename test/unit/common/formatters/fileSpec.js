(function() {
    "use strict";
    describe('std-file filter', function() {
        var filter;
        var kb;
        var mb;
        var cfg;

        beforeEach(module('std.formatters'));

        beforeEach(function () {
            inject(function (_stdFileFilter_) {
                filter = _stdFileFilter_;
            });
            kb = 1024;
            mb = kb * kb;
            cfg = {
                children: {
                    filename: { value: { $: 'file1.ext' } },
                    length: { value: { $: 0 } }
                }
            };
        });

        it('returns filename', function () {
            expect(filter(cfg)).toEqual('file1.ext');
        });

        it('returns blank for null filename', function () {
            cfg.children.filename.value.$ = null;
            expect(filter(cfg)).toEqual('');
        });
        //it('includes filename and size', function () {
        //    expect(filter(cfg)).toEqual('file1.ext (0.00 KB)');
        //});
        //it('uses KB for length < .01 MB', function () {
        //    cfg.children.length.value.$ = 1.23 * kb;
        //    expect(filter(cfg)).toEqual('file1.ext (1.23 KB)');
        //    cfg.children.length.value.$ = 9.99 * kb;
        //    expect(filter(cfg)).toEqual('file1.ext (9.99 KB)');
        //});
        //it('uses MB for length > .01 MB', function () {
        //    cfg.children.length.value.$ = 1.23 * mb;
        //    expect(filter(cfg)).toEqual('file1.ext (1.23 MB)');
        //    cfg.children.length.value.$ = 0.011 * mb;
        //    expect(filter(cfg)).toEqual('file1.ext (0.01 MB)');
        //});
    });
})();