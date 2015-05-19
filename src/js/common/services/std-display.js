(function(){
    'use strict';

    var module = angular.module('std.display', []);

    module.factory('stdDisplay',
        [
            function() {
                this.setVisibility = function(element, canDisplay) {
                    if (!canDisplay)
                        element.html('');
                };

                return {
                    setVisibility: this.setVisibility
                }
            }
        ]);
})();