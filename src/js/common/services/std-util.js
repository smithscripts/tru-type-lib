(function(){
    'use strict';

    var module = angular.module('std.util', []);

    /**
     * @ngdoc service
     * @name std.util.service:stdUtil
     *
     * @description
     * Common functions
     *
     */
    module.factory('stdUtil',
        [
            function() {
                /**
                 * @ngdoc method
                 * @name getCursorPosition
                 * @methodOf std.util.service:stdUtil
                 *
                 * @description
                 * Returns the inputs cursor position.
                 *
                 *
                 * @param {DOMElement} element html input element.
                 * @returns {number} position of the cursor.
                 */
                this.getCursorPosition = function(element) {
                    var cursorPos = 0;
                    if (document.selection) {
                        element.focus();
                        var selection = document.selection.createRange();
                        selection.moveStart('character', -element.value.length);
                        cursorPos = selection.text.length;
                    }
                    else if (element.selectionStart || element.selectionStart == '0')
                        cursorPos = element.selectionStart;
                    return (cursorPos);
                };

                /**
                 * @ngdoc method
                 * @name getClosestParentByClass
                 * @methodOf std.util.service:stdUtil
                 *
                 * @description
                 * Returns the closest parent element by class name.
                 *
                 *
                 * @param {DOMElement} element any DOM element.
                 * @param {string} selector css class name of the element you what to find.
                 * @returns {DOMElement} returns a DOM element, else null if not found.
                 */
                this.getClosestParentByClass = function(element, selector) {
                    var firstChar = selector.charAt(0);
                    for (; element && element !== document; element = element.parentNode) {
                        if (firstChar === '.') {
                            if (element.classList.contains(selector.substr(1))) {
                                return element;
                            }
                        }
                    }
                    return null;
                };

                /**
                 * @ngdoc method
                 * @name isUndefined
                 * @methodOf std.util.service:stdUtil
                 *
                 * @description
                 * Returns whether a given property or variable is undefined.
                 *
                 *
                 * @param {object} entity property or variable.
                 * @returns {boolean} returns true if undefined.
                 */
                this.isUndefined = function(entity) {
                    return typeof entity === 'undefined'
                };

                /**
                 * @ngdoc method
                 * @name tryParseInt
                 * @methodOf std.util.service:stdUtil
                 *
                 * @description
                 * Attempts to parse a string into an integer.
                 * If the string is not parseable it returns the provided defaultValue.
                 *
                 * @param {string} str string to parse.
                 * @param {string} defaultValue the value to return if str is not parseable.
                 * @returns {boolean} returns an integer or the given default value.
                 */
                this.tryParseInt = function(str, defaultValue) {
                    var retValue = defaultValue;
                    if(str !== null) {
                        if(str.length > 0) {
                            if (!isNaN(str)) {
                                retValue = parseInt(str);
                            }
                        }
                    }
                    return retValue;
                };

                return {
                    getCursorPosition: this.getCursorPosition,
                    getClosestParentByClass: this.getClosestParentByClass,
                    isUndefined: this.isUndefined,
                    tryParseInt: this.tryParseInt
                }
            }
        ]);
})();