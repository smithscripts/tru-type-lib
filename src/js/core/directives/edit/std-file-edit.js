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