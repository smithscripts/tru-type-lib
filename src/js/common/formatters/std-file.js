(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdFile', [function () {
        return function (cfg) {
            var text = '';
            if (cfg.children.filename.value.$ !== null)
                text += cfg.children.filename.value.$;
            return text;
            //cfg = cfg.children;
            //var length = cfg.length.value.$;
            //var mb = 1024 * 1024;
            //var size;
            //if (length > mb * 0.01)
            //    size = (length / mb).toFixed(2) + ' MB';
            //else
            //    size = (length / 1024).toFixed(2) + ' KB';
            //var text = cfg.filename.value.$ + ' (' + size + ')';
            //return text;
        };
    }])
})();