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