(function(){
    'use strict';

    var module = angular.module('std.number', []);

    module.factory('stdNumber',
        [
            function() {
                this.isUndefined = function(property) {
                    return typeof property === 'undefined'
                };

                return {
                    getClosest: this.getClosest,
                    isUndefined: this.isUndefined,
                    tryParseInt: this.tryParseInt
                }
            }
        ]);
})();