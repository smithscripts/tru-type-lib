(function() {
    "use strict";
    describe('std-usa-address filter', function() {
        var filter;
        var address1;
        var dataService;
        var entityAccess;

        entityAccess = {
            findInCache: function() {return {Code:'MN'} },
            search: function() {}
        };
        dataService = {
            entityAccess: function () { return entityAccess; }
        };

        beforeEach(module('std.formatters', function($provide) {
            $provide.value('dataService', dataService);
        }));

        beforeEach(function () {
            inject(function (_stdUsaAddressFilter_) {
                filter = _stdUsaAddressFilter_;
            });
            address1 = {
                children: {
                    address1: { value: { $: 'addr1' } },
                    address2: { value: { $: 'addr2' } },
                    city: { value: { $: 'city' } },
                    state: { value: { $: 123 } },
                    zip: { value: { $: '12345' } }
                }
            };
        });

        it('returns all parts formatted together', function () {
            expect(filter(address1)).toEqual('addr1 addr2 city MN, 12345');
        });

        it('omits address1 if null', function () {
            address1.children.address1.value.$ = null;
            expect(filter(address1)).toEqual('addr2 city MN, 12345');
        });

        it('omits address2 if null', function () {
            address1.children.address2.value.$ = null;
            expect(filter(address1)).toEqual('addr1 city MN, 12345');
        });

        it('omits city if null', function () {
            address1.children.city.value.$ = null;
            expect(filter(address1)).toEqual('addr1 addr2 MN, 12345');
        });

        it('omits state if null', function () {
            address1.children.state.value.$ = null;
            expect(filter(address1)).toEqual('addr1 addr2 city 12345');
        });

        it('omits zip if null', function () {
            address1.children.zip.value.$ = null;
            expect(filter(address1)).toEqual('addr1 addr2 city MN, ');
        });

        it('returns blank for all null parts', function () {
            expect(filter({
                children: {
                    address1: { value: { $: null } },
                    address2: { value: { $: null } },
                    city: { value: { $: null } },
                    state: { value: { $: null } },
                    zip: { value: { $: null } }
                }
            })).toEqual('');
        });
    });
})();