(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdUsaAddress', ['dataService', function (dataService) {
        var queryRunning;
        return function (cfg) {
            cfg = cfg.children;
            var text = '';
            if (cfg.address1.value.$ !== null)
                text += cfg.address1.value.$ + ' ';
            if (cfg.address2.value.$ !== null)
                text += cfg.address2.value.$ + ' ';
            if (cfg.city.value.$ !== null)
                text += cfg.city.value.$ + ' ';
            if (cfg.state.value.$ !== null) {
                var state = dataService.entityAccess('StdUSAState').findInCache(cfg.state.value.$);
                if (state)
                    text += state.Code + ', ';
                else {
                    text += '(' + cfg.state.value.$ + '), ';
                    if (!queryRunning) {
                        queryRunning = true;
                        dataService.entityAccess('StdUSAState').search()
                            .then(function() {
                                //nothing to do
                            })
                            .finally(function() {
                                queryRunning = false;
                            });
                    }
                }
            }
            if (cfg.zip.value.$ !== null)
                text += cfg.zip.value.$;
            return text;
        };
    }])
})();