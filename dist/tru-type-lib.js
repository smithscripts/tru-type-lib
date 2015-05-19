var app = angular.module('tru.type.lib',
    [
        //Edit Controls
        'std.adorner.edit',
        'std.checkbox.edit',
        'std.date.edit',
        'std.datetime.edit',
        'std.datetime.span.edit',
        'std.decimal.edit',
        'std.time.edit',
        'std.dropdown.edit',
        'std.file.edit',
        'std.float.edit',
        'std.integer.edit',
        'std.link.edit',
        'std.masked.edit',
        'std.multiline.edit',
        'std.password.edit',
        'std.percent.edit',
        'std.text.edit',
        'std.textbox.edit',
        'std.usa.address.edit',
        'std.usa.dollar.edit',

        //Search Controls
        'std.checkbox.query',
        'std.date.query',
        'std.date.span.query',
        'std.date.range.query',
        'std.datetime.query',
        'std.datetime.range.query',
        'std.decimal.query',
        'std.dropdown.query',
        'std.float.query',
        'std.integer.query',
        'std.integer.range.query',
        'std.or.list.checkbox.query',
        'std.radio.list.button.query',
        'std.textbox.query',
        'std.usa.address.query',
        'std.usa.dollar.query',
        'std.boolean.dropdown.query',

        //List Controls
        'std.checkbox.list',
        'std.text.list',

        //Formatters
        'std.formatters',

        //Services
        'std.date',
        'std.time',
        'std.datetime',
        'std.calendar',
        'std.display',
        'std.decimal',
        'std.duration',
        'std.integer.only',
        'std.mask',
        'std.max',
        'std.file.change',
        'std.file.reader',
        'std.operator.lookup',
        'std.indeterminate',
        'std.grid.focus',
        'std.util',
        'std.download',
        'std.float',
        'std.usa.dollar',
        'std.select.value.converter'
    ]);
(function () {
    'use strict';

    var module = angular.module('std.formatters', []);

})();
(function () {
    'use strict';

    var module = angular.module('std.adorner.edit', []);

    module.controller('stdAdornerEditController', ['$scope',
        function ($scope) {

        }]);

    module.directive('stdAdornerEdit',
        ['$templateCache', '$compile', '$timeout', 'stdUtil',
            function ($templateCache, $compile, $timeout, stdUtil) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-adorner-edit.html'),
                    controller: 'stdAdornerEditController',
                    link: function (scope, element) {
                        var grid = stdUtil.getClosestParentByClass(element[0], '.ui-grid-render-container');
                        var cell = element.parent().parent();
                        var cellContent = element.parent();

                        scope.onFocus = function () {
                            cell.css('overflow', 'visible');
                            cellContent.css('overflow', 'visible');
                            var html = '<div class="ttl-adorner" style="position:relative;overflow:" tru-focus-first focus="true" tru-label-container><div style="position:absolute;z-index:1000;top:0;left:0;background:#fff;border:1px lightgray solid;width:inherit;padding:5px;"><std-usa-address-edit field="field"></std-usa-address-edit></div></div>';
                            element.html(html);
                            $compile(element.contents())(scope);

                            var inputs = element[0].querySelectorAll('input,select,textarea');
                            var lastInput = inputs[inputs.length - 1];
                            lastInput.onkeydown = function (e) {
                                e = e || window.event;
                                if (e.keyCode == 9) {
                                    grid.focus();
                                    cell.css('overflow', 'hidden');
                                    cellContent.css('overflow', 'hidden');
                                    element.remove();
                                }
                            }
                        }
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.checkbox.edit', []);

    module.directive('stdCheckboxEdit',
        ['$templateCache', 'stdDisplay', 'stdUtil',
            function ($templateCache, display, util) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: function(element) {
                        if (util.getClosestParentByClass(element[0], '.ui-grid-render-container')) {
                            return $templateCache.get('src/templates/list/std-checkbox-list-edit.html');
                        }
                        return $templateCache.get('src/templates/edit/std-checkbox-edit.html');
                    },
                    link: function (scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.date.edit', []);

    module.directive('stdDateEdit',
        ['$templateCache', '$timeout', '$document', 'stdDisplay',
            function($templateCache, $timeout, $document, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-date-edit.html'),
                    link: function(scope, element, attrs) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.datetime.edit', []);

    module.controller('stdDatetimeEditController', ['$scope',
        function ($scope) {
            $scope.setPeriod = function() {
                $scope.field.property.period = $scope.field.property.period === 'AM' ? 'PM' : 'AM';
            };
        }]);

    module.directive('stdDatetimeEdit',
        ['$templateCache', 'stdDisplay',
            function ($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-datetime-edit.html'),
                    controller: 'stdDatetimeEditController',
                    link: function (scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.datetime.span.edit', []);

    module.controller('stdDatetimeSpanEditController', ['$scope', '$timeout', '$element',
        function ($scope, $timeout, $element) {

        }]);

    module.directive('stdDatetimeSpanEdit',
        ['$templateCache', '$timeout', '$filter', 'stdDisplay',
            function ($templateCache, $timeout, $filter, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-datetime-span-edit.html'),
                    controller: 'stdDatetimeSpanEditController',
                    link: function (scope, element) {
                        var fields = element[0].querySelectorAll('input');

                        fields[0].addEventListener('blur', function (event) {
                            var startValue = scope.field.children.start.value.$;
                            var endValue = scope.field.children.end.value.$;
                            if (endValue && endValue instanceof Date && startValue && startValue instanceof Date) {
                                if (startValue > endValue) {
                                    $timeout(function () {
                                        fields[1].value = $filter('date')(startValue, 'MM/dd/yyyy hh:mm a');
                                    }, 0);
                                }
                            }
                        }, true);

                        fields[1].addEventListener('blur', function (event) {
                            var endValue = scope.field.children.end.value.$;
                            var startValue = scope.field.children.start.value.$;
                            if (startValue && startValue instanceof Date && endValue && endValue instanceof Date) {
                                if (startValue > endValue) {
                                    $timeout(function () {
                                        fields[0].value = $filter('date')(endValue, 'MM/dd/yyyy hh:mm a');
                                    }, 0);
                                }
                            }
                        }, true);

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.decimal.edit', []);

    module.directive('stdDecimalEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-decimal-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.dropdown.edit', []);

    module.controller('stdDropdownEditController', ['$scope',
        function ($scope) {
            var self = this;

            self.init = function () {
                $scope.data = {};
                $scope.field.queryChoices($scope).then(function (results) {
                    $scope.choices = [];
                    angular.forEach(results, function (value, key) {
                        $scope.choices.push(value);
                    });

                    if ($scope.field.type.isNullable)
                        $scope.choices.unshift({ label: ' ', value: { $: -1 } });

                    if ($scope.field.value.$)
                        $scope.data.value = $scope.field.value.$;

                    if ($scope.field.type.isNullable && !$scope.field.value.$)
                        $scope.data.value = $scope.choices[0].value.$;
                });
            };

            self.init();

            $scope.onChange = function () {
                if ($scope.data.value === -1)
                    $scope.field.value.$ = null;
                else
                    $scope.field.value.$ = $scope.data.value;
            };

            $scope.$watch('field.value.$', function () { self.init(); });
        }]);

    module.directive('stdDropdownEdit',
        ['$templateCache', 'stdDisplay',
            function ($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-dropdown-edit.html'),
                    controller: 'stdDropdownEditController',
                    link: function (scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.file.edit', []);

    module.controller('stdFileEditController', ['$scope', '$element', '$compile', 'stdFileReader',
        function ($scope, $element, $compile, fileReader) {
            var self = this;
            self.data = undefined;
            self.filename = undefined;
            self.mimeType = undefined;
            self.anchorElement = undefined;
            self.fileElement = undefined;
            self.renderElement = undefined;
            self.canvasElement = undefined;
            self.videoElement = undefined;

            self.setAnchorElement = function (anchorElement) {
                self.anchorElement = angular.element(anchorElement);
            };

            self.setFileElement = function (fileElement) {
                self.fileElement = angular.element(fileElement);
            };

            self.setRenderElement = function (renderElement) {
                self.renderElement = angular.element(renderElement);
            };

            self.clear = function () {
                if (!self.renderElement) return;
                self.renderElement.children().remove();
                $compile(self.renderElement.contents())($scope);
            };

            self.buildBase64 = function () {
                if (!self.data) return;
                var parts = self.data.split(',');
                if (parts.length === 2)
                    self.data = parts[1];
                return "data:" + self.mimeType + ";base64," + self.data;
            };

            self.appendCanvasElement = function () {
                self.renderElement.append(self.canvasElement);
                $compile(self.renderElement.contents())($scope);
            };

            self.appendVideoElement = function () {
                self.videoElement.setAttribute('src', self.data);
                self.videoElement.setAttribute('controls', 'controls');
                self.renderElement.append(self.videoElement);
                $compile(self.renderElement.contents())($scope);
            };

            self.loadImage = function () {
                var image = new Image();
                image.onload = function () {
                    self.canvasElement.height = image.height;
                    self.canvasElement.width = image.width;
                    self.canvasElement.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
                };
                image.src = self.data;
            };

            self.loadAppIcon = function (fileType) {
                var iconName = undefined;
                switch (self.mimeType.split('/')[1]) {
                    case 'msword':
                        iconName = 'ico-file-word';
                        break;
                    case 'vnd.ms-word.document.macroEnabled.12':
                        iconName = 'ico-file-word';
                        break;
                    case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                        iconName = 'ico-file-word';
                        break;
                    case 'pdf':
                        iconName = 'ico-file-pdf';
                        break;
                    case 'vnd.ms-powerpoint':
                        iconName = 'ico-file-powerpoint';
                        break;
                    case 'vnd.ms-powerpoint.presentation.macroEnabled.12':
                        iconName = 'ico-file-powerpoint';
                        break;
                    case 'vnd.openxmlformats-officedocument.presentationml.presentation':
                        iconName = 'ico-file-powerpoint';
                        break;
                    case 'x-msexcel':
                        iconName = 'ico-file-excel';
                        break;
                    case 'vnd.ms-excel.sheet.macroEnabled.12':
                        iconName = 'ico-file-excel';
                        break;
                    case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        iconName = 'ico-file-excel';
                        break;
                    case 'zip':
                        iconName = 'ico-file-zip';
                        break;
                    case 'text', 'plain':
                        iconName = 'ico-libreoffice';
                        break;
                    default:
                        iconName = 'ico-file';
                }

                var htmlIcon = '<i class="ttl-file-icon ' + iconName + '"></i>'
                self.renderElement.append(htmlIcon);
            };

            self.setType = function () {
                self.clear();
                self.data = self.buildBase64();

                var contentType = self.mimeType.split('/')[0];
                switch (contentType) {
                    case 'image':
                        self.canvasElement = document.createElement("canvas");
                        self.appendCanvasElement();
                        self.loadImage();
                        break;
                    case 'video':
                        self.videoElement = document.createElement("video");
                        self.appendVideoElement();
                        break;
                    case 'application':
                        self.loadAppIcon();
                        break;
                    case 'text':
                        self.loadAppIcon();
                        break;
                    default:
                        throw new Error('Unsupported Content Type');
                }

                if (!navigator.msSaveBlob) {
                    self.anchorElement[0].setAttribute('href', self.data);
                    self.anchorElement[0].setAttribute('download', self.filename);
                }
            };

            self.init = function () {
                $scope.noDataMessage = undefined;
                if (!self.renderElement ||!self.choices) return;
                if (!$scope.field.value.data) {
                    self.clear();
                    $scope.noDataMessage = 'No file uploaded';
                    return;
                }
                self.data = $scope.field.value.data;
                self.filename = $scope.field.children.filename.value.$;
                if ($scope.field.children.mimeType.value.$) {
                    self.mimeType = self.choices.filter(function (obj) {
                        return obj.value.$ === $scope.field.children.mimeType.value.$;
                    })[0].label;
                } else {
                    self.mimeType = 'text/plain';
                }

                self.setType();
            };

            self.getMimeTypes = function() {
                $scope.field.children.mimeType.queryChoices($scope).then(function (results) {
                    self.choices = results;
                    self.init();
                });
            };

            $scope.noDataMessage = undefined;

            $scope.upload = function () {
                self.fileElement[0].click();
            };

            $scope.download = function () {
                if (!navigator.msSaveBlob) return;
                var byteString = atob($scope.field.value.data);
                var buffer = new ArrayBuffer(byteString.length);
                var intArray = new Uint8Array(buffer);
                for (var i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }

                var blob = new Blob([buffer], {
                    type: self.mimeType
                });
                navigator.msSaveBlob(blob, self.filename);
            };

            $scope.fileChanged = function (e) {
                fileReader.read(e.target.files[0], $scope.field.type.property.allowed).then(function (response) {
                    response.mimeType = response.mimeType ? response.mimeType : 'text/plain';
                    var foundMimeType = self.choices.filter(function (obj) {
                        return obj.label.toLowerCase() === response.mimeType;
                    });
                    $scope.field.children.mimeType.value.$ = foundMimeType[0].value.$;

                    $scope.field.children.filename.value.$ = response.filename;
                    $scope.$apply(function() {
                        $scope.field.value.data = response.data.split(',')[1];
                    });
                    self.mimeType = response.mimeType;
                    self.filename = response.filename;
                    self.data = response.data.split(',')[1];
                    self.setType();
                });
            };

            $scope.$watch('field.value.data', function () { self.init(); });
        }]);

    module.directive('stdFileEdit',
        ['$templateCache', 'stdDisplay',
            function ($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    controller: 'stdFileEditController',
                    template: $templateCache.get('src/templates/edit/std-file-edit.html'),
                    link: function (scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                        var localCtrl = element.data('$stdFileEditController');
                        localCtrl.setAnchorElement(element[0].querySelectorAll('.anchorElement')[0]);
                        localCtrl.setFileElement(element[0].querySelectorAll('.fileElement')[0]);
                        localCtrl.setRenderElement(element[0].querySelectorAll('.renderElement')[0]);
                        localCtrl.getMimeTypes();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.float.edit', []);

    module.directive('stdFloatEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-float-edit.html'),
                    link: function(scope, element, attrs, ngModelCtrl) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.integer.edit', []);

    module.directive('stdIntegerEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-integer-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.link.edit', []);

    module.directive('stdLinkEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-link-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.masked.edit', []);

    module.directive('stdMaskedEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-masked-edit.html'),
                    link: function(scope, element) {
                        scope.data = { value: scope.field.value.$ };
                        scope.onChange = function() {
                            scope.field.value.$ = scope.data.value;
                        };
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.multiline.edit', []);

    module.directive('stdMultilineEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-multiline-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.password.edit', []);

    module.controller('stdPasswordEditController', ['$scope',
        function ($scope) {
            var self = this;
            self.maxLength = $scope.field.type.property.maxLength ? $scope.field.type.property.maxLength : 10;

            self.validate = function() {
                $scope.invalidMessage = '';

                if ($scope.data.password !== $scope.data.confirmPassword) {
                    $scope.invalidMessage = " 'Password' does not match.";
                    $scope.invalid = true;
                }
                if (!$scope.data.password) {
                    $scope.invalidMessage += " 'Password' is required.";
                    $scope.invalid = true;
                }
                if ($scope.data.password && !$scope.data.confirmPassword) {
                    $scope.invalidMessage += " 'Confirm Password' is required.";
                    $scope.invalid = true;
                }
                if ($scope.data.password && $scope.data.password.length > self.maxLength) {
                    $scope.invalidMessage += " 'Password' exceeds maximum character length of " + self.maxLength + ".";
                    $scope.invalid = true;
                }
                if ($scope.data.confirmPassword && $scope.data.confirmPassword.length > self.maxLength) {
                    $scope.invalidMessage += " 'Confirm Password' exceeds maximum character length of " + self.maxLength + ".";
                    $scope.invalid = true;
                }
                if (!$scope.invalidMessage) {
                    $scope.invalid = false;
                }
            };

            self.init = function() {
                $scope.data = {
                    password: $scope.field.value.$,
                    confirmPassword: $scope.field.value.$
                };
                self.validate();
            };

            self.init();

            $scope.mouseEnter = function () {
                $scope.mouseOver = true;
                self.validate();
            };
            $scope.mouseLeave = function () {
                $scope.mouseOver = false;
                self.validate();
            };

            $scope.onChange = function() {
                $scope.field.value.$ = $scope.data.password;
                self.validate();
            };

            $scope.onConfirmChange = function() {
                self.validate();
            };

            $scope.readOnlyPasswordPlaceHolder = undefined;
            $scope.passwordPlaceHolder = undefined;
            $scope.mouseOver = false;
            $scope.invalid = false;
            $scope.invalidMessage = undefined;

            $scope.$watch('field.editor.isEditing', function (isEditing) {
                $scope.readOnlyPasswordPlaceHolder = $scope.data.password ? 'Password Exists' : 'No Password Yet';
                $scope.passwordPlaceHolder = $scope.data.confirmPassword ? 'Password Exists, Change Password' : 'No Password Yet, Set New Password';
            });

            $scope.$watch('field.value.$', function () {
                if (!$scope.field.editor.isEditing)
                    self.init();
            });
        }]);

    module.directive('stdPasswordEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    controller: 'stdPasswordEditController',
                    template: $templateCache.get('src/templates/edit/std-password-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.percent.edit', []);

    module.directive('stdPercentEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-percent-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.text.edit', []);

    module.directive('stdTextEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-text-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.textbox.edit', []);

    /**
     * @ngdoc directive
     * @name std.textbox.edit.directive:stdTextboxEdit
     * @restrict E
     *
     * @description
     * Modifies the default behavior of the html A tag so that the default action is prevented when
     * the href attribute is empty.
     *
     * This change permits the easy creation of action links with the `ngClick` directive
     * without changing the location or causing page reloads, e.g.:
     * `<a href="" ng-click="list.addItem()">Add Item</a>`
     */
    module.directive('stdTextboxEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-textbox-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.time.edit', []);

    module.directive('stdTimeEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-time-edit.html'),
                    link: function(scope, element, attrs) {
                        scope.data = {period: scope.field.property.period};
                        scope.setPeriod = function() {
                            scope.field.property.period = scope.data.period === 'AM' ? 'PM' : 'AM';
                        };
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.usa.address.edit', []);

    module.directive('stdUsaAddressEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-usa-address-edit.html'),
                    link: {
                        pre: function (scope, element) {
                            scope.field.children.zip.property.entryFilter = scope.field.property.zipEntryFilter;
                            scope.field.children.zip.property.watermark = scope.field.property.zipWatermark;
                        },
                        post: function(scope, element) {
                            var stateLabel = angular.element(element[0].querySelectorAll('label')[4]);
                            var zipLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            stateLabel.addClass('ttl-no-label-width');
                            zipLabel.addClass('ttl-no-label-width');
                            display.setVisibility(element, scope.field.type.canDisplay);
                        }
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.usa.dollar.edit', []);

    module.directive('stdUsaDollarEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-usa-dollar-edit.html'),
                    link: function(scope, element, attrs, ngModelCtrl) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.checkbox.list', []);

    module.controller('stdCheckboxListController', ['$scope',
        function ($scope) {

        }]);

    module.directive('stdCheckboxList',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '='
                    },
                    template: $templateCache.get('src/templates/list/std-checkbox-list.html'),
                    controller: 'stdCheckboxListController',
                    link: function (scope, element) {
                        scope.data = { disabled: true };
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.text.list', []);

    module.directive('stdTextList',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/list/std-text-list.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.boolean.dropdown.query', []);

    module.controller('stdBooleanDropdownQueryController', ['$scope', 'stdOperatorLookup', 'stdUtil',
        function ($scope, operatorLookup, util) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;
                    if (typeof value !== 'undefined') {
                        queryPredicate.set('', operator, value);
                    } else {
                        queryPredicate.clear();
                    }
                }
            }();

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '';
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.choices = [
                { value: { $: undefined }, label: '' },
                { value: { $: true }, label: 'True' },
                { value: { $: false }, label: 'False' },
                { value: { $: 'null' }, label: 'Null' }
            ];
            $scope.data = { label: undefined };

            if (ctrlValueHasValue) {
                $scope.data.label = $scope.choices.filter(function (obj) {
                    return obj.value.$ === ctrlValue;
                })[0].label;
                $scope.field.value.$ = util.tryParseInt(ctrlValue, ctrlValue);
            }
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
            else
                $scope.field.value.$ = undefined;

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdBooleanDropdownQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-boolean-dropdown-query.html'),
                    controller: 'stdBooleanDropdownQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.checkbox.query', []);

    module.controller('stdCheckboxQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;
                    typeof value !== 'undefined' ? queryPredicate.set('', operator, value) : queryPredicate.clear();
                }
            }();

            $scope.data = { value: undefined };
            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === "undefined");
            };

            $scope.controlValueIsUndefined = function () {
                return typeof $scope.field === 'undefined' || (typeof $scope.field.value.$ === 'undefined');
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdCheckboxQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-checkbox-query.html'),
                    controller: 'stdCheckboxQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.date.query', []);

    module.controller('stdDateQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;

                    if (value) {
                        var predicates = [];
                        var startValue = new Date(value);
                        var endValue = new Date(value);
                        if (operator === 'eq') {
                            startValue.setHours(0,0,0,0);
                            endValue.setHours(23,59,59,999);
                            predicates.push(queryPredicate.create('', 'gt', startValue));
                            predicates.push(queryPredicate.create('', 'lt', endValue));
                            queryPredicate.set(predicates[0].and(predicates[1]));
                        }
                        if (operator === 'lt') {
                            startValue.setHours(0,0,0,0);
                            queryPredicate.set('', 'lt', startValue);
                        }
                        if (operator === 'gt') {
                            startValue.setHours(23,59,59,999);
                            queryPredicate.set('', 'gt', startValue);
                        }
                        if (operator === 'le') {
                            startValue.setHours(23,59,59,999);
                            queryPredicate.set('', 'le', startValue);
                        }
                        if (operator === 'ge') {
                            startValue.setHours(0,0,0,0);
                            queryPredicate.set('', 'ge', startValue);
                        }
                    } else {
                        queryPredicate.clear();
                    }
                }
            }();

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === "undefined");
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field.value.$ === 'undefined');
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdDateQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-date-query.html'),
                    controller: 'stdDateQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.date.range.query', []);

    module.controller('stdDateRangeQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlStartValue = $scope.field.property.startValue;
            var ctrlEndValue = $scope.field.property.endValue;
            var ctrlStartDefault = $scope.field.property.startDefault;
            var ctrlEndDefault = $scope.field.property.endDefault;
            var ctrlStartValueHasValue = typeof ctrlStartValue !== 'undefined';
            var ctrlStartDefaultHasValue = typeof ctrlStartDefault !== 'undefined';
            var ctrlEndValueHasValue = typeof ctrlEndValue !== 'undefined';
            var ctrlEndDefaultHasValue = typeof ctrlEndDefault !== 'undefined';

            var startDateInclusive = 'greater-than-or-equal'; //$scope.field.property.startInclusive;
            var endDateInclusive = 'less-than-or-equal'; //$scope.field.property.endInclusive;
            var startOperator = operatorLookup[startDateInclusive].operator;
            var endOperator = operatorLookup[endDateInclusive].operator;

            var onClearCB = function(){
                return function() {
                    if (!ctrlStartValueHasValue)
                        $scope.data.startDate = undefined;

                    if (!ctrlEndValueHasValue)
                        $scope.data.endDate = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (!ctrlStartValueHasValue) {
                        if (ctrlStartDefaultHasValue)
                            $scope.data.startDate = ctrlStartDefault;
                        else
                            $scope.data.startDate = undefined;
                    }

                    if (!ctrlEndValueHasValue) {
                        if (ctrlEndDefaultHasValue)
                            $scope.data.endDate = ctrlEndDefault;
                        else
                            $scope.data.endDate = undefined;
                    }
                }
            }();

            var onPredicateCB = function() {
                return function () {
                    var queryPredicate = $scope.field.queryPredicate;
                    var predicates = [];

                    if ($scope.data.startDate) {
                        var startValue = new Date($scope.data.startDate.toUTCString());
                        startValue.setHours(0,0,0,0);
                        predicates.push(queryPredicate.create('', startOperator, startValue));
                    }

                    if ($scope.data.endDate) {
                        var endValue = new Date($scope.data.endDate.toUTCString());
                        endValue.setHours(23,59,59,999);
                        predicates.push(queryPredicate.create('', endOperator, endValue));
                    }
                    if (predicates.length) {
                        var predicate = predicates[0];
                        if (predicates.length > 1)
                            predicate = predicate.and(predicates[1]);
                        queryPredicate.set(predicate);
                    } else
                        queryPredicate.clear();
                }
            }();

            $scope.data = {
                startDate: undefined,
                endDate: undefined
            };

            $scope.startOperatorImage = operatorLookup[startDateInclusive].operatorImage;
            $scope.startOperatorImageMessage = operatorLookup[startDateInclusive].operatorImageMessage;
            $scope.endOperatorImage = operatorLookup[endDateInclusive].operatorImage;
            $scope.endOperatorImageMessage = operatorLookup[endDateInclusive].operatorImageMessage;

            $scope.onStartOperatorClick = function() {
                if (ctrlStartValueHasValue || $scope.field.editor.isEditing) return;
                $scope.data.startDate = undefined;
            };

            $scope.onEndOperatorClick = function() {
                if (ctrlEndValueHasValue || $scope.field.editor.isEditing) return;
                $scope.data.endDate = undefined;
            };

            $scope.init = function() {
                if (ctrlStartValueHasValue)
                    $scope.data.startDate = ctrlStartValue;
                if (ctrlStartDefaultHasValue)
                    $scope.data.startDate = ctrlStartDefault;
                if (ctrlEndValueHasValue)
                    $scope.data.endDate = ctrlEndValue;
                if (ctrlEndDefaultHasValue)
                    $scope.data.endDate = ctrlEndDefault;

                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdDateRangeQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-date-range-query.html'),
                    controller: 'stdDateRangeQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.date.span.query', []);

    module.controller('stdDateSpanQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {

        }]);

    module.directive('stdDateSpanQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-date-span-query.html'),
                    controller: 'stdDateSpanQueryController',
                    link: {
                        pre: function (scope, element) {
                            scope.field.children.start.property.operator = 'greater-than-or-equal';
                            scope.field.children.end.property.operator = 'less-than-or-equal';
                            scope.field.children.start.property.default = scope.field.property.startDefault;
                            scope.field.children.end.property.default = scope.field.property.endDefault;
                        },
                        post: function (scope, element, attrs, searchGroupCtrl) {
                            var startLabel = angular.element(element[0].querySelectorAll('.tvl-container-dat-label')[1]);
                            var endLabel = angular.element(element[0].querySelectorAll('.tvl-container-dat-label')[2]);
                            startLabel.remove();
                            endLabel.remove();

                            var onPredicateCB = function () {
                                return function () {
                                    var predicates = [];
                                    var queryPredicate = scope.field.queryPredicate;

                                    var start = scope.field.children.start.value.$;
                                    var end = scope.field.children.end.value.$;

                                    if (start && end) {
                                        var startStartValue = new Date(start.toUTCString());
                                        var startEndValue = new Date(end.toUTCString());

                                        startStartValue.setHours(0,0,0,0);
                                        predicates.push(queryPredicate.create('Start', 'ge', startStartValue));
                                        startEndValue.setHours(23,59,59,999);
                                        predicates.push(queryPredicate.create('Start', 'le', startEndValue));

                                        if (predicates.length) {
                                            var predicate = undefined;
                                            for (var i = 0; i < predicates.length; i++) {
                                                if (i === 0) {
                                                    predicate = predicates[i];
                                                } else {
                                                    predicate = predicate.and(predicates[i]);
                                                }
                                            }
                                            queryPredicate.set(predicate);
                                        } else {
                                            queryPredicate.clear();
                                        }
                                    } else if (start) {
                                        var startStartValue = new Date(start.toUTCString());
                                        queryPredicate.set('Start', 'ge', startStartValue);
                                    } else if (end) {
                                        var startEndValue = new Date(end.toUTCString());
                                        queryPredicate.set('Start', 'le', startEndValue);
                                    } else {
                                        queryPredicate.clear();
                                    }

                                }
                            }();

                            searchGroupCtrl.registerPredicate(onPredicateCB);
                        }
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.datetime.query', []);

    module.controller('stdDatetimeQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === "undefined");
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field.value.$ === 'undefined');
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdDatetimeQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-datetime-query.html'),
                    controller: 'stdDatetimeQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.datetime.range.query', []);

    module.controller('stdDatetimeRangeQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlStartValue = $scope.field.property.startValue;
            var ctrlEndValue = $scope.field.property.endValue;
            var ctrlStartDefault = $scope.field.property.startDefault;
            var ctrlEndDefault = $scope.field.property.endDefault;
            var ctrlStartValueHasValue = typeof ctrlStartValue !== 'undefined';
            var ctrlStartDefaultHasValue = typeof ctrlStartDefault !== 'undefined';
            var ctrlEndValueHasValue = typeof ctrlEndValue !== 'undefined';
            var ctrlEndDefaultHasValue = typeof ctrlEndDefault !== 'undefined';

            var startDateInclusive = 'greater-than-or-equal'; //$scope.field.property.startInclusive;
            var endDateInclusive = 'less-than-or-equal'; //$scope.field.property.endInclusive;
            var startOperator = operatorLookup[startDateInclusive].operator;
            var endOperator = operatorLookup[endDateInclusive].operator;

            var onClearCB = function(){
                return function() {
                    if (!ctrlStartValueHasValue)
                        $scope.data.startDate = undefined;

                    if (!ctrlEndValueHasValue)
                        $scope.data.endDate = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (!ctrlStartValueHasValue) {
                        if (ctrlStartDefaultHasValue)
                            $scope.data.startDate = ctrlStartDefault;
                        else
                            $scope.data.startDate = undefined;
                    }

                    if (!ctrlEndValueHasValue) {
                        if (ctrlEndDefaultHasValue)
                            $scope.data.endDate = ctrlEndDefault;
                        else
                            $scope.data.endDate = undefined;
                    }
                }
            }();

            var onPredicateCB = function() {
                return function () {
                    var queryPredicate = $scope.field.queryPredicate;
                    var predicates = [];

                    if ($scope.data.startDate) {
                        predicates.push(queryPredicate.create('', startOperator, $scope.data.startDate));
                    }

                    if ($scope.data.endDate) {
                        predicates.push(queryPredicate.create('', endOperator, $scope.data.endDate));
                    }
                    if (predicates.length) {
                        var predicate = predicates[0];
                        if (predicates.length > 1)
                            predicate = predicate.and(predicates[1]);
                        queryPredicate.set(predicate);
                    } else
                        queryPredicate.clear();
                }
            }();

            $scope.data = {
                startDate: undefined,
                endDate: undefined
            };

            $scope.startOperatorImage = operatorLookup[startDateInclusive].operatorImage;
            $scope.startOperatorImageMessage = operatorLookup[startDateInclusive].operatorImageMessage;
            $scope.endOperatorImage = operatorLookup[endDateInclusive].operatorImage;
            $scope.endOperatorImageMessage = operatorLookup[endDateInclusive].operatorImageMessage;

            $scope.init = function() {
                if (ctrlStartValueHasValue)
                    $scope.data.startDate = ctrlStartValue;
                if (ctrlStartDefaultHasValue)
                    $scope.data.startDate = ctrlStartDefault;
                if (ctrlEndValueHasValue)
                    $scope.data.endDate = ctrlEndValue;
                if (ctrlEndDefaultHasValue)
                    $scope.data.endDate = ctrlEndDefault;

                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdDatetimeRangeQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-datetime-range-query.html'),
                    controller: 'stdDatetimeRangeQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();

(function(){
    'use strict';

    var module = angular.module('std.decimal.query', []);

    module.controller('stdDecimalQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;
                    value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
                }
            }();

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '' || $scope.field.value.$ === null;
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdDecimalQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-decimal-query.html'),
                    controller: 'stdDecimalQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.dropdown.query', []);

    module.controller('stdDropdownQueryController', ['$scope', 'stdOperatorLookup', 'stdUtil',
        function ($scope, operatorLookup, util) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;
                    if (typeof value !== 'undefined') {
                        queryPredicate.set('', operator, value);
                    } else {
                        queryPredicate.clear();
                    }
                }
            }();

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '';
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;


            $scope.data = {
                choices: [],
                label: undefined
            };

            if(ctrlValue === null) {
                $scope.data.label = 'Null';
                $scope.field.value.$ = null;
            } else {
                $scope.field.queryChoices($scope).then(function (results) {
                    $scope.data.choices = angular.copy(results);

                    $scope.data.choices.unshift({label: '', value: {$: undefined}});

                    if ($scope.field.type.isNullable) {
                        $scope.data.choices.push({label: 'Null', value: {$: 'null'}});
                    }

                    if (ctrlValueHasValue) {
                        $scope.data.label = $scope.data.choices.filter(function (obj) {
                            return obj.value.$ === ctrlValue;
                        })[0].label;
                        $scope.field.value.$ = util.tryParseInt(ctrlValue, ctrlValue);
                    } else if (ctrlDefaultHasValue)
                        $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                    else
                        $scope.field.value.$ = undefined;
                });
            }

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdDropdownQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-dropdown-query.html'),
                    controller: 'stdDropdownQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.float.query', []);

    module.controller('stdFloatQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;
                    value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
                }
            }();

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '' || $scope.field.value.$ === null;
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdFloatQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-float-query.html'),
                    controller: 'stdFloatQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.integer.query', []);

    module.controller('stdIntegerQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;
                    value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
                }
            }();

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '';
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdIntegerQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-integer-query.html'),
                    controller: 'stdIntegerQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.integer.range.query', []);

    module.controller('stdIntegerRangeQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var startValue = $scope.field.property.startValue;
            var endValue = $scope.field.property.endValue;
            var startDefault = $scope.field.property.startDefault;
            var endDefault = $scope.field.property.endDefault;
            var startInclusive = 'greater-than-or-equal'; //$scope.field.property.startInclusive;
            var endInclusive = 'less-than-or-equal'; //$scope.field.property.endInclusive;

            var onClearCB = function () {
                return function () {
                    $scope.data.startValue = undefined;
                    $scope.data.endValue = undefined;
                }
            }();

            var onDefaultCB = function () {
                return function () {
                    $scope.data.startValue = startDefault;
                    $scope.data.endValue = endDefault;
                }
            }();

            var startOperator = operatorLookup[startInclusive].operator;
            var endOperator = operatorLookup[endInclusive].operator;

            var onPredicateCB = function () {
                return function () {
                    var queryPredicate = $scope.field.queryPredicate;
                    var predicates = [];

                    if ($scope.data.startValue) {
                        predicates.push(queryPredicate.create('', startOperator, $scope.data.startValue));
                    }

                    if ($scope.data.endValue) {
                        predicates.push(queryPredicate.create('', endOperator, $scope.data.endValue));
                    }
                    if (predicates.length) {
                        var predicate = predicates[0];
                        if (predicates.length > 1)
                            predicate = predicate.and(predicates[1]);
                        queryPredicate.set(predicate);
                    } else
                        queryPredicate.clear();
                }
            }();

            $scope.data = {
                startValue: undefined,
                endValue: undefined
            };

            $scope.startOperatorImage = operatorLookup[startInclusive].operatorImage;
            $scope.startOperatorImageMessage = operatorLookup[startInclusive].operatorImageMessage;
            $scope.endOperatorImage = operatorLookup[endInclusive].operatorImage;
            $scope.endOperatorImageMessage = operatorLookup[endInclusive].operatorImageMessage;

            $scope.init = function () {
                if (startValue)
                    $scope.startValue = startValue;
                if (endValue)
                    $scope.endValue = endValue;
                if (startDefault)
                    $scope.startValue = startDefault;
                if (endDefault)
                    $scope.endValue = endDefault;

                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdIntegerRangeQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-integer-range-query.html'),
                    controller: 'stdIntegerRangeQueryController',
                    link: function (scope, element, attrs, searchGroupCtrl) {
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.or.list.checkbox.query', []);

    module.controller('stdOrListCheckboxQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value ? $scope.field.property.value : [];
            var ctrlDefault = $scope.field.property.default ? $scope.field.property.default : [];
            var ctrlValueHasValue = ctrlValue.length > 0;
            var ctrlDefaultHasValue = ctrlDefault.length > 0;
            var operator = operatorLookup[$scope.field.property.operator].operator;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    angular.forEach($scope.data.choices, function (choice) { choice.checked = false; });
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        angular.forEach($scope.data.choices, function (choice) {
                            choice.checked = ctrlDefault.indexOf(choice.value.$) !== -1;
                        });
                    else
                        angular.forEach($scope.data.choices, function (choice) { choice.checked = false; });
                }
            }();

            var onPredicateCB = function () {
                return function () {
                    var queryPredicate = $scope.field.queryPredicate;
                    var predicates = [];

                    angular.forEach($scope.data.choices, function (choice) {
                        if (choice.checked)
                            predicates.push(queryPredicate.create('', operator, choice.value.$));
                    });

                    if (predicates.length) {
                        var predicate = predicates[0];
                        for (var i = 1; i < predicates.length; i++) {
                            predicate = predicate.or(predicates[i]);
                        }
                        queryPredicate.set(predicate);
                    } else
                        queryPredicate.clear();
                }
            }();

            $scope.data = { choices: [], labels: [] };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return !ctrlValueHasValue;
            };

            $scope.onOperatorClick = function () {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                if ($scope.checked) {
                    angular.forEach($scope.data.choices, function (choice) {
                        choice.checked = false;
                    });
                } else {
                    angular.forEach($scope.data.choices, function (choice) {
                        choice.checked = true;
                    });
                }
            };

            $scope.$watch('data.choices', function () {
                $scope.checked = $scope.data.choices.filter(function (obj) {
                    return obj.checked === true
                }).length > 0;
            }, true);

            $scope.field.queryChoices($scope).then(function (results) {
                angular.forEach(results, function (choice) {
                    if (ctrlValueHasValue) {
                        if (ctrlValue.indexOf(choice.value.$) !== -1) {
                            $scope.data.labels.push(choice.label);
                            choice["checked"] = true;
                        }
                    } else if (ctrlDefaultHasValue) {
                        choice["checked"] = ctrlDefault.indexOf(choice.value.$) !== -1;
                    } else {
                        choice["checked"] = false;
                    }
                    $scope.data.choices.push(choice);
                });

                if ($scope.field.type.isNullable) {
                    $scope.data.choices.push({
                        checked: false,
                        label: 'Null',
                        value: { $: null }
                    })
                }
            });

            $scope.init = function () {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdOrListCheckboxQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-or-list-checkbox-query.html'),
                    controller: 'stdOrListCheckboxQueryController',
                    link: function (scope, element, attrs, searchGroupCtrl) {
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.percent.query', []);

    module.controller('stdPercentQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;
                    value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
                }
            }();

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '' || $scope.field.value.$ === null;
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdPercentQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-percent-query.html'),
                    controller: 'stdPercentQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.radio.list.button.query', []);

    module.controller('stdRadioListButtonQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value ? $scope.field.property.value : [];
            var ctrlDefault = $scope.field.property.default ? $scope.field.property.default : [];
            var ctrlValueHasValue = ctrlValue.length > 0;
            var ctrlDefaultHasValue = ctrlDefault.length > 0;
            var operator = operatorLookup[$scope.field.property.operator].operator;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    angular.forEach($scope.data.choices, function (choice) { choice.checked = false; });
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        angular.forEach($scope.data.choices, function (choice) {
                            choice.checked = ctrlDefault.indexOf(choice.value.$) !== -1;
                        });
                    else
                        angular.forEach($scope.data.choices, function (choice) { choice.checked = false; });
                }
            }();

            var onPredicateCB = function () {
                return function () {
                    var queryPredicate = $scope.field.queryPredicate;
                    var predicates = [];

                    angular.forEach($scope.data.choices, function (choice) {
                        if (choice.checked)
                            predicates.push(queryPredicate.create('', operator, choice.value.$));
                    });

                    if (predicates.length) {
                        var predicate = predicates[0];
                        for (var i = 1; i < predicates.length; i++) {
                            predicate = predicate.or(predicates[i]);
                        }
                        queryPredicate.set(predicate);
                    } else
                        queryPredicate.clear();
                }
            }();

            $scope.data = { choices: [], labels: [] };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return !ctrlValueHasValue;
            };

            $scope.onOperatorClick = function () {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                if ($scope.checked) {
                    angular.forEach($scope.data.choices, function (choice) {
                        choice.checked = false;
                    });
                }
            };

            $scope.$watch('data.choices', function () {
                $scope.checked = $scope.data.choices.filter(function (obj) {
                    return obj.checked === true
                }).length > 0;
            }, true);

            $scope.field.queryChoices($scope).then(function (results) {
                angular.forEach(results, function (choice) {
                    if (ctrlValueHasValue) {
                        if (ctrlValue.indexOf(choice.value.$) !== -1) {
                            $scope.data.labels.push(choice.label);
                            choice["checked"] = true;
                        }
                    } else if (ctrlDefaultHasValue) {
                        choice["checked"] = ctrlDefault.indexOf(choice.value.$) !== -1;
                    } else {
                        choice["checked"] = false;
                    }
                    $scope.data.choices.push(choice);
                });

                if ($scope.field.type.isNullable) {
                    $scope.data.choices.push({
                        checked: false,
                        label: 'Null',
                        value: { $: null }
                    })
                }
            });

            $scope.init = function () {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdRadioListButtonQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-radio-list-button-query.html'),
                    controller: 'stdRadioListButtonQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.textbox.query', []);

    module.controller('stdTextboxQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;
                    value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
                }
            }();

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined');
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdTextboxQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-textbox-query.html'),
                    controller: 'stdTextboxQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.usa.address.query', []);

    module.controller('stdUsaAddressQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {

        }]);

    module.directive('stdUsaAddressQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-usa-address-query.html'),
                    controller: 'stdUsaAddressQueryController',
                    link: {
                        pre: function (scope, element) {
                            scope.field.children.address1.property.operator = 'contains';
                            scope.field.children.address2.property.operator = 'contains';
                            scope.field.children.city.property.operator = 'contains';
                            scope.field.children.zip.property.operator = 'contains';
                            scope.field.children.zip.property.entryFilter = scope.field.property.zipEntryFilter;
                            scope.field.children.zip.property.watermark = scope.field.property.zipWatermark;
                        },
                        post: function (scope, element, attrs, searchGroupCtrl) {
                            var stateLabel = angular.element(element[0].querySelectorAll('label')[4]);
                            var zipLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            stateLabel.addClass('ttl-no-label-width');
                            zipLabel.addClass('ttl-no-label-width');

                            var onPredicateCB = function () {
                                return function () {
                                    var predicates = [];
                                    var queryPredicate = scope.field.queryPredicate;

                                    var address1 = scope.field.children.address1.value.$;
                                    if (typeof address1 !== 'undefined')
                                        predicates.push(queryPredicate.create('Address1', 'contains', address1));

                                    var address2 = scope.field.children.address2.value.$;
                                    if (typeof address2 !== 'undefined')
                                        predicates.push(queryPredicate.create('Address2', 'contains', address2));

                                    var city = scope.field.children.city.value.$;
                                    if (typeof city !== 'undefined')
                                        predicates.push(queryPredicate.create('City', 'contains', city));

                                    var state = scope.field.children.state.value.$;
                                    if (typeof state !== 'undefined' && state !== '')
                                        predicates.push(queryPredicate.create('StateStdUSAStateRef', 'eq', state));

                                    var zip = scope.field.children.zip.value.$;
                                    if (typeof zip !== 'undefined')
                                        predicates.push(queryPredicate.create('Zip', 'contains', zip));

                                    if (predicates.length) {
                                        var predicate = undefined;
                                        for (var i = 0; i < predicates.length; i++) {
                                            if (i === 0) {
                                                predicate = predicates[i];
                                            } else {
                                                predicate = predicate.and(predicates[i]);
                                            }
                                        }
                                        queryPredicate.set(predicate);
                                    } else
                                        queryPredicate.clear();
                                }
                            }();

                            searchGroupCtrl.registerPredicate(onPredicateCB);
                        }
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.usa.dollar.query', []);

    module.controller('stdUsaDollarQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;
                }
            }();

            var onPredicateCB = function() {
                return function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;
                    value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
                }
            }();

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '' || $scope.field.value.$ === null;
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.editor.isEditing) return;
                $scope.field.value.$ = undefined;
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                $scope.searchGroupCtrl.registerPredicate(onPredicateCB);
            }
        }]);

    module.directive('stdUsaDollarQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-usa-dollar-query.html'),
                    controller: 'stdUsaDollarQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.calendar', []);

    module.directive('stdCalendar',
        ['$compile', '$document', '$timeout',
            function ($compile, $document, $timeout) {
                return {
                    scope: {
                        display: '='
                    },
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var calDaysLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                        var calMonthsLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        var calDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                        var year = null;
                        var month = null;
                        var calendar = null;
                        var mouseOver = false;
                        var clonedScoped = null;

                        function isNumber(n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        }

                        var getCurrentYear = function() {
                            var today = new Date();
                            return today.getFullYear();
                        };

                        var getCurrentMonth = function() {
                            var today = new Date();
                            return today.getMonth();
                        };

                        var getParsedDate = function(unParsedDate) {
                            var parsedDate = unParsedDate.replace( /^\D+/g, '');
                            var month = parsedDate.substring(0,2) - 1;
                            var year = parsedDate.substring(6,10);
                            var date = {};
                            date.month = month;
                            date.year = year;
                            return date;
                        };

                        var setStartDate = function() {
                            var dateParts = element[0].value.split(/[\s]+/);
                            var date = dateParts[0] ? dateParts[0] : '';
                            dateParts = date.split(/[\/]+/);
                            var datePartsJoined = dateParts.join('');

                            var isNumeric = isNumber(datePartsJoined);
                            if (isNumeric) {
                                date = getParsedDate(date);
                                month = date.month;
                                year = date.year;
                            } else {
                                month = getCurrentMonth();
                                year = getCurrentYear();
                            }
                            var today = new Date();
                            return today.getMonth();
                        };

                        function zeroPad(num, places) {
                            var zero = places - num.toString().length + 1;
                            return Array(+(zero > 0 && zero)).join("0") + num;
                        }

                        var getHTML = function(){

                            // get first day of month
                            var firstDay = new Date(year, month, 1);
                            var startingDay = firstDay.getDay();

                            // find number of days in month
                            var monthLength = calDaysInMonth[month];

                            // compensate for leap year
                            if (0 == 1) { // February only!
                                if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
                                    monthLength = 29;
                                }
                            }

                            // do the header
                            var monthName = calMonthsLabels[month];
                            var html = '<table class="ttl-calendar-table" data-ng-mouseenter="onMouseEnter()" data-ng-mouseleave="onMouseLeave()">';
                            html += '<tr><th colspan="7"><button class="tvl-btn ttl-header-previous-button" data-ng-click="previous()">&#60;</button><div class="ttl-header-text">';
                            html +=  monthName + "&nbsp;" + year;
                            html += '</div><button class="tvl-btn ttl-header-next-button" data-ng-click="next()">&#62;</button></th></tr>';
                            html += '<tr class="ttl-calendar-header">';
                            for(var i = 0; i <= 6; i++ ){
                                html += '<td class="ttl-calendar-header-day">';
                                html += calDaysLabels[i];
                                html += '</td>';
                            }
                            html += '</tr><tr>';

                            // fill in the days
                            var day = 1;
                            // this loop is for is weeks (rows)
                            for (var i = 0; i < 9; i++) {
                                // this loop is for weekdays (cells)
                                for (var j = 0; j <= 6; j++) {
                                    html += '<td class="ttl-calendar-day"><div data-ng-class="{\'ttl-calendar-day-hover\': hover' + day + '}" data-ng-click="daySelected(' + day + ')" data-ng-mouseenter="hover' + day + ' = true" data-ng-mouseleave="hover' + day + ' = false"><p class="ttl-calendar-day-text">';
                                    if (day <= monthLength && (i > 0 || j >= startingDay)) {
                                        html += day;
                                        day++;
                                    }
                                    html += '</p></div></td>';
                                }
                                // stop making rows if we've run out of days
                                if (day > monthLength) {
                                    break;
                                } else {
                                    html += '</tr><tr>';
                                }
                            }
                            html += '</tr></table>';

                            return html;
                        };

                        $document.bind('mouseup', function() {
                            scope.$apply(function() {
                                if (!mouseOver && scope.display) {
                                    mouseOver = false;
                                    scope.display = false;
                                }
                            });
                        });

                        scope.$watch('display', function(val) {
                            if (val) {
                                setStartDate();
                                clonedScoped = scope.$new();
                                calendar = $compile(getHTML())(clonedScoped);
                                element.after(calendar);
                            } else if (!val && calendar){
                                mouseOver = false;
                                clonedScoped.$destroy();
                                calendar.remove();
                            }
                        });

                        scope.previous = function(day) {
                            calendar.remove();
                            if (month > 0) {
                                month--;
                            } else {
                                month = 11;
                                year--;
                            }
                            calendar = $compile(getHTML())(scope);
                            element.after(calendar);
                        };

                        scope.next = function(day) {
                            calendar.remove();
                            if (month < 11) {
                                month++;
                            } else {
                                month = 0;
                                year++;
                            }
                            calendar = $compile(getHTML())(scope);
                            element.after(calendar);
                        };


                        scope.onMouseEnter = function() {
                            mouseOver = true;
                        };

                        scope.onMouseLeave = function() {
                            mouseOver = false;
                        };

                        scope.daySelected = function(day) {
                            var dateParts = ngModelCtrl.$viewValue.split(/[\s]/);
                            if (typeof dateParts[1] === 'undefined' || typeof dateParts[2] === 'undefined') {
                                $timeout(function() {
                                    ngModelCtrl.$setViewValue(zeroPad(month + 1, 2) + '/' + zeroPad(day, 2) + '/' + zeroPad(year, 4));
                                    ngModelCtrl.$render();
                                }, 0);
                            } else {
                                $timeout(function() {
                                    ngModelCtrl.$setViewValue(zeroPad(month + 1, 2) + '/' + zeroPad(day, 2) + '/' + zeroPad(year, 4) + ' ' + dateParts[1] + ' ' + dateParts[2]);
                                    ngModelCtrl.$render();
                                }, 0);
                            }
                            scope.display = false;
                        };
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.date', []);

    module.directive('stdDate',
        ['$filter', '$timeout', 'stdUtil',
            function ($filter, $timeout, util) {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var format = 'MM/dd/yyyy';
                        var timeZone = 0;
                        var formatParts = format.split('/');
                        var position1Format = formatParts[0].toLowerCase();
                        var position2Format = formatParts[1].toLowerCase();
                        var position3Format = formatParts[2].toLowerCase();

                        var range1Start = 0;
                        var range1End = position1Format.length;
                        var range2Start = range1End + 1;
                        var range2End = range2Start + position2Format.length;
                        var range3Start = range2End + 1;
                        var range3End = range3Start + position3Format.length;

                        var range1 = createRange(range1Start, range1End);
                        var range2 = createRange(range2Start, range2End);
                        var range3 = createRange(range3Start, range3End);

                        var selectedRange = [];
                        var rangeInitialized = false;

                        var mouseDown = new Date().getTime(),
                            previousMouseDown = mouseDown;

                        var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1
                        || navigator.userAgent.toLowerCase().indexOf("trident") != -1);

                        function getCaretPosition() {
                            var caretPos = 0;   // IE Support
                            if (document.selection) {
                                element[0].focus();
                                var selection = document.selection.createRange();
                                selection.moveStart('character', -element[0].value.length);
                                caretPos = selection.text.length;
                            }
                            // Firefox support
                            else if (element[0].selectionStart || element[0].selectionStart == '0')
                                caretPos = element[0].selectionStart;
                            return (caretPos);
                        }

                        function createRange(start, end) {
                            var array = [];
                            for (var i = start; i <= end; i++) {
                                array.push(i);
                            }
                            return array;
                        }

                        function getSelectedText() {
                            return element[0].value.substring(selectedRange[0], selectedRange[selectedRange.length - 1]);
                        }

                        function replaceRange(s, start, end, substitute) {
                            return s.substring(0, start) + substitute + s.substring(end);
                        }

                        function zeroPad(num, places) {
                            var zero = places - num.toString().length + 1;
                            return Array(+(zero > 0 && zero)).join("0") + num;
                        }

                        function setValue(value) {
                            ngModelCtrl.$setViewValue(replaceRange(element[0].value, selectedRange[0], selectedRange[selectedRange.length - 1], value));
                            ngModelCtrl.$render();
                        }

                        function setRange(rangeStart, rangeEnd, rangeToSelect, ri) {
                            element[0].setSelectionRange(rangeStart, rangeEnd);
                            selectedRange = rangeToSelect;
                            rangeInitialized = ri;
                        }

                        function getCharFromKeyCode(e) {
                            if(e.keyCode >= 96 && e.keyCode <= 105)
                                return parseInt(String.fromCharCode(e.keyCode - 48));

                            return parseInt(String.fromCharCode(e.keyCode));
                        }

                        function isNumber(n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        }

                        element.bind('keydown', function(e) {
                            if (e.keyCode === 37) {
                                if (selectedRange === range3) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }
                            if (e.keyCode === 39 || e.keyCode === 191) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range3Start, range3End, range3, true);
                                }
                            }

                            if (e.keyCode === 8) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range3Start, range3End, range3, true);
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range3 && !isNaN(selectedText)) {
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2, true);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                            }

                            if (e.keyCode === 46) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range3Start, range3End, range3, true);
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && !isNaN(selectedText)) {
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }

                            if (e.keyCode === 9 && !e.shiftKey) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                } else if (selectedRange === range2) {
                                    setRange(range3Start, range3End, range3, true);
                                    e.preventDefault();
                                }
                            }
                            if (e.keyCode === 9 && e.shiftKey) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                    e.preventDefault();
                                } else if (selectedRange === range3) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                }
                            }

                            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                                var newValue,
                                    oldValue,
                                    selectedText = getSelectedText();

                                if (selectedText === '') return;

                                oldValue = parseInt(selectedText);
                                newValue = getCharFromKeyCode(e);

                                if (selectedRange === range1) {
                                    if (position1Format === 'mm') {
                                        if (oldValue === 1 && [0, 1, 2].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else if (oldValue === 0 && [1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else {
                                            if ((rangeInitialized || isNaN(oldValue)) && newValue <= 1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range1Start, range1End, range1, false);
                                            } else if (rangeInitialized && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range2Start, range2End, range2, true);
                                            }
                                            else {
                                                if ([4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                    setRange(range2Start, range2End, range2, false);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range3Start, range3End, range3, true);
                                                } else {
                                                    setRange(range2Start, range2End, range2, true);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range2Start, range2End, range2, false);
                                                }
                                            }
                                        }
                                    }
                                } else if (selectedRange === range2) {
                                    if (position2Format === 'dd') {
                                        if ([0, 1, 2].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range3Start, range3End, range3, true);
                                        } else if (oldValue === 3 && [0, 1].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range3Start, range3End, range3, true);
                                        } else if (oldValue === 3 && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setRange(range3Start, range3End, range3, true);
                                            setValue(zeroPad(newValue, 4));
                                            setRange(range3Start, range3End, range3, false);
                                        } else {
                                            if ((rangeInitialized || isNaN(oldValue))) {
                                                setValue('0' + newValue.toString());
                                                if ([4, 5, 6, 7, 8, 9].indexOf(newValue) > -1)
                                                    setRange(range3Start, range3End, range3, true);
                                                else
                                                    setRange(range2Start, range2End, range2, false);
                                            } else {
                                                setRange(range3Start, range3End, range3, true);
                                                setValue(zeroPad(newValue, 4));
                                                setRange(range3Start, range3End, range3, false);
                                            }
                                        }
                                    }
                                } else if (selectedRange === range3) {
                                    if (position3Format === 'yyyy') {
                                        if (rangeInitialized) {
                                            newValue = getCharFromKeyCode(e);
                                            var numberStr = newValue.toString();
                                            newValue = parseInt('200' + numberStr);
                                        } else if ([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009].indexOf(oldValue) > -1) {
                                            newValue = getCharFromKeyCode(e);
                                            var numberStr = newValue.toString();
                                            newValue = parseInt('20' + (oldValue % 10).toString() + numberStr);
                                        } else if (!isNaN(newValue) && selectedText.length >= 4) {
                                            var trimmedOldValue = selectedText.substring(1);
                                            newValue = trimmedOldValue + getCharFromKeyCode(e).toString();
                                        }
                                        setValue(zeroPad(newValue, 4));
                                        setRange(range3Start, range3End, range3, false);
                                    }
                                }
                            }
                            if (e.keyCode !== 9)
                                e.preventDefault();

                        });

                        element.bind('mouseup', function(e){
                            var caretPosition = getCaretPosition();
                            var sel = window.getSelection();
                            sel.removeAllRanges();

                            if (range1.indexOf(caretPosition) > -1)
                                setRange(range1Start, range1End, range1, true);

                            if (range2.indexOf(caretPosition) > -1)
                                setRange(range2Start, range2End, range2, true);

                            if (range3.indexOf(caretPosition) > -1)
                                setRange(range3Start, range3End, range3, true);
                        });

                        element.bind('mousemove', function(e){
                            if(e.stopPropagation) e.stopPropagation();
                            if(e.preventDefault) e.preventDefault();
                            e.cancelBubble = true;
                            e.returnValue = false;
                            return false;
                        });

                        element.bind('mousedown', function(e){
                            var time = new Date().getTime();

                            if((time - mouseDown) < 450)
                            {
                                previousMouseDown = mouseDown;
                                mouseDown = time;

                                e.preventDefault();
                                return false;
                            }

                            previousMouseDown = mouseDown;
                            mouseDown = time;
                        });

                        element.bind('copy', function(e) {
                            var textToPutOnClipboard = element[0].value;

                            if (isIe) {
                                window.clipboardData.setData('Text', textToPutOnClipboard);
                            } else {
                                e.clipboardData.setData('text/plain', textToPutOnClipboard);
                            }
                            e.preventDefault();
                        });

                        element.bind('cut', function(e){
                            e.preventDefault();
                        });

                        element.bind('paste', function(e){
                            e.preventDefault();
                        });

                        element.bind('focus', function(e){
                            $timeout(function() {
                                setRange(range1Start, range1End, range1, true);
                            }, 0)
                        });

                        element.bind('blur', function(e){
                            if (ngModelCtrl.$modelValue === null)
                                element[0].value = 'mm/dd/yyyy';
                        });

                        element.addClass('ttl-date-selection');

                        ngModelCtrl.$formatters.push(function (val) {
                            ngModelCtrl.$setValidity('invalid-date', true);
                            var date = Date.parse(val);
                            if (!isNaN(date)) {
                                var utc = new Date(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate());
                                return $filter('date')(utc, 'MM/dd/yyyy');
                            } else {
                                return 'mm/dd/yyyy';
                            }
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if (val === 'mm/dd/yyyy') {
                                ngModelCtrl.$setValidity('invalid-date', true);
                                return null;
                            }

                            var dateParts = val.split(/[\/]+/);
                            var datePartsJoined = dateParts.join('');
                            var isNumeric = isNumber(datePartsJoined);
                            if (!isNumeric) {
                                ngModelCtrl.$setValidity('invalid-date', false);
                                return new Date('Invalid');
                            }

                            var year = parseInt(dateParts[2]);
                            var month = parseInt(dateParts[0]);
                            var day = parseInt(dateParts[1]);
                            var feb = year % 4 === 0 && (year % 100 || year % 400 === 0) ? 29 : 28;
                            var monthDays = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                            var numberOfDays = monthDays[month - 1];
                            day = (numberOfDays - day) >= 0 ? day : numberOfDays;
                            if (day !== parseInt(dateParts[1])) {
                                ngModelCtrl.$setViewValue(dateParts[0] + '/' + zeroPad(day, 2) + '/' + dateParts[2]);
                            }
                            ngModelCtrl.$setValidity('invalid-date', true);
                            return new Date(year, (month - 1), day);
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.datetime', []);

    module.directive('stdDatetime',
        ['$filter', '$timeout',
            function ($filter, $timeout) {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var format = 'MM/dd/yyyy hh:mm a';
                        var timeZone = 0;
                        var formatParts = format.split(/[\s/:]+/);
                        var position1Format = formatParts[0].toLowerCase();
                        var position2Format = formatParts[1].toLowerCase();
                        var position3Format = formatParts[2].toLowerCase();
                        var position4Format = formatParts[3].toLowerCase();
                        var position5Format = formatParts[4].toLowerCase();
                        var position6Format = formatParts[5].toLowerCase();

                        //1
                        var range1Start = 0;
                        var range1End = position1Format.length;
                        //2
                        var range2Start = range1End + 1;
                        var range2End = range2Start + position2Format.length;
                        //3
                        var range3Start = range2End + 1;
                        var range3End = range3Start + position3Format.length;
                        //4
                        var range4Start = range3End + 1;
                        var range4End = range4Start + position4Format.length;
                        //5
                        var range5Start = range4End + 1;
                        var range5End = range5Start + position5Format.length;
                        //6
                        var range6Start = range5End + 1;
                        var range6End = range6Start + 2;

                        var range1 = createRange(range1Start, range1End);
                        var range2 = createRange(range2Start, range2End);
                        var range3 = createRange(range3Start, range3End);
                        var range4 = createRange(range4Start, range4End);
                        var range5 = createRange(range5Start, range5End);
                        var range6 = createRange(range6Start, range6End);

                        var selectedRange = [];
                        var rangeInitialized = false;
                        var militaryTime = false; //scope.stdTime.property.militaryTime;

                        var mouseDown = new Date().getTime(),
                            previousMouseDown = mouseDown;

                        var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1
                        || navigator.userAgent.toLowerCase().indexOf("trident") != -1);

                        function getCaretPosition() {
                            var caretPos = 0;   // IE Support
                            if (document.selection) {
                                element[0].focus();
                                var selection = document.selection.createRange();
                                selection.moveStart('character', -element[0].value.length);
                                caretPos = selection.text.length;
                            }
                            // Firefox support
                            else if (element[0].selectionStart || element[0].selectionStart == '0')
                                caretPos = element[0].selectionStart;
                            return (caretPos);
                        }

                        function createRange(start, end) {
                            var array = [];
                            for (var i = start; i <= end; i++) {
                                array.push(i);
                            }
                            return array;
                        }

                        function getSelectedText() {
                            return element[0].value.substring(selectedRange[0], selectedRange[selectedRange.length - 1]);
                        }

                        function replaceRange(s, start, end, substitute) {
                            return s.substring(0, start) + substitute + s.substring(end);
                        }

                        function zeroPad(num, places) {
                            var zero = places - num.toString().length + 1;
                            return Array(+(zero > 0 && zero)).join("0") + num;
                        }

                        function setValue(value) {
                            ngModelCtrl.$setViewValue(replaceRange(element[0].value, selectedRange[0], selectedRange[selectedRange.length - 1], value));
                            ngModelCtrl.$render();
                        }

                        function setRange(rangeStart, rangeEnd, rangeToSelect, ri) {
                            element[0].setSelectionRange(rangeStart, rangeEnd);
                            selectedRange = rangeToSelect;
                            rangeInitialized = ri;
                        }

                        function getCharFromKeyCode(e) {
                            if(e.keyCode >= 96 && e.keyCode <= 105)
                                return parseInt(String.fromCharCode(e.keyCode - 48));

                            return parseInt(String.fromCharCode(e.keyCode));
                        }

                        function isNumber(n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        }

                        element.bind('keydown', function(e) {
                            if (e.keyCode === 37) {
                                if (selectedRange === range6) {
                                    setRange(range5Start, range5End, range5, true);
                                } else if (selectedRange === range5) {
                                    setRange(range4Start, range4End, range4, true);
                                } else if (selectedRange === range4) {
                                    setRange(range3Start, range3End, range3, true);
                                } else if (selectedRange === range3) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }
                            if (e.keyCode === 39 || e.keyCode === 191) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range3Start, range3End, range3, true);
                                } else if (selectedRange === range3) {
                                    setRange(range4Start, range4End, range4, true);
                                } else if (selectedRange === range4) {
                                    setRange(range5Start, range5End, range5, true);
                                } else if (selectedRange === range5) {
                                    setRange(range6Start, range6End, range6, true);
                                }
                            }

                            if (e.keyCode === 8) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range6Start, range6End, range6, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range3 && !isNaN(selectedText)) {
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2, true);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range4 && !isNaN(selectedText)) {
                                    setValue(position4Format);
                                    setRange(range4Start, range4End, range4, true);
                                }
                                else if (selectedRange === range4 && isNaN(selectedText)) {
                                    setRange(range3Start, range3End, range3, true);
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range5 && !isNaN(selectedText)) {
                                    setValue(position5Format);
                                    setRange(range5Start, range5End, range5, true);
                                }
                                else if (selectedRange === range5 && isNaN(selectedText)) {
                                    setRange(range4Start, range4End, range4, true);
                                    setValue(position4Format);
                                    setRange(range4Start, range4End, range4, true);
                                }
                                else if (selectedRange === range6) {
                                    setRange(range5Start, range5End, range5, true);
                                }
                            }

                            if (e.keyCode === 46) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range3Start, range3End, range3, true);
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && !isNaN(selectedText)) {
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && isNaN(selectedText)) {
                                    setRange(range4Start, range4End, range4, true);
                                    setValue(position4Format);
                                    setRange(range4Start, range4End, range4, true);
                                }
                                else if (selectedRange === range4 && !isNaN(selectedText)) {
                                    setValue(position4Format);
                                    setRange(range4Start, range4End, range4, true);
                                }
                                else if (selectedRange === range4 && isNaN(selectedText)) {
                                    setRange(range5Start, range5End, range5, true);
                                    setValue(position5Format);
                                    setRange(range5Start, range5End, range5, true);
                                }
                                else if (selectedRange === range5 && !isNaN(selectedText)) {
                                    setValue(position5Format);
                                    setRange(range5Start, range5End, range5, true);
                                }
                                else if (selectedRange === range5 && isNaN(selectedText)) {
                                    setRange(range6Start, range6End, range6, true);
                                }
                            }

                            if (e.keyCode === 9 && !e.shiftKey) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                } else if (selectedRange === range2) {
                                    setRange(range3Start, range3End, range3, true);
                                    e.preventDefault();
                                } else if (selectedRange === range3) {
                                    setRange(range4Start, range4End, range4, true);
                                    e.preventDefault();
                                } else if (selectedRange === range4) {
                                    setRange(range5Start, range5End, range5, true);
                                    e.preventDefault();
                                } else if (selectedRange === range5) {
                                    setRange(range6Start, range6End, range6, true);
                                    e.preventDefault();
                                }
                            }
                            if (e.keyCode === 9 && e.shiftKey) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                    e.preventDefault();
                                } else if (selectedRange === range3) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                } else if (selectedRange === range4) {
                                    setRange(range3Start, range3End, range3, true);
                                    e.preventDefault();
                                } else if (selectedRange === range5) {
                                    setRange(range4Start, range4End, range4, true);
                                    e.preventDefault();
                                } else if (selectedRange === range6) {
                                    setRange(range5Start, range5End, range5, true);
                                    e.preventDefault();
                                }
                            }

                            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                                var newValue,
                                    oldValue,
                                    selectedText = getSelectedText();

                                if (selectedText === '') return;

                                oldValue = parseInt(selectedText);
                                newValue = getCharFromKeyCode(e);

                                if (selectedRange === range1) {
                                    if (position1Format === 'mm') {
                                        if (oldValue === 1 && [0, 1, 2].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else if (oldValue === 0 && [1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else {
                                            if ((rangeInitialized || isNaN(oldValue)) && newValue <= 1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range1Start, range1End, range1, false);
                                            } else if (rangeInitialized && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range2Start, range2End, range2, true);
                                            }
                                            else {
                                                if ([4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                    setRange(range2Start, range2End, range2, false);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range3Start, range3End, range3, true);
                                                } else {
                                                    setRange(range2Start, range2End, range2, true);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range2Start, range2End, range2, false);
                                                }
                                            }
                                        }
                                    }
                                } else if (selectedRange === range2) {
                                    if (position2Format === 'dd') {
                                        if ([0, 1, 2].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range3Start, range3End, range3, true);
                                        } else if (oldValue === 3 && [0, 1].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range3Start, range3End, range3, true);
                                        } else if (oldValue === 3 && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setRange(range3Start, range3End, range3, true);
                                            setValue(zeroPad(newValue, 4));
                                            setRange(range3Start, range3End, range3, false);
                                        } else {
                                            if ((rangeInitialized || isNaN(oldValue))) {
                                                setValue('0' + newValue.toString());
                                                if ([4, 5, 6, 7, 8, 9].indexOf(newValue) > -1)
                                                    setRange(range3Start, range3End, range3, true);
                                                else
                                                    setRange(range2Start, range2End, range2, false);
                                            } else {
                                                setRange(range3Start, range3End, range3, true);
                                                setValue(zeroPad(newValue, 4));
                                                setRange(range3Start, range3End, range3, false);
                                            }
                                        }
                                    }
                                } else if (selectedRange === range3) {
                                    if (position3Format === 'yyyy') {
                                        if (rangeInitialized) {
                                            newValue = getCharFromKeyCode(e);
                                            var numberStr = newValue.toString();
                                            newValue = parseInt('200' + numberStr);
                                        } else if ([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009].indexOf(oldValue) > -1) {
                                            newValue = getCharFromKeyCode(e);
                                            var numberStr = newValue.toString();
                                            newValue = parseInt('20' + (oldValue % 10).toString() + numberStr);
                                        } else if (!isNaN(newValue) && selectedText.length >= 4) {
                                            var trimmedOldValue = selectedText.substring(1);
                                            newValue = trimmedOldValue + getCharFromKeyCode(e).toString();
                                        }
                                        setValue(zeroPad(newValue, 4));
                                        setRange(range3Start, range3End, range3, false);
                                    }
                                } else if (selectedRange === range4) {
                                    if (position4Format === 'hh') {
                                        if ([0].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range5Start, range5End, range5, true);
                                        } else if ([1].indexOf(oldValue) > -1 && [0, 1, 2].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range5Start, range5End, range5, true);
                                        } else if (militaryTime && oldValue === 1 && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range5Start, range5End, range5, true);
                                        } else if (militaryTime && oldValue === 2 && [1, 2, 3].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range5Start, range5End, range5, true);
                                        } else {
                                            if (rangeInitialized || isNaN(oldValue)) {
                                                setValue('0' + newValue.toString());
                                                if ([0, 1].indexOf(newValue) > -1 || (militaryTime && [0, 1, 2].indexOf(newValue) > -1))
                                                    setRange(range4Start, range4End, range4, false);
                                                else
                                                    setRange(range5Start, range5End, range5, true);
                                            }
                                            else {
                                                if (!militaryTime && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 ) {
                                                    setRange(range5Start, range5End, range5, true);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range5Start, range5End, range5, false);
                                                }
                                                else if (militaryTime && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                    setValue('0' + newValue.toString());
                                                    setRange(range5Start, range5End, range5, true);
                                                } else {
                                                    setValue('0' + newValue.toString());
                                                    setRange(range4Start, range4End, range4, true);
                                                }
                                            }
                                        }
                                    }
                                } else if (selectedRange === range5) {
                                    if (position5Format === 'mm') {
                                        if ([0, 1, 2, 3, 4, 5].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range6Start, range6End, range6, true);
                                        } else {
                                            setValue('0' + newValue.toString());
                                            setRange(range5Start, range5End, range5, false);
                                        }
                                    }
                                }
                            }

                            if (selectedRange === range6) {
                                var oldValue = getSelectedText();
                                if (e.keyCode === 65) {
                                    setValue('AM');
                                }
                                if (e.keyCode === 80) {
                                    setValue('PM');
                                }
                                if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 32) {
                                    setValue(oldValue.toString() === 'AM' ? 'PM' : 'AM');
                                }
                                setRange(range6Start, range6End, range6, false);
                            }

                            if (e.keyCode !== 9)
                                e.preventDefault();

                        });

                        element.bind('mouseup', function(e){
                            var caretPosition = getCaretPosition();
                            var sel = window.getSelection();
                            sel.removeAllRanges();

                            if (range1.indexOf(caretPosition) > -1)
                                setRange(range1Start, range1End, range1, true);

                            if (range2.indexOf(caretPosition) > -1)
                                setRange(range2Start, range2End, range2, true);

                            if (range3.indexOf(caretPosition) > -1)
                                setRange(range3Start, range3End, range3, true);

                            if (range4.indexOf(caretPosition) > -1)
                                setRange(range4Start, range4End, range4, true);

                            if (range5.indexOf(caretPosition) > -1)
                                setRange(range5Start, range5End, range5, true);

                            if (range6.indexOf(caretPosition) > -1)
                                setRange(range6Start, range6End, range6, true);
                        });

                        element.bind('mousemove', function(e){
                            if(e.stopPropagation) e.stopPropagation();
                            if(e.preventDefault) e.preventDefault();
                            e.cancelBubble = true;
                            e.returnValue = false;
                            return false;
                        });

                        element.bind('mousedown', function(e){
                            var time = new Date().getTime();

                            if((time - mouseDown) < 450)
                            {
                                previousMouseDown = mouseDown;
                                mouseDown = time;

                                e.preventDefault();
                                return false;
                            }

                            previousMouseDown = mouseDown;
                            mouseDown = time;
                        });

                        element.bind('copy', function(e) {
                            var textToPutOnClipboard = element[0].value;

                            if (isIe) {
                                window.clipboardData.setData('Text', textToPutOnClipboard);
                            } else {
                                e.clipboardData.setData('text/plain', textToPutOnClipboard);
                            }
                            e.preventDefault();
                        });

                        element.bind('cut', function(e){
                            e.preventDefault();
                        });

                        element.bind('paste', function(e){
                            e.preventDefault();
                        });

                        element.bind('focus', function(e){
                            $timeout(function() {
                                setRange(range1Start, range1End, range1, true);
                            }, 0)
                        });

                        element.bind('blur', function(e){
                            if (ngModelCtrl.$modelValue === null)
                                element[0].value = 'mm/dd/yyyy hh:mm AM';
                        });

                        element.addClass('ttl-date-selection');

                        ngModelCtrl.$formatters.push(function (val) {
                            ngModelCtrl.$setValidity('invalid-date', true);
                            var date = Date.parse(val);
                            if (!isNaN(date)) {
                                var utc = new Date(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), val.getUTCSeconds());
                                return $filter('date')(utc, 'MM/dd/yyyy hh:mm a');
                            } else {
                                return 'mm/dd/yyyy hh:mm AM';
                            }
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if (val === 'mm/dd/yyyy hh:mm AM') {
                                ngModelCtrl.$setValidity('invalid-date', true);
                                return null;
                            }

                            var dateParts = val.split(/[\s/:]+/);
                            var period = dateParts[5];
                            dateParts.pop();
                            var datePartsJoined = dateParts.join('');
                            var isNumeric = isNumber(datePartsJoined);
                            if (!isNumeric) {
                                ngModelCtrl.$setValidity('invalid-date', false);
                                return new Date('Invalid');
                            }

                            var year = parseInt(dateParts[2]);
                            var month = parseInt(dateParts[0]);
                            var day = parseInt(dateParts[1]);
                            var feb = year % 4 === 0 && (year % 100 || year % 400 === 0) ? 29 : 28;
                            var monthDays = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                            var numberOfDays = monthDays[month - 1];
                            day = (numberOfDays - day) >= 0 ? day : numberOfDays;
                            if (day !== parseInt(dateParts[1])) {
                                ngModelCtrl.$setViewValue(dateParts[0] + '/' + zeroPad(day, 2) + '/' + dateParts[2] + ' ' + dateParts[3] + ':' + dateParts[4] + ' ' + period);
                            }

                            var date = val.replace(/AM||PM/g,'');
                            date = new Date(date);

                            if (!militaryTime) {
                                var hours = parseInt(dateParts[3]);
                                if (period ==='AM' && hours === 12) {
                                    hours = 0;
                                } else if (period === 'PM' && hours < 12) {
                                    hours += 12;
                                }
                                date.setHours(hours);
                            }

                            ngModelCtrl.$setValidity('invalid-date', true);
                            return date;
                        });

                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.decimal', []);

    module.directive('stdDecimal',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdDecimal: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdDecimal.type.isNullable;
                        var decimalPlaces = scope.stdDecimal.type.property.decimalPlaces;

                        if (typeof decimalPlaces === 'undefined')
                            decimalPlaces = 0;

                        var wholePlaces = 38 - decimalPlaces;

                        ngModelCtrl.$formatters.push(function (val) {
                            return val;
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            var number = Number(val).toPrecision();

                            var numericParts = String(val).split('.');

                            if (numericParts.length >= 2) {
                                var wholeNumberPrecision = numericParts[0].length > wholePlaces;
                                var fractionalNumberPrecision = numericParts[1].length > decimalPlaces;
                            } else {
                                wholeNumberPrecision = numericParts[0].length > wholePlaces;
                            }

                            if (number === 'NaN' || wholeNumberPrecision || fractionalNumberPrecision) {
                                var allParts = String(val).split('');
                                var isNegative = allParts[0] === '-' ? true : false;
                                var numericParts = String(val).split('.');
                                var clean = '';

                                if (numericParts.length >= 2) {
                                    var wholeNumber = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                    var fractionalNumber = numericParts[1].toString().replace(/[^0-9]+/g, '').substring(0, decimalPlaces);
                                    clean = wholeNumber + '.' + fractionalNumber;
                                } else {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                }

                                if (val !== clean) {
                                    if (isNegative)
                                        clean = '-' + clean;

                                    if (ngModelCtrl.$viewValue !== clean) {
                                        var start = element[0].selectionStart;
                                        var end = element[0].selectionEnd + clean.length - val.length;
                                        ngModelCtrl.$setViewValue(clean);
                                        ngModelCtrl.$render();
                                        element[0].setSelectionRange(start, end);
                                    }
                                }

                                if (!isNaN(ngModelCtrl.$modelValue)) {
                                    return +ngModelCtrl.$modelValue;
                                } else {
                                    if (isNullable)
                                        return null;
                                    else
                                        return undefined;
                                }
                            } else if (val === '') {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else {
                                return +number;
                            }
                        });

                        element.bind('blur', function (event) {
                            if (element.val() === '') return;
                            var numericParts = element.val().split('.');
                            var whole = '';
                            var fraction = '';
                            if (numericParts.length >= 2) {
                                if (numericParts[0] === '-') {
                                    whole = '-0';
                                } else {
                                    whole = numericParts[0] === '' ? '0' : numericParts[0].toString().replace(/[^0-9]+/g, '');
                                }
                                fraction = numericParts[1] === '' ? '0' : numericParts[1].toString().replace(/[^0-9]+/g, '');
                                element.val(whole + '.' + fraction);
                            } else
                                element.val(element.val() + '.0');
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();
(function(){
    'use strict';

    var module = angular.module('std.download', []);

    module.directive('stdDownload',
        ['$templateCache', '$sce',
            function($templateCache, $sce) {
                return {
                    restrict: 'E',
                    scope: {
                        url: '=',
                        refs: '='
                    },
                    template: $templateCache.get('src/templates/common/download.html'),
                    link: function(scope, element, attrs) {
                        scope.data = {
                            url: undefined,
                            refs: undefined
                        };
                        scope.$watch('url', function(newValue) {
                            if (newValue) {
                                scope.data.url = $sce.trustAsResourceUrl(scope.url);
                                scope.data.refs = scope.refs;
                                element[0].submit();
                            }
                        });
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.duration', []);

    module.directive('stdDuration',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdDurationPeriod: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var lastValidInput = undefined;
                        var fromIsoDuration = function (value) {
                            var result = {};
                            var duration = value.match(/^P([0-9]+Y|)?([0-9]+M|)?([0-9]+D|)?T?([0-9]+H|)?([0-9]+M|)?([0-9]+S|)?$/);

                            if (duration) {
                                var militaryHours = parseInt(duration[4] ? duration[4] : 0);
                                result.years = parseInt(duration[1]);
                                result.months = parseInt(duration[2]);
                                result.days = parseInt(duration[3]);
                                result.hours = militaryHours > 12 ? militaryHours - 12 : militaryHours;
                                result.hours = militaryHours === 0 ? 12 : result.hours;
                                result.minutes = parseInt(duration[5] ? duration[5] : 0);
                                result.seconds = parseInt(duration[6]);
                                result.period = militaryHours >= 12 ? 'PM' : 'AM';
                                return result;
                            } else {
                                throw new Error('Invalid Format');
                            }
                        };

                        var prependZero = function (val) {
                            if (val.toString().length === 1)
                                val = '0' + val;
                            return val;
                        };

                        var setViewValue = function () {
                            var val = element[0].value;
                            var timeParts = val.split(":");
                            var hours = timeParts[0];
                            var minutes = timeParts[1];

                            if (!hours)
                                hours = '00';
                            if (!minutes)
                                minutes = '00';

                            if (hours.length === 1)
                                hours = prependZero(hours);

                            if (minutes.length === 1)
                                minutes = prependZero(minutes);

                            ngModelCtrl.$setViewValue(hours + ':' + minutes);
                            ngModelCtrl.$render();
                        };

                        element.bind('blur', function (e) {
                            setViewValue();
                        });

                        var replaceAt = function (index, character) {
                            return this.substr(0, index) + character + this.substr(index + character.length);
                        };

                        ngModelCtrl.$parsers.push(function (val) {
                            var timeParts = val.split(":");
                            var hoursStr = timeParts[0];
                            var hours = parseInt(timeParts[0]);
                            var minutesStr = timeParts[1];
                            var minutes = parseInt(timeParts[1]);
                            var colonCount = (val.match(/:/g) || []).length;
                            var integerCount = val.replace(/[^0-9]+/g, '').length;
                            var rawTime = val.replace(/:/i, '');
                            var clean = rawTime.toString().replace(/[^0-9]+/g, '');
                            if (val.length > 5 || colonCount > 1 || integerCount > 4 || rawTime !== clean) {
                                ngModelCtrl.$setViewValue(lastValidInput);
                                ngModelCtrl.$render();
                                return ngModelCtrl.$modelValue;
                            } else if (timeParts.length === 1 && !isNaN(hours)) {
                                if (hours > 12 || hoursStr.length > 2) {
                                    ngModelCtrl.$setViewValue(lastValidInput);
                                    ngModelCtrl.$render();
                                    return ngModelCtrl.$modelValue;
                                }
                                lastValidInput = val;
                            } else if (timeParts.length === 2 && !isNaN(minutes)) {
                                if (minutes > 59 || minutesStr.length > 2) {
                                    ngModelCtrl.$setViewValue(lastValidInput);
                                    ngModelCtrl.$render();
                                    return ngModelCtrl.$modelValue;
                                }
                                lastValidInput = val;
                            } else {
                                lastValidInput = val;
                            }

                            if (!hoursStr)
                                hoursStr = '00';
                            if (!minutesStr)
                                minutesStr = '00';

                            if (hoursStr.length === 1)
                                hoursStr = prependZero(hoursStr);

                            if (minutesStr.length === 1)
                                minutesStr = prependZero(minutes);

                            if (scope.stdDurationPeriod === 'PM' && hours < 12)
                                hoursStr = (+hoursStr + 12).toString();
                            if (scope.stdDurationPeriod === 'AM' && hours === 12)
                                hoursStr = '00';

                            if (val) {
                                var newDuration = 'PT'
                                if (hoursStr !== '00')
                                    newDuration += hoursStr + 'H';
                                if (minutesStr !== '00')
                                    newDuration += minutesStr + 'M';
                                if (newDuration !== ngModelCtrl.$modelValue)
                                    return newDuration;
                                else
                                    return ngModelCtrl.$modelValue
                            } else {
                                return ngModelCtrl.$modelValue;
                            }
                        });

                        ngModelCtrl.$formatters.push(function (val) {
                            var time = fromIsoDuration(val);
                            scope.stdDurationPeriod = time.period;
                            lastValidInput = prependZero(time.hours) + ':' + prependZero(time.minutes);
                            return lastValidInput;
                        });

                        scope.$watch('stdDurationPeriod', function (val) {
                            var temp = lastValidInput;
                            ngModelCtrl.$setViewValue('');
                            ngModelCtrl.$render();
                            ngModelCtrl.$setViewValue(temp);
                            ngModelCtrl.$render();
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.file.change', []);

    module.directive('stdFileChange',
        ['$parse',
            function ($parse) {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        // Get the function provided in the file-change attribute.
                        // Note the attribute has become an angular expression,
                        // which is what we are parsing. The provided handler is
                        // wrapped up in an outer function (attrHandler) - we'll
                        // call the provided event handler inside the handler()
                        // function below.
                        var attrHandler = $parse(attrs['stdFileChange']);

                        // This is a wrapper handler which will be attached to the
                        // HTML change event.
                        var handler = function (e) {
                                // Execute the provided handler in the directive's scope.
                                // The files variable will be available for consumption
                                // by the event handler.
                                attrHandler(scope, { $event: e, files: e.target.files });
                        };

                        // Attach the handler to the HTML change event
                        element[0].addEventListener('change', handler, false);
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.float', []);

    module.directive('stdFloat',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdFloat: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdFloat;

                        ngModelCtrl.$formatters.push(function (val) {
                            return val;
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if ((val.toString().split('.').length - 1) > 1) {
                                ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
                                ngModelCtrl.$render();
                                return ngModelCtrl.$modelValue;
                            }

                            var number = Number(val).toPrecision();

                            if (number === 'NaN') {
                                var allParts = String(val).split('');
                                var isNegative = allParts[0] === '-' ? true : false;
                                var numericParts = String(val).split('.');
                                var clean = '';

                                if (numericParts.length >= 2) {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '') + '.' + numericParts[1].toString().replace(/[^0-9]+/g, '');
                                } else {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '');
                                }

                                if (val !== clean) {
                                    if (isNegative)
                                        clean = '-' + clean;

                                    if (ngModelCtrl.$viewValue !== clean) {
                                        var start = element[0].selectionStart;
                                        var end = element[0].selectionEnd + clean.length - val.length;
                                        ngModelCtrl.$setViewValue(clean);
                                        ngModelCtrl.$render();
                                        element[0].setSelectionRange(start, end);
                                    }
                                }

                                if (!isNaN(ngModelCtrl.$modelValue)) {
                                    return +ngModelCtrl.$modelValue;
                                } else {
                                    if (isNullable)
                                        return null;
                                    else
                                        return undefined;
                                }
                            } else if (val === '') {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else {
                                return +number;
                            }
                        });

                        element.bind('blur', function (event) {
                            if (element.val() === '') return;
                            var numericParts = element.val().split('.');
                            var whole = '';
                            var fraction = '';
                            if (numericParts.length >= 2) {
                                if (numericParts[0] === '-') {
                                    whole = '-0';
                                } else {
                                    whole = numericParts[0] === '' ? '0' : numericParts[0].toString().replace(/[^0-9]+/g, '');
                                }
                                fraction = numericParts[1] === '' ? '0' : numericParts[1].toString().replace(/[^0-9]+/g, '');
                                element.val(whole + '.' + fraction);
                            } else
                                element.val(element.val() + '.0');
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.grid.focus', []);

    module.directive('stdGridFocus',
        ['$document',
            function ($document) {
                return {
                    scope: {
                        stdGridFocus: '='
                    },
                    link: function (scope, element, attrs) {
                        //scope.$watch('stdGridFocus', function(newValue) {
                        //    if (newValue) {
                        //        element[0].querySelectorAll('.ui-grid-viewport')[0].focus();
                        //    }
                        //});

                        document.addEventListener('focus', function (e) {
                            scope.stdGridFocus = isDescendant(element[0], e.target) || e.target.tagName.toLowerCase() === 'body';
                        }, true);

                        function isDescendant(parent, child) {
                            var node = child.parentNode;
                            while (node != null) {
                                if (node == parent) {
                                    return true;
                                }
                                node = node.parentNode;
                            }
                            return false;
                        }
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.indeterminate', []);

    module.directive('stdIndeterminate',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                      stdIndeterminate: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        if (!scope.stdIndeterminate) return;
                        var truthy = true;
                        var falsy = false;
                        var nully = null;
                        ngModelCtrl.$formatters = [];
                        ngModelCtrl.$parsers = [];
                        ngModelCtrl.$render = function() {
                            var d = ngModelCtrl.$viewValue;
                            element.data('checked', d);
                            switch(d){
                                case truthy:
                                    element.prop('indeterminate', false);
                                    element.prop('checked', true);
                                    break;
                                case falsy:
                                    element.prop('indeterminate', false);
                                    element.prop('checked', false);
                                    break;
                                default:
                                    element.prop('indeterminate', true);
                            }
                        };
                        element.bind('click', function() {
                            var d;
                            switch(element.data('checked')){
                                case falsy:
                                    d = truthy;
                                    break;
                                case truthy:
                                    d = nully;
                                    break;
                                default:
                                    d = falsy;
                            }
                            ngModelCtrl.$setViewValue(d);
                            scope.$apply(ngModelCtrl.$render);
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.integer.only', []);

    module.directive('stdIntegerOnly',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdIntegerOnly: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdIntegerOnly.type.isNullable;
                        var isEditContext = scope.stdIntegerOnly.isEditContext;
                        var isSearchContext = scope.stdIntegerOnly.isSearchContext;

                        ngModelCtrl.$parsers.push(function (val) {
                            var parts = String(val).split('');
                            var isNegative = parts[0] === '-' ? true : false;
                            var clean = val.toString().replace(/[^0-9]+/g, '');

                            if (val !== clean) {
                                if (isNegative)
                                    clean = '-' + clean;

                                if (ngModelCtrl.$viewValue !== clean) {
                                    var start = element[0].selectionStart;
                                    var end = element[0].selectionEnd + clean.length - val.length;
                                    ngModelCtrl.$setViewValue(clean);
                                    ngModelCtrl.$render();
                                    element[0].setSelectionRange(start, end);
                                }
                            }

                            //clean === '' because isNaN return false for empty string.
                            if (clean === '' && isSearchContext) {
                                return undefined;
                            } else if (clean === '' && isEditContext) {
                                return null;
                            } else if (isNaN(clean) && isSearchContext) {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else if (isNaN(clean) && isEditContext) {
                                return null;
                            } else
                                return parseInt(clean);
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();
(function(){
    'use strict';

/*
 Attaches input mask onto input element
 */
    angular.module('std.mask', [])
        .value('maskConfig', {
            'maskDefinitions': {
                '9': /\d/,
                'A': /[a-zA-Z]/,
                '*': /[a-zA-Z0-9]/
            }
        })
        .directive('stdMask', ['maskConfig', '$parse', function (maskConfig, $parse) {
            return {
                priority: 100,
                require: 'ngModel',
                restrict: 'A',
                compile: function uiMaskCompilingFunction(){
                    var options = maskConfig;

                    return function uiMaskLinkingFunction(scope, iElement, iAttrs, controller){
                        var maskProcessed = false, eventsBound = false,
                            maskCaretMap, maskPatterns, maskPlaceholder, maskComponents,
                        // Minimum required length of the value to be considered valid
                            minRequiredLength,
                            value, valueMasked, isValid,
                        // Vars for initializing/uninitializing
                            originalPlaceholder = iAttrs.placeholder,
                            originalMaxlength = iAttrs.maxlength,
                        // Vars used exclusively in eventHandler()
                            oldValue, oldValueUnmasked, oldCaretPosition, oldSelectionLength;

                        function initialize(maskAttr){
                            if (!angular.isDefined(maskAttr)) {
                                return uninitialize();
                            }
                            processRawMask(maskAttr);
                            if (!maskProcessed) {
                                return uninitialize();
                            }
                            initializeElement();
                            bindEventListeners();
                            return true;
                        }

                        function initPlaceholder(placeholderAttr) {
                            if(! angular.isDefined(placeholderAttr)) {
                                return;
                            }

                            maskPlaceholder = placeholderAttr;

                            // If the mask is processed, then we need to update the value
                            if (maskProcessed) {
                                eventHandler();
                            }
                        }

                        function formatter(fromModelValue){
                            if (!maskProcessed) {
                                return fromModelValue;
                            }
                            value = unmaskValue(fromModelValue || '');
                            isValid = validateValue(value);
                            controller.$setValidity('mask', isValid);
                            return isValid && value.length ? maskValue(value) : undefined;
                        }

                        function parser(fromViewValue){
                            if (!maskProcessed) {
                                return fromViewValue;
                            }
                            value = unmaskValue(fromViewValue || '');
                            isValid = validateValue(value);
                            // We have to set viewValue manually as the reformatting of the input
                            // value performed by eventHandler() doesn't happen until after
                            // this parser is called, which causes what the user sees in the input
                            // to be out-of-sync with what the controller's $viewValue is set to.
                            controller.$viewValue = value.length ? maskValue(value) : '';
                            controller.$setValidity('mask', isValid);
                            if (value === '' && iAttrs.required) {
                                controller.$setValidity('required', false);
                            }
                            return isValid ? value : undefined;
                        }

                        var linkOptions = {};

                        if (iAttrs.uiOptions) {
                            linkOptions = scope.$eval('[' + iAttrs.uiOptions + ']');
                            if (angular.isObject(linkOptions[0])) {
                                // we can't use angular.copy nor angular.extend, they lack the power to do a deep merge
                                linkOptions = (function(original, current){
                                    for(var i in original) {
                                        if (Object.prototype.hasOwnProperty.call(original, i)) {
                                            if (!current[i]) {
                                                current[i] = angular.copy(original[i]);
                                            } else {
                                                angular.extend(current[i], original[i]);
                                            }
                                        }
                                    }
                                    return current;
                                })(options, linkOptions[0]);
                            }
                        } else {
                            linkOptions = options;
                        }

                        iAttrs.$observe('stdMask', initialize);
                        iAttrs.$observe('placeholder', initPlaceholder);
                        var modelViewValue = false;
                        iAttrs.$observe('modelViewValue', function(val) {
                            if(val === 'true') {
                                modelViewValue = true;
                            }
                        });
                        scope.$watch(iAttrs.ngModel, function(val) {
                            if(modelViewValue && val) {
                                var model = $parse(iAttrs.ngModel);
                                model.assign(scope, controller.$viewValue);
                            }
                        });
                        controller.$formatters.push(formatter);
                        controller.$parsers.push(parser);

                        function uninitialize(){
                            maskProcessed = false;
                            unbindEventListeners();

                            if (angular.isDefined(originalPlaceholder)) {
                                iElement.attr('placeholder', originalPlaceholder);
                            } else {
                                iElement.removeAttr('placeholder');
                            }

                            if (angular.isDefined(originalMaxlength)) {
                                iElement.attr('maxlength', originalMaxlength);
                            } else {
                                iElement.removeAttr('maxlength');
                            }

                            iElement.val(controller.$modelValue);
                            controller.$viewValue = controller.$modelValue;
                            return false;
                        }

                        function initializeElement(){
                            value = oldValueUnmasked = unmaskValue(controller.$modelValue || '');
                            valueMasked = oldValue = maskValue(value);
                            isValid = validateValue(value);
                            var viewValue = isValid && value.length ? valueMasked : '';
                            if (iAttrs.maxlength) { // Double maxlength to allow pasting new val at end of mask
                                iElement.attr('maxlength', maskCaretMap[maskCaretMap.length - 1] * 2);
                            }
                            iElement.attr('placeholder', maskPlaceholder);
                            iElement.val(viewValue);
                            controller.$viewValue = viewValue;
                            // Not using $setViewValue so we don't clobber the model value and dirty the form
                            // without any kind of user interaction.
                        }

                        function bindEventListeners(){
                            if (eventsBound) {
                                return;
                            }
                            iElement.bind('blur', blurHandler);
                            iElement.bind('mousedown mouseup', mouseDownUpHandler);
                            iElement.bind('input keyup click focus', eventHandler);
                            eventsBound = true;
                        }

                        function unbindEventListeners(){
                            if (!eventsBound) {
                                return;
                            }
                            iElement.unbind('blur', blurHandler);
                            iElement.unbind('mousedown', mouseDownUpHandler);
                            iElement.unbind('mouseup', mouseDownUpHandler);
                            iElement.unbind('input', eventHandler);
                            iElement.unbind('keyup', eventHandler);
                            iElement.unbind('click', eventHandler);
                            iElement.unbind('focus', eventHandler);
                            eventsBound = false;
                        }

                        function validateValue(value){
                            // Zero-length value validity is ngRequired's determination
                            return value.length ? value.length >= minRequiredLength : true;
                        }

                        function unmaskValue(value){
                            var valueUnmasked = '',
                                maskPatternsCopy = maskPatterns.slice();
                            // Preprocess by stripping mask components from value
                            value = value.toString();
                            angular.forEach(maskComponents, function (component){
                                value = value.replace(component, '');
                            });
                            angular.forEach(value.split(''), function (chr){
                                if (maskPatternsCopy.length && maskPatternsCopy[0].test(chr)) {
                                    valueUnmasked += chr;
                                    maskPatternsCopy.shift();
                                }
                            });
                            return valueUnmasked;
                        }

                        function maskValue(unmaskedValue){
                            var valueMasked = '',
                                maskCaretMapCopy = maskCaretMap.slice();

                            angular.forEach(maskPlaceholder.split(''), function (chr, i){
                                if (unmaskedValue.length && i === maskCaretMapCopy[0]) {
                                    valueMasked  += unmaskedValue.charAt(0) || '_';
                                    unmaskedValue = unmaskedValue.substr(1);
                                    maskCaretMapCopy.shift();
                                }
                                else {
                                    valueMasked += chr;
                                }
                            });
                            return valueMasked;
                        }

                        function getPlaceholderChar(i) {
                            var placeholder = iAttrs.placeholder;

                            if (typeof placeholder !== 'undefined' && placeholder[i]) {
                                return placeholder[i];
                            } else {
                                return '_';
                            }
                        }

                        // Generate array of mask components that will be stripped from a masked value
                        // before processing to prevent mask components from being added to the unmasked value.
                        // E.g., a mask pattern of '+7 9999' won't have the 7 bleed into the unmasked value.
                        // If a maskable char is followed by a mask char and has a mask
                        // char behind it, we'll split it into it's own component so if
                        // a user is aggressively deleting in the input and a char ahead
                        // of the maskable char gets deleted, we'll still be able to strip
                        // it in the unmaskValue() preprocessing.
                        function getMaskComponents() {
                            return maskPlaceholder.replace(/[_]+/g, '_').replace(/([^_]+)([a-zA-Z0-9])([^_])/g, '$1$2_$3').split('_');
                        }

                        function processRawMask(mask){
                            var characterCount = 0;

                            maskCaretMap    = [];
                            maskPatterns    = [];
                            maskPlaceholder = '';

                            if (typeof mask === 'string') {
                                minRequiredLength = 0;

                                var isOptional = false,
                                    splitMask  = mask.split('');

                                angular.forEach(splitMask, function (chr, i){
                                    if (linkOptions.maskDefinitions[chr]) {

                                        maskCaretMap.push(characterCount);

                                        maskPlaceholder += getPlaceholderChar(i);
                                        maskPatterns.push(linkOptions.maskDefinitions[chr]);

                                        characterCount++;
                                        if (!isOptional) {
                                            minRequiredLength++;
                                        }
                                    }
                                    else if (chr === '?') {
                                        isOptional = true;
                                    }
                                    else {
                                        maskPlaceholder += chr;
                                        characterCount++;
                                    }
                                });
                            }
                            // Caret position immediately following last position is valid.
                            maskCaretMap.push(maskCaretMap.slice().pop() + 1);

                            maskComponents = getMaskComponents();
                            maskProcessed  = maskCaretMap.length > 1 ? true : false;
                        }

                        function blurHandler(){
                            oldCaretPosition = 0;
                            oldSelectionLength = 0;
                            if (!isValid || value.length === 0) {
                                valueMasked = '';
                                iElement.val('');
                                scope.$apply(function (){
                                    controller.$setViewValue('');
                                });
                            }
                        }

                        function mouseDownUpHandler(e){
                            if (e.type === 'mousedown') {
                                iElement.bind('mouseout', mouseoutHandler);
                            } else {
                                iElement.unbind('mouseout', mouseoutHandler);
                            }
                        }

                        iElement.bind('mousedown mouseup', mouseDownUpHandler);

                        function mouseoutHandler(){
                            /*jshint validthis: true */
                            oldSelectionLength = getSelectionLength(this);
                            iElement.unbind('mouseout', mouseoutHandler);
                        }

                        function eventHandler(e){
                            /*jshint validthis: true */
                            e = e || {};
                            // Allows more efficient minification
                            var eventWhich = e.which,
                                eventType = e.type;

                            // Prevent shift and ctrl from mucking with old values
                            if (eventWhich === 16 || eventWhich === 91) { return;}

                            var val = iElement.val(),
                                valOld = oldValue,
                                valMasked,
                                valUnmasked = unmaskValue(val),
                                valUnmaskedOld = oldValueUnmasked,
                                valAltered = false,

                                caretPos = getCaretPosition(this) || 0,
                                caretPosOld = oldCaretPosition || 0,
                                caretPosDelta = caretPos - caretPosOld,
                                caretPosMin = maskCaretMap[0],
                                caretPosMax = maskCaretMap[valUnmasked.length] || maskCaretMap.slice().shift(),

                                selectionLenOld = oldSelectionLength || 0,
                                isSelected = getSelectionLength(this) > 0,
                                wasSelected = selectionLenOld > 0,

                            // Case: Typing a character to overwrite a selection
                                isAddition = (val.length > valOld.length) || (selectionLenOld && val.length > valOld.length - selectionLenOld),
                            // Case: Delete and backspace behave identically on a selection
                                isDeletion = (val.length < valOld.length) || (selectionLenOld && val.length === valOld.length - selectionLenOld),
                                isSelection = (eventWhich >= 37 && eventWhich <= 40) && e.shiftKey, // Arrow key codes

                                isKeyLeftArrow = eventWhich === 37,
                            // Necessary due to "input" event not providing a key code
                                isKeyBackspace = eventWhich === 8 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === -1)),
                                isKeyDelete = eventWhich === 46 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === 0 ) && !wasSelected),

                            // Handles cases where caret is moved and placed in front of invalid maskCaretMap position. Logic below
                            // ensures that, on click or leftward caret placement, caret is moved leftward until directly right of
                            // non-mask character. Also applied to click since users are (arguably) more likely to backspace
                            // a character when clicking within a filled input.
                                caretBumpBack = (isKeyLeftArrow || isKeyBackspace || eventType === 'click') && caretPos > caretPosMin;

                            oldSelectionLength = getSelectionLength(this);

                            // These events don't require any action
                            if (isSelection || (isSelected && (eventType === 'click' || eventType === 'keyup'))) {
                                return;
                            }

                            // Value Handling
                            // ==============

                            // User attempted to delete but raw value was unaffected--correct this grievous offense
                            if ((eventType === 'input') && isDeletion && !wasSelected && valUnmasked === valUnmaskedOld) {
                                while (isKeyBackspace && caretPos > caretPosMin && !isValidCaretPosition(caretPos)) {
                                    caretPos--;
                                }
                                while (isKeyDelete && caretPos < caretPosMax && maskCaretMap.indexOf(caretPos) === -1) {
                                    caretPos++;
                                }
                                var charIndex = maskCaretMap.indexOf(caretPos);
                                // Strip out non-mask character that user would have deleted if mask hadn't been in the way.
                                valUnmasked = valUnmasked.substring(0, charIndex) + valUnmasked.substring(charIndex + 1);
                                valAltered = true;
                            }

                            // Update values
                            valMasked = maskValue(valUnmasked);

                            oldValue = valMasked;
                            oldValueUnmasked = valUnmasked;
                            iElement.val(valMasked);
                            if (valAltered) {
                                // We've altered the raw value after it's been $digest'ed, we need to $apply the new value.
                                scope.$apply(function (){
                                    controller.$setViewValue(valUnmasked);
                                });
                            }

                            // Caret Repositioning
                            // ===================

                            // Ensure that typing always places caret ahead of typed character in cases where the first char of
                            // the input is a mask char and the caret is placed at the 0 position.
                            if (isAddition && (caretPos <= caretPosMin)) {
                                caretPos = caretPosMin + 1;
                            }

                            if (caretBumpBack) {
                                caretPos--;
                            }

                            // Make sure caret is within min and max position limits
                            caretPos = caretPos > caretPosMax ? caretPosMax : caretPos < caretPosMin ? caretPosMin : caretPos;

                            // Scoot the caret back or forth until it's in a non-mask position and within min/max position limits
                            while (!isValidCaretPosition(caretPos) && caretPos > caretPosMin && caretPos < caretPosMax) {
                                caretPos += caretBumpBack ? -1 : 1;
                            }

                            if ((caretBumpBack && caretPos < caretPosMax) || (isAddition && !isValidCaretPosition(caretPosOld))) {
                                caretPos++;
                            }
                            oldCaretPosition = caretPos;
                            setCaretPosition(this, caretPos);
                        }

                        function isValidCaretPosition(pos){ return maskCaretMap.indexOf(pos) > -1; }

                        function getCaretPosition(input){
                            if (!input) return 0;
                            if (input.selectionStart !== undefined) {
                                return input.selectionStart;
                            } else if (document.selection) {
                                // Curse you IE
                                input.focus();
                                var selection = document.selection.createRange();
                                selection.moveStart('character', input.value ? -input.value.length : 0);
                                return selection.text.length;
                            }
                            return 0;
                        }

                        function setCaretPosition(input, pos){
                            if (!input) return 0;
                            if (input.offsetWidth === 0 || input.offsetHeight === 0) {
                                return; // Input's hidden
                            }
                            if (input.setSelectionRange) {
                                input.focus();
                                input.setSelectionRange(pos, pos);
                            }
                            else if (input.createTextRange) {
                                // Curse you IE
                                var range = input.createTextRange();
                                range.collapse(true);
                                range.moveEnd('character', pos);
                                range.moveStart('character', pos);
                                range.select();
                            }
                        }

                        function getSelectionLength(input){
                            if (!input) return 0;
                            if (input.selectionStart !== undefined) {
                                return (input.selectionEnd - input.selectionStart);
                            }
                            if (document.selection) {
                                return (document.selection.createRange().text.length);
                            }
                            return 0;
                        }

                        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
                        if (!Array.prototype.indexOf) {
                            Array.prototype.indexOf = function (searchElement /*, fromIndex */){
                                if (this === null) {
                                    throw new TypeError();
                                }
                                var t = Object(this);
                                var len = t.length >>> 0;
                                if (len === 0) {
                                    return -1;
                                }
                                var n = 0;
                                if (arguments.length > 1) {
                                    n = Number(arguments[1]);
                                    if (n !== n) { // shortcut for verifying if it's NaN
                                        n = 0;
                                    } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
                                    }
                                }
                                if (n >= len) {
                                    return -1;
                                }
                                var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
                                for (; k < len; k++) {
                                    if (k in t && t[k] === searchElement) {
                                        return k;
                                    }
                                }
                                return -1;
                            };
                        }

                    };
                }
            };
        }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.max', []);

    module.directive('stdMax',
        [
            function () {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var max = parseInt(attrs.stdMax);
                        ngModelCtrl.$parsers.push(function (val) {
                            var enteredValue = parseInt(val);
                            if (enteredValue > max) {
                                ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
                                ngModelCtrl.$render();
                                return ngModelCtrl.$modelValue;
                            }

                            return val;
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.min', []);

    module.directive('stdMin',
        [
            function () {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var min = parseInt(attrs.stdMin);
                        ngModelCtrl.$parsers.push(function (val) {
                            var enteredValue = parseInt(val);
                            if (enteredValue < min) {
                                ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
                                ngModelCtrl.$render();
                                return ngModelCtrl.$modelValue;
                            }

                            return val;
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.percent', []);

    module.directive('stdPercent',
        ['$document',
            function ($document) {
                return {
                    require: 'ngModel',
                    scope: {
                        stdPercent: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdPercent.type.isNullable;
                        var decimalPlaces = scope.stdPercent.type.property.decimalPlaces;

                        if (typeof decimalPlaces === 'undefined')
                            decimalPlaces = 2;

                        var wholePlaces = 38 - decimalPlaces;

                        ngModelCtrl.$parsers.push(function (val) {
                            if (element[0] !== $document[0].activeElement) return ngModelCtrl.$modelValue;
                            var number = Number(val).toPrecision();

                            var numericParts = String(val).split('.');

                            if (numericParts.length >= 2) {
                                var wholeNumberPrecision = numericParts[0].length > wholePlaces;
                                var fractionalNumberPrecision = numericParts[1].length > decimalPlaces;
                            } else {
                                wholeNumberPrecision = numericParts[0].length > wholePlaces;
                            }

                            if (number === 'NaN' || wholeNumberPrecision || fractionalNumberPrecision) {
                                var allParts = String(val).split('');
                                var isNegative = allParts[0] === '-' ? true : false;
                                var numericParts = String(val).split('.');
                                var clean = '';

                                if (numericParts.length >= 2) {
                                    var wholeNumber = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                    var fractionalNumber = numericParts[1].toString().replace(/[^0-9]+/g, '').substring(0, decimalPlaces);
                                    clean = wholeNumber + '.' + fractionalNumber;
                                } else {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                }

                                if (val !== clean) {
                                    if (isNegative)
                                        clean = '-' + clean;

                                    if (ngModelCtrl.$viewValue !== clean) {
                                        var start = element[0].selectionStart;
                                        var end = element[0].selectionEnd + clean.length - val.length;
                                        ngModelCtrl.$setViewValue(clean);
                                        ngModelCtrl.$render();
                                        element[0].setSelectionRange(start, end);
                                    }
                                }

                                if (!isNaN(ngModelCtrl.$modelValue)) {
                                    return +ngModelCtrl.$modelValue;
                                } else {
                                    if (isNullable)
                                        return null;
                                    else
                                        return undefined;
                                }
                            } else if (val === '') {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else {
                                return +number;
                            }
                        });

                        element.bind('focus', function (event) {
                            element.val(element.val().replace('$', ''));
                        });

                        element.bind('blur', function (event) {
                            if (element.val() === '') return;
                            var numericParts = element.val().split('.');
                            var whole = '';
                            var fraction = '';
                            if (numericParts.length >= 2) {
                                if (numericParts[0] === '-') {
                                    whole = '-0';
                                } else {
                                    whole = numericParts[0] === '' ? '0' : numericParts[0].toString().replace(/[^0-9]+/g, '');
                                }
                                fraction = numericParts[1] === '' || numericParts[1] === '0' ? '0%' : numericParts[1].toString().replace(/[^0-9]+/g, '') + '%';
                                element.val(whole + '.' + fraction);
                            } else
                                element.val(element.val() + '.0' + '%');
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.select.value.converter', []);

    module.directive('stdSelectValueConverter',
        [
            function () {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        ngModelCtrl.$formatters.push(function (val) {
                            if (val === null)
                                return 'null';
                            return val;
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if (val === null)
                                return undefined;
                            if (val === 'null')
                                return null;
                            return val;
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.time', []);

    module.directive('stdTime',
        ['$filter', '$timeout',
            function ($filter, $timeout) {
                return {
                    require: 'ngModel',
                    scope: {
                        stdTime: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var format = '--:--';
                        var timeZone = 0;
                        var formatParts = format.split(':');
                        var position1Format = formatParts[0];
                        var position2Format = formatParts[1];

                        var range1Start = 0;
                        var range1End = 2;
                        var range2Start = 3;
                        var range2End = 5;

                        var range1 = createRange(range1Start, range1End);
                        var range2 = createRange(range2Start, range2End);

                        var selectedRange = [];
                        var rangeInitialized = false;
                        var militaryTime = scope.stdTime.property.militaryTime;

                        var mouseDown = new Date().getTime(),
                            previousMouseDown = mouseDown;

                        var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1
                        || navigator.userAgent.toLowerCase().indexOf("trident") != -1);

                        function getCaretPosition() {
                            var caretPos = 0;   // IE Support
                            if (document.selection) {
                                element[0].focus();
                                var selection = document.selection.createRange();
                                selection.moveStart('character', -element[0].value.length);
                                caretPos = selection.text.length;
                            }
                            // Firefox support
                            else if (element[0].selectionStart || element[0].selectionStart == '0')
                                caretPos = element[0].selectionStart;
                            return (caretPos);
                        }

                        function createRange(start, end) {
                            var array = [];
                            for (var i = start; i <= end; i++) {
                                array.push(i);
                            }
                            return array;
                        }

                        function getSelectedText() {
                            return element[0].value.substring(selectedRange[0], selectedRange[selectedRange.length - 1]);
                        }

                        function replaceRange(s, start, end, substitute) {
                            return s.substring(0, start) + substitute + s.substring(end);
                        }

                        function zeroPad(num, places) {
                            var zero = places - num.toString().length + 1;
                            return Array(+(zero > 0 && zero)).join("0") + num;
                        }

                        function setValue(value) {
                            ngModelCtrl.$setViewValue(replaceRange(element[0].value, selectedRange[0], selectedRange[selectedRange.length - 1], value));
                            ngModelCtrl.$render();
                        }

                        function setRange(rangeStart, rangeEnd, rangeToSelect, ri) {
                            element[0].setSelectionRange(rangeStart, rangeEnd);
                            selectedRange = rangeToSelect;
                            rangeInitialized = ri;
                        }

                        function getCharFromKeyCode(e) {
                            if(e.keyCode >= 96 && e.keyCode <= 105)
                                return parseInt(String.fromCharCode(e.keyCode - 48));

                            return parseInt(String.fromCharCode(e.keyCode));
                        }

                        element.bind('keydown', function(e) {
                            if (e.keyCode === 37) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }
                            if (e.keyCode === 39 || (e.keyCode === 186 && e.shiftKey)) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                }
                            }

                            if (e.keyCode === 8) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2, true);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }

                            if (e.keyCode === 46) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }

                            if (e.keyCode === 9 && !e.shiftKey) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                }
                            }
                            if (e.keyCode === 9 && e.shiftKey) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                    e.preventDefault();
                                }
                            }

                            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                                var newValue,
                                    oldValue,
                                    selectedText = getSelectedText();

                                if (selectedText === '') return;

                                oldValue = parseInt(selectedText);
                                newValue = getCharFromKeyCode(e);

                                if (selectedRange === range1) {
                                    if (oldValue === 1 && [0, 1, 2].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, true);
                                    } else if (militaryTime && oldValue === 1 && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, true);
                                    } else if (militaryTime && oldValue === 2 && [1, 2, 3].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, true);
                                    } else {
                                        if (rangeInitialized || isNaN(oldValue)) {
                                            setValue('0' + newValue.toString());
                                            if ([0, 1].indexOf(newValue) > -1 || (militaryTime && [0, 1, 2].indexOf(newValue) > -1))
                                                setRange(range1Start, range1End, range1, false);
                                            else
                                                setRange(range2Start, range2End, range2, true);
                                        }
                                        else {
                                            if (!militaryTime && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 ) {
                                                setRange(range2Start, range2End, range2, true);
                                                setValue('0' + newValue.toString());
                                                setRange(range2Start, range2End, range2, false);
                                            }
                                            else if (militaryTime && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range2Start, range2End, range2, true);
                                            } else {
                                                setValue('0' + newValue.toString());
                                                setRange(range1Start, range1End, range1, true);
                                            }
                                        }
                                    }
                                } else if (selectedRange === range2) {
                                    if ([1, 2, 3, 4, 5].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, false);
                                    } else {
                                        setValue('0' + newValue.toString());
                                        setRange(range2Start, range2End, range2, false);
                                    }
                                }
                            }
                            if (e.keyCode !== 9)
                                e.preventDefault();

                        });

                        element.bind('mouseup', function(e){
                            var caretPosition = getCaretPosition();
                            var sel = window.getSelection();
                            sel.removeAllRanges();

                            if (range1.indexOf(caretPosition) > -1)
                                setRange(range1Start, range1End, range1, true);

                            if (range2.indexOf(caretPosition) > -1)
                                setRange(range2Start, range2End, range2, true);
                        });

                        element.bind('mousemove', function(e){
                            if(e.stopPropagation) e.stopPropagation();
                            if(e.preventDefault) e.preventDefault();
                            e.cancelBubble = true;
                            e.returnValue = false;
                            return false;
                        });

                        element.bind('mousedown', function(e){
                            var time = new Date().getTime();

                            if((time - mouseDown) < 450)
                            {
                                previousMouseDown = mouseDown;
                                mouseDown = time;

                                e.preventDefault();
                                return false;
                            }

                            previousMouseDown = mouseDown;
                            mouseDown = time;
                        });

                        element.bind('copy', function(e) {
                            var textToPutOnClipboard = element[0].value;

                            if (isIe) {
                                window.clipboardData.setData('Text', textToPutOnClipboard);
                            } else {
                                e.clipboardData.setData('text/plain', textToPutOnClipboard);
                            }
                            e.preventDefault();
                        });

                        element.bind('cut', function(e){
                            e.preventDefault();
                        });

                        element.bind('paste', function(e){
                            e.preventDefault();
                        });

                        element.bind('focus', function(e){
                            $timeout(function() {
                                setRange(range1Start, range1End, range1, true);
                            }, 0)
                        });

                        element.bind('blur', function(e){
                            if (ngModelCtrl.$modelValue === null)
                                element[0].value = '--:--';
                        });

                        element.addClass('ttl-date-selection');

                        scope.$watch('stdTime.property.period', function(newValue, oldValue){
                            if (ngModelCtrl.$modelValue === null || newValue === oldValue) return;
                            var val = element[0].value;
                            var timeParts = String(val).split(':');
                            var hours = parseInt(timeParts[0]);
                            var minutes = parseInt(timeParts[1]);
                            if (isNaN(hours) || isNaN(minutes)) {
                                //Do Nothing
                            } else {
                                if (newValue ==='AM' && hours === 12) {
                                    hours = 0;
                                } else if (newValue === 'PM' && hours < 12) {
                                    hours += 12;
                                }
                                var newDate = new Date(ngModelCtrl.$modelValue);
                                newDate.setHours(hours);
                                //Do this watch being out of context we have clear the value and re-render to get the parser to fire.
                                ngModelCtrl.$setViewValue($filter('date')(null, 'hh:mm'));
                                ngModelCtrl.$render();
                                ngModelCtrl.$setViewValue($filter('date')(newDate, 'hh:mm'));
                                ngModelCtrl.$render();
                            }
                        });

                        ngModelCtrl.$formatters.push(function (val) {
                            var date = Date.parse(val);
                            if (!isNaN(date)) {
                                if (!militaryTime)
                                    scope.stdTime.property.period = (val.getHours() >= 12) ? "PM" : "AM";
                                return $filter('date')(val, 'hh:mm');
                            } else {
                                return '--:--';
                            }
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            var timeParts = String(val).split(':');
                            var hours = parseInt(timeParts[0]);
                            var minutes = parseInt(timeParts[1]);
                            var period = scope.stdTime.property.period;

                            if (isNaN(hours) || isNaN(minutes)) {
                                return null;
                            }

                            val = new Date();
                            if (period ==='AM' && hours === 12) {
                                hours = 0;
                            } else if (period === 'PM' && hours < 12) {
                                hours += 12;
                            }
                            val.setHours(hours);
                            val.setMinutes(minutes);
                            var date = Date.parse(ngModelCtrl.$modelValue);
                            if (!isNaN(date))
                            {
                                val.setFullYear(ngModelCtrl.$modelValue.getFullYear());
                                val.setMonth(ngModelCtrl.$modelValue.getMonth());
                                val.setDate(ngModelCtrl.$modelValue.getDate());

                                return val;
                            }
                            return val;
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.usa.dollar', []);

    module.directive('stdUsaDollar',
        ['$document',
            function ($document) {
                return {
                    require: 'ngModel',
                    scope: {
                        stdUsaDollar: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdUsaDollar.type.isNullable;
                        var decimalPlaces = scope.stdUsaDollar.type.property.decimalPlaces;

                        if (typeof decimalPlaces === 'undefined')
                            decimalPlaces = 2;

                        var wholePlaces = 38 - decimalPlaces;

                        ngModelCtrl.$parsers.push(function (val) {
                            if (element[0] !== $document[0].activeElement) return ngModelCtrl.$modelValue;
                            var number = Number(val).toPrecision();

                            var numericParts = String(val).split('.');

                            if (numericParts.length >= 2) {
                                var wholeNumberPrecision = numericParts[0].length > wholePlaces;
                                var fractionalNumberPrecision = numericParts[1].length > decimalPlaces;
                            } else {
                                wholeNumberPrecision = numericParts[0].length > wholePlaces;
                            }

                            if (number === 'NaN' || wholeNumberPrecision || fractionalNumberPrecision) {
                                var allParts = String(val).split('');
                                var isNegative = allParts[0] === '-' ? true : false;
                                var numericParts = String(val).split('.');
                                var clean = '';

                                if (numericParts.length >= 2) {
                                    var wholeNumber = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                    var fractionalNumber = numericParts[1].toString().replace(/[^0-9]+/g, '').substring(0, decimalPlaces);
                                    clean = wholeNumber + '.' + fractionalNumber;
                                } else {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                }

                                if (val !== clean) {
                                    if (isNegative)
                                        clean = '-' + clean;

                                    if (ngModelCtrl.$viewValue !== clean) {
                                        var start = element[0].selectionStart;
                                        var end = element[0].selectionEnd + clean.length - val.length;
                                        ngModelCtrl.$setViewValue(clean);
                                        ngModelCtrl.$render();
                                        element[0].setSelectionRange(start, end);
                                    }
                                }

                                if (!isNaN(ngModelCtrl.$modelValue)) {
                                    return +ngModelCtrl.$modelValue;
                                } else {
                                    if (isNullable)
                                        return null;
                                    else
                                        return undefined;
                                }
                            } else if (val === '') {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else {
                                return +number;
                            }
                        });

                        element.bind('focus', function (event) {
                            element.val(element.val().replace('$', ''));
                        });

                        element.bind('blur', function (event) {
                            if (element.val() === '') return;
                            var numericParts = element.val().split('.');
                            var whole = '';
                            var fraction = '';
                            if (numericParts.length >= 2) {
                                if (numericParts[0] === '-') {
                                    whole = '$-0';
                                } else {
                                    whole = numericParts[0] === '' ? '$0' : '$' + numericParts[0].toString().replace(/[^0-9]+/g, '');
                                }
                                fraction = numericParts[1] === '' || numericParts[1] === '0' ? '00' : numericParts[1].toString().replace(/[^0-9]+/g, '');
                                element.val(whole + '.' + fraction);
                            } else
                                element.val('$' + element.val() + '.00');
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();
(function() {
    var root;

    if (typeof window === 'object' && window) {
        root = window;
    } else {
        root = global;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = root.Promise ? root.Promise : Promise;
    } else if (!root.Promise) {
        root.Promise = Promise;
    }

    // Use polyfill for setImmediate for performance gains
    var asap = root.setImmediate || function(fn) { setTimeout(fn, 1); };

    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
        return function() {
            fn.apply(thisArg, arguments);
        }
    }

    var isArray = Array.isArray || function(value) { return Object.prototype.toString.call(value) === "[object Array]" };

    function Promise(fn) {
        if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
        if (typeof fn !== 'function') throw new TypeError('not a function');
        this._state = null;
        this._value = null;
        this._deferreds = []

        doResolve(fn, bind(resolve, this), bind(reject, this))
    }

    function handle(deferred) {
        var me = this;
        if (this._state === null) {
            this._deferreds.push(deferred);
            return
        }
        asap(function() {
            var cb = me._state ? deferred.onFulfilled : deferred.onRejected
            if (cb === null) {
                (me._state ? deferred.resolve : deferred.reject)(me._value);
                return;
            }
            var ret;
            try {
                ret = cb(me._value);
            }
            catch (e) {
                deferred.reject(e);
                return;
            }
            deferred.resolve(ret);
        })
    }

    function resolve(newValue) {
        try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
            if (newValue === this) throw new TypeError('A promise cannot be resolved with itself.');
            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                var then = newValue.then;
                if (typeof then === 'function') {
                    doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
                    return;
                }
            }
            this._state = true;
            this._value = newValue;
            finale.call(this);
        } catch (e) { reject.call(this, e); }
    }

    function reject(newValue) {
        this._state = false;
        this._value = newValue;
        finale.call(this);
    }

    function finale() {
        for (var i = 0, len = this._deferreds.length; i < len; i++) {
            handle.call(this, this._deferreds[i]);
        }
        this._deferreds = null;
    }

    function Handler(onFulfilled, onRejected, resolve, reject){
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
            fn(function (value) {
                if (done) return;
                done = true;
                onFulfilled(value);
            }, function (reason) {
                if (done) return;
                done = true;
                onRejected(reason);
            })
        } catch (ex) {
            if (done) return;
            done = true;
            onRejected(ex);
        }
    }

    Promise.prototype['catch'] = function (onRejected) {
        return this.then(null, onRejected);
    };

    Promise.prototype.then = function(onFulfilled, onRejected) {
        var me = this;
        return new Promise(function(resolve, reject) {
            handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
        })
    };

    Promise.all = function () {
        var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);

        return new Promise(function (resolve, reject) {
            if (args.length === 0) return resolve([]);
            var remaining = args.length;
            function res(i, val) {
                try {
                    if (val && (typeof val === 'object' || typeof val === 'function')) {
                        var then = val.then;
                        if (typeof then === 'function') {
                            then.call(val, function (val) { res(i, val) }, reject);
                            return;
                        }
                    }
                    args[i] = val;
                    if (--remaining === 0) {
                        resolve(args);
                    }
                } catch (ex) {
                    reject(ex);
                }
            }
            for (var i = 0; i < args.length; i++) {
                res(i, args[i]);
            }
        });
    };

    Promise.resolve = function (value) {
        if (value && typeof value === 'object' && value.constructor === Promise) {
            return value;
        }

        return new Promise(function (resolve) {
            resolve(value);
        });
    };

    Promise.reject = function (value) {
        return new Promise(function (resolve, reject) {
            reject(value);
        });
    };

    Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
            for(var i = 0, len = values.length; i < len; i++) {
                values[i].then(resolve, reject);
            }
        });
    };
})();

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
(function(){
    'use strict';

    var module = angular.module('std.file.reader', []);

    module.factory('stdFileReader',
        [
            function() {
                this.read = function(file, allowed) {
                    if (allowed === 'image') {
                        var filter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                        if (!filter.test(file.type)) { alert("You must select a valid image file!"); return; }
                    }

                    return new Promise(function(resolve, reject) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            var results = {
                                data: e.target.result,
                                mimeType: file.type,
                                filename: file.name
                            };
                            resolve(results)
                        };
                        reader.readAsDataURL(file);
                    });
                };

                return {
                    read: this.read
                }
            }
        ]);
})();

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
(function(){
    'use strict';

    var module = angular.module('std.operator.lookup', []);

    module.factory('stdOperatorLookup',
        [
            function() {
                var operatorLookup = {
                    'equal': {
                        operator: 'eq',
                        operatorImage: 'ico-equal',
                        operatorImageMessage: 'Equal To'
                    },
                    'not-equal': {
                        operator: 'not-eq',
                        operatorImage: 'ico-not-equal',
                        operatorImageMessage: 'Not Equal To'
                    },
                    'greater-than': {
                        operator: 'gt',
                        operatorImage: 'ico-greater-than',
                        operatorImageMessage: 'Greater Than'
                    },
                    'greater-than-or-equal': {
                        operator: 'ge',
                        operatorImage: 'ico-greater-than-or-equal',
                        operatorImageMessage: 'Greater Than Or Equal To'
                    },
                    'less-than': {
                        operator: 'lt',
                        operatorImage: 'ico-less-than',
                        operatorImageMessage: 'Less Than'
                    },
                    'less-than-or-equal': {
                        operator: 'le',
                        operatorImage: 'ico-less-than-or-equal',
                        operatorImageMessage: 'Less Than Or Equal To'
                    },
                    'contains': {
                        operator: 'contains',
                        operatorImage: 'ico-contains',
                        operatorImageMessage: 'Contains'
                    },
                    undefined: {
                        operator: 'eq',
                        operatorImage: 'ico-equal',
                        operatorImageMessage: 'Equal To'
                    }
                };

                return operatorLookup;
            }
        ]);
})();


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
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdBoolean', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return v ? 'True' : 'False';
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdChoiceLabel', [
        function() {
            return function(cfg) {
                if (cfg.value.$ === null)
                    return null;
                var item = cfg.type.choices.filter(function (c) {
                    return c.value.$ === cfg.value.$;
                });

                if (item.length == 0)
                    return null;
                return item[0].label;
            };
        }
    ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDateShort',
        ['$filter',
            function ($filter) {
                return function (cfg) {
                    var v = cfg.value.$;
                    if (v === null)
                        return null;
                    return $filter('date')(v, 'MM/dd/yyyy');
                };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDatetimeShort',
        ['$filter',
            function ($filter) {
                return function (cfg) {
                    var v = cfg.value.$;
                    if (v === null)
                        return null;
                    return $filter('date')(v, 'MM/dd/yyyy hh:mm a');
                };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDatetimeSpanShort',
        ['$filter',
            function ($filter) {
                return function (cfg) {
                    cfg = cfg.children;
                    var start = cfg.start.value.$;
                    var end = cfg.end.value.$;
                    var text = '';
                    if (start !== null) {
                        text = $filter('date')(start, 'MM/dd/yyyy hh:mm a') + ' - ';
                        if (end != null) {
                            if (start.getYear() === end.getYear() && start.getMonth() === end.getMonth() && start.getDay() === end.getDay())
                                text += $filter('date')(end, 'hh:mm a');
                            else
                                text += $filter('date')(end, 'MM/dd/yyyy hh:mm a');
                        }
                    } else {
                        if (end !== null)
                            text += $filter('date')(end, 'MM/dd/yyyy hh:mm a');
                    }
                    return text;
                };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDecimal', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if(v === null)
                return null;
            return v.toString();
        };
    }])
})();
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
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdFloat', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if(v === null)
                return null;
            return v.toString();
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdId', [function () {
        return function (cfg) {
            return cfg.recordId();
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdInteger', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if(v === null)
                return null;
            return v.toString();
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdPassword', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            if (v.length > 0)
                return '********';
            return '';
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdPercentage', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return (v * 100).toFixed(2) + '%';
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdPicture', [function () {
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
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdRef', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return v.toString();
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdText', [function () {
        return function (cfg) {
            return cfg.value.$;
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdTimeShort',
        ['$filter',
            function ($filter) {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;

            var result = {};
            var duration = v.match(/^P([0-9]+Y|)?([0-9]+M|)?([0-9]+D|)?T?([0-9]+H|)?([0-9]+M|)?([0-9]+S|)?$/);

            result.hours = parseInt(duration[4] ? duration[4] : 0);
            result.minutes = parseInt(duration[5] ? duration[5] : 0);
            result.seconds = parseInt(duration[6] ? duration[6] : 0);

            var datetime = new Date('01/01/1999 ' + result.hours + ':' + result.minutes + ':' + result.seconds);
            return $filter('date')(datetime, 'hh:mm a');
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdTimeSpanHhMmSs', [function () {
        return function (cfg) {
            cfg = cfg.children;
            return cfg.hours.value.$ + ' H, ' + cfg.minutes.value.$ + ' M, ' + cfg.seconds.value.$ + '.' + cfg.milliseconds.value.$ + ' S';
        };
    }])
})();
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
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdUsaDollars', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return '$' + v.toFixed(2);
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdUsaSocialSecurity', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return v.substring(0, 3) + '-' + v.substring(3, 5) + '-' + v.substring(5);
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdUsaZip', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            if (v.length > 5)
                return v.substring(0, 5) + '-' + v.substring(5);
            return v;
        };
    }])
})();
angular.module('tru.type.lib').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/common/std-download.html',
    "<div>\r" +
    "\n" +
    "    <form action=\"{{data.url}}\" action=\"POST\">\r" +
    "\n" +
    "        <input type=\"hidden\" name=\"refs\" value=\"{{data.refs}}\">\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('src/templates/edit/std-adorner-edit.html',
    "<div>\r" +
    "\n" +
    "    <input data-ng-focus=\"onFocus()\"\r" +
    "\n" +
    "           type=\"text\"/>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/templates/edit/std-checkbox-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-checked=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-std-indeterminate=\"field.type.isNullable\"\r" +
    "\n" +
    "           type=\"checkbox\">\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-date-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div class=\"ttl-date-wrapper\">\r" +
    "\n" +
    "        <div>\r" +
    "\n" +
    "            <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "                   data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                   data-ng-trim=\"false\"\r" +
    "\n" +
    "                   data-std-date\r" +
    "\n" +
    "                   data-std-calendar display=\"show\"\r" +
    "\n" +
    "                   data-z-validate\r" +
    "\n" +
    "                   type=\"text\"\r" +
    "\n" +
    "                   class=\"ttl-date\"/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <button data-ng-click=\"show = !show\"\r" +
    "\n" +
    "                data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                tabindex=\"-1\"\r" +
    "\n" +
    "                class=\"ttl-date-button\"><i class=\"ttl-date-button-icon ico-calendar\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-datetime-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div class=\"ttl-datetime-wrapper\">\r" +
    "\n" +
    "        <div>\r" +
    "\n" +
    "            <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "                   data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                   data-ng-trim=\"false\"\r" +
    "\n" +
    "                   data-std-datetime=\"field\"\r" +
    "\n" +
    "                   data-std-calendar display=\"show\"\r" +
    "\n" +
    "                   data-z-validate\r" +
    "\n" +
    "                   type=\"text\"\r" +
    "\n" +
    "                   style=\"float:left;width:140px;\"/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <button data-ng-click=\"show = !show\"\r" +
    "\n" +
    "                data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                class=\"ttl-date-button\"\r" +
    "\n" +
    "                tabindex=\"-1\"\r" +
    "\n" +
    "                style=\"float:left\"><i class=\"ttl-date-button-icon ico-calendar\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-datetime-span-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <tru-column>\r" +
    "\n" +
    "        <div style=\"min-width:320px\">\r" +
    "\n" +
    "            <div>\r" +
    "\n" +
    "                <std-datetime-edit label=\"Start\" field=\"field.children.start\"></std-datetime-edit>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div>\r" +
    "\n" +
    "                <std-datetime-edit label=\"End\" field=\"field.children.end\"></std-datetime-edit>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </tru-column>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-decimal-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           std-decimal=\"field\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-dropdown-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <select data-ng-model=\"data.value\"\r" +
    "\n" +
    "            data-ng-options=\"x.value.$ as x.label for x in choices\"\r" +
    "\n" +
    "            data-ng-change=\"onChange()\"\r" +
    "\n" +
    "            data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "            data-z-validate\r" +
    "\n" +
    "            class=\"dropdown control\">\r" +
    "\n" +
    "    </select>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-file-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <button data-ng-click=\"upload()\"\r" +
    "\n" +
    "            data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "            class=\"btn btn_textOnly\">Upload</button>\r" +
    "\n" +
    "    <a data-ng-click=\"download()\"\r" +
    "\n" +
    "       data-ng-disabled=\"!field.value.data\"\r" +
    "\n" +
    "       download=\"\"\r" +
    "\n" +
    "       href=\"\"\r" +
    "\n" +
    "       class=\"anchorElement download btn btn_textOnly\"\r" +
    "\n" +
    "       style=\"font-size: 12px;vertical-align: middle;\">Download</a>\r" +
    "\n" +
    "    <input data-ng-model=\"field.property.data\"\r" +
    "\n" +
    "           data-std-file-change=\"fileChanged($event)\"\r" +
    "\n" +
    "           type=\"file\"\r" +
    "\n" +
    "           class=\"fileElement\"\r" +
    "\n" +
    "           style=\"display:none\"/>\r" +
    "\n" +
    "    <div style=\"overflow:hidden;padding:5px;\">\r" +
    "\n" +
    "        <div class=\"renderElement\"></div>\r" +
    "\n" +
    "        <p data-ng-if=\"noDataMessage\" style=\"color:red;\">{{noDataMessage}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>\r" +
    "\n"
  );


  $templateCache.put('src/templates/edit/std-float-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           std-float=\"field.type.isNullable\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-integer-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-std-integer-only=\"field\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-link-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <a data-ng-click=\"field.goTo()\"\r" +
    "\n" +
    "       data-ng-disabled=\"!field.type.canEdit\"\r" +
    "\n" +
    "       href=\"#\">{{field.value.$}}\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-masked-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input\r" +
    "\n" +
    "           data-ng-model=\"data.value\"\r" +
    "\n" +
    "           data-ng-model-options=\"{ updateOn: 'default blur'}\"\r" +
    "\n" +
    "           data-ng-change=\"onChange()\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-std-mask=\"{{field.property.entryFilter}}\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           placeholder=\"{{field.property.watermark}}\"\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-multiline-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <textarea data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "              data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "              data-ng-trim=\"false\"\r" +
    "\n" +
    "              data-z-validate\r" +
    "\n" +
    "              rows=\"{{field.property.rows}}\"\r" +
    "\n" +
    "              style=\"width:100%;\">\r" +
    "\n" +
    "    </textarea>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-password-edit.html',
    "<div class=\"ttl-password-edit-wrapper\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-password-edit-password-wrapper-not-editing': !field.editor.isEditing, 'ttl-password-edit-password-wrapper-editing': field.editor.isEditing}\" class=\"ttl-password-edit-password-wrapper\">\r" +
    "\n" +
    "            <tru-label label=\"{{label}}\">\r" +
    "\n" +
    "                <input data-ng-show=\"!field.editor.isEditing\"\r" +
    "\n" +
    "                       placeholder=\"{{readOnlyPasswordPlaceHolder}}\"\r" +
    "\n" +
    "                       type=\"password\"\r" +
    "\n" +
    "                       readonly />\r" +
    "\n" +
    "                <input data-ng-model=\"data.password\"\r" +
    "\n" +
    "                       data-ng-show=\"field.editor.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-ng-mouseenter=\"mouseEnter()\"\r" +
    "\n" +
    "                       data-ng-mouseleave=\"mouseLeave()\"\r" +
    "\n" +
    "                       data-ng-class=\"{'ttl-invalid-input': invalid}\"\r" +
    "\n" +
    "                       data-ng-change=\"onChange()\"\r" +
    "\n" +
    "                       placeholder=\"{{passwordPlaceHolder}}\"\r" +
    "\n" +
    "                       type=\"password\" />\r" +
    "\n" +
    "            <span class=\"ttl-invalid-indicator\" data-ng-show=\"field.editor.isEditing && invalid && mouseOver\">\r" +
    "\n" +
    "                <i class=\"icon-warning-sign icon-white\"></i>{{invalidMessage}}\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "        </tru-label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-password-edit-password-confirm-wrapper-not-editing': !field.editor.isEditing}\" class=\"ttl-password-edit-password-confirm-wrapper\">\r" +
    "\n" +
    "        <tru-label label=\"Confirm {{label}}\" data-ng-if=\"field.editor.isEditing\">\r" +
    "\n" +
    "            <input data-ng-model=\"data.confirmPassword\"\r" +
    "\n" +
    "                   data-ng-trim=\"false\"\r" +
    "\n" +
    "                   data-ng-mouseenter=\"mouseEnter()\"\r" +
    "\n" +
    "                   data-ng-mouseleave=\"mouseLeave()\"\r" +
    "\n" +
    "                   data-ng-class=\"{'ttl-invalid-input': invalid}\"\r" +
    "\n" +
    "                   data-ng-change=\"onConfirmChange()\"\r" +
    "\n" +
    "                   placeholder=\"Confirm Password\"\r" +
    "\n" +
    "                   type=\"password\" />\r" +
    "\n" +
    "        </tru-label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/templates/edit/std-percent-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-std-percent=\"field\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-text-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <p>{{field.value.$}}</p>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-textbox-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           maxlength=\"{{field.type.property.maxLength}}\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "           />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-time-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div style=\"float:left\">\r" +
    "\n" +
    "            <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "                   data-std-duration\r" +
    "\n" +
    "                   data-std-duration-period=\"data.period\"\r" +
    "\n" +
    "                   data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                   data-ng-trim=\"false\"\r" +
    "\n" +
    "                   data-z-validate\r" +
    "\n" +
    "                   placeholder=\"__:__\"\r" +
    "\n" +
    "                   type=\"text\"\r" +
    "\n" +
    "                   class=\"text text_full ttl-time\"/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <button data-ng-click=\"setPeriod()\"\r" +
    "\n" +
    "                data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                class=\"ttl-time-button\"\r" +
    "\n" +
    "                style=\"float:left\">{{data.period}}\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-usa-address-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 1\" field=\"field.children.address1\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 2\" field=\"field.children.address2\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px;width:100%;\">\r" +
    "\n" +
    "        <div style=\"float:left;width: calc(100% - 255px);\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"City\" field=\"field.children.city\"></std-textbox-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:115px\">\r" +
    "\n" +
    "            <std-dropdown-edit label=\"State\" field=\"field.children.state\"></std-dropdown-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:140px\">\r" +
    "\n" +
    "            <std-masked-edit label=\"Zip\" field=\"field.children.zip\"></std-masked-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('src/templates/edit/std-usa-dollar-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-std-usa-dollar=\"field\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/list/std-checkbox-list-edit.html',
    "<div>\r" +
    "\n" +
    "    <div class=\"ttl-checkbox-list-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-checked=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-disabled=\"!field.editor.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "               data-std-indeterminate=\"field.type.isNullable\"\r" +
    "\n" +
    "               class=\"ttl-checkbox-list\"\r" +
    "\n" +
    "               type=\"checkbox\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('src/templates/list/std-checkbox-list.html',
    "<div>\r" +
    "\n" +
    "    <div class=\"ttl-checkbox-list-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "        data-std-indeterminate=\"field.type.isNullable\"\r" +
    "\n" +
    "        readonly=\"readonly\"\r" +
    "\n" +
    "        onfocus=\"this.blur();\"\r" +
    "\n" +
    "        onkeydown=\"return false\"\r" +
    "\n" +
    "        onclick=\"this.checked=!this.checked;\"\r" +
    "\n" +
    "        tabindex=\"-1\"\r" +
    "\n" +
    "        class=\"ttl-checkbox-list\"\r" +
    "\n" +
    "        type=\"checkbox\"/>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/templates/list/std-text-list.html',
    "<div>\r" +
    "\n" +
    "    <p>{{field.value.$}}</p>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('src/templates/query/std-boolean-dropdown-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined() || !valueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "        <select data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "                data-ng-disabled=\"field.editor.isEditing\"\r" +
    "\n" +
    "                data-ng-options=\"x.value.$ as x.label for x in choices\"\r" +
    "\n" +
    "                data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "                std-select-value-converter\r" +
    "\n" +
    "                class=\"dropdown control\"\r" +
    "\n" +
    "                >\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{data.label}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-checkbox-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined() || !valueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-checkbox-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.editor.isEditing\"\r" +
    "\n" +
    "               data-std-indeterminate\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               type=\"checkbox\"/>\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-date-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': field.value.$}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"field.value.$ = undefined\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.editor.isEditing\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-date\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-date-range-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-start\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.startDate}\" class=\"ttl-operator-icon-wrapper\" title=\"{{startOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"startOperatorImage\" data-ng-click=\"onStartOperatorClick()\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.startDate\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.startValue || field.editor.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-date\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       >\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-end\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.endDate}\" class=\"ttl-operator-icon-wrapper\" title=\"{{endOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon ttl-integer-range-query-end-icon\" data-ng-class=\"endOperatorImage\" data-ng-click=\"onEndOperatorClick()\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"ttl-integer-range-query-end-input-wrapper\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.endDate\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.endValue || field.editor.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-date\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       >\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-date-span-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-start\">\r" +
    "\n" +
    "            <std-date-query label=\"\" field=\"field.children.start\"></std-date-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-end\">\r" +
    "\n" +
    "            <std-date-query label=\"\" field=\"field.children.end\"></std-date-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-datetime-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': field.value.$}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"field.value.$ = undefined\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.editor.isEditing\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-date\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-datetime-range-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-start\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.startValue}\" class=\"ttl-operator-icon-wrapper\" title=\"{{startOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"startOperatorImage\" data-ng-click=\"data.startValue = undefined\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.startDate\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.startValue || field.editor.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-date\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.startDate\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.endValue\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-time\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-end\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.endValue}\" class=\"ttl-operator-icon-wrapper\" title=\"{{endOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon ttl-integer-range-query-end-icon\" data-ng-class=\"endOperatorImage\" data-ng-click=\"data.endValue = undefined\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"ttl-integer-range-query-end-input-wrapper\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.endDate\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.endValue || field.editor.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-date\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.endDate\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.endValue\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-time\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-datetime-span-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-start\">\r" +
    "\n" +
    "            <std-datetime-query label=\"Zip\" field=\"field.children.zip\"></std-datetime-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-end\">\r" +
    "\n" +
    "            <std-integer-query label=\"Zip\" field=\"field.children.zip\"></std-integer-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-decimal-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-integer-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.editor.isEditing\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-decimal=\"field\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-dropdown-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined() || !valueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "        <select data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "                data-ng-disabled=\"field.editor.isEditing\"\r" +
    "\n" +
    "                data-ng-options=\"x.value.$ as x.label for x in data.choices\"\r" +
    "\n" +
    "                data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "                std-select-value-converter\r" +
    "\n" +
    "                class=\"dropdown control\"\r" +
    "\n" +
    "                >\r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{data.label}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-float-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-integer-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.editor.isEditing\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-float=\"field.type.isNullable\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-integer-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-integer-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.editor.isEditing\"\r" +
    "\n" +
    "               data-ng-model-options=\"{allowInvalid:true}\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-integer-only=\"field\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-integer-range-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-start\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.startValue}\" class=\"ttl-operator-icon-wrapper\" title=\"{{startOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"startOperatorImage\" data-ng-click=\"data.startValue = undefined\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.startValue\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.startValue || field.editor.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-integer-only=\"field\"\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-end\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.endValue}\" class=\"ttl-operator-icon-wrapper\" title=\"{{endOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon ttl-integer-range-query-end-icon\" data-ng-class=\"endOperatorImage\" data-ng-click=\"data.endValue = undefined\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"ttl-integer-range-query-end-input-wrapper\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.endValue\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.endValue || field.editor.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-integer-only=\"field\"\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-or-list-checkbox-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': checked || !valueIsUndefined() }\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-or-list-checkbox-query-wrapper\">\r" +
    "\n" +
    "        <ul class=\"hList tickGroup\" data-ng-if=\"valueIsUndefined()\">\r" +
    "\n" +
    "            <li data-ng-repeat=\"choice in data.choices\">\r" +
    "\n" +
    "                <label class=\"checkbox\">\r" +
    "\n" +
    "                    <input class=\"ttl-or-list-checkbox\" type=\"checkbox\" data-ng-model=\"choice.checked\" data-ng-disabled=\"field.editor.isEditing\"/>{{choice.label}}\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{data.labels.join()}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-percent-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-integer-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.editor.isEditing\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-percent=\"field\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-radio-list-button-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': checked || !valueIsUndefined() }\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-radio-list-button-wrapper\">\r" +
    "\n" +
    "        <form data-ng-if=\"valueIsUndefined()\">\r" +
    "\n" +
    "            <ul class=\"hList tickGroup\">\r" +
    "\n" +
    "                <li data-ng-repeat=\"choice in data.choices\">\r" +
    "\n" +
    "                    <label class=\"checkbox\">\r" +
    "\n" +
    "                        <input type=\"radio\" name=\"$parent.label\" data-ng-model=\"choice.checked\" data-ng-value=\"true\" data-ng-disabled=\"field.editor.isEditing\"/>{{choice.label}}\r" +
    "\n" +
    "                    </label>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{data.labels.join()}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-textbox-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-textbox-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.editor.isEditing\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "               style=\"\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-usa-address-query.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <std-textbox-query label=\"Address 1\" field=\"field.children.address1\"></std-textbox-query>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-textbox-query label=\"Address 2\" field=\"field.children.address2\"></std-textbox-query>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px;width:100%;\">\r" +
    "\n" +
    "        <div style=\"float:left;width: calc(100% - 255px);\">\r" +
    "\n" +
    "            <std-textbox-query label=\"City\" field=\"field.children.city\"></std-textbox-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:115px\">\r" +
    "\n" +
    "            <std-dropdown-query label=\"State\" field=\"field.children.state\"></std-dropdown-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:140px\">\r" +
    "\n" +
    "            <std-integer-query label=\"Zip\" field=\"field.children.zip\"></std-integer-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-usa-dollar-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-integer-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.editor.isEditing\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-usa-dollar=\"field\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );

}]);
