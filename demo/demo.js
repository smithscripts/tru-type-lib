var module = angular.module('app',
    [
      'ngRoute',
      'ngAnimate',
      'tru.view.lib',
      'tru.type.lib',
      'edit.data.model',
      'query.data.model',
      'ui.bootstrap'
    ]);

module.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/Search', {
          templateUrl: 'search.html'
        }).
        when('/Edit', {
          templateUrl: 'edit.html'
        }).
        when('/Home', {
          templateUrl: 'home.html'
        }).
        otherwise({
          redirectTo: '/Home'
        });
  }]);

module.controller('demoController', function($scope, queryDataModel) {
  $scope.data = { value: undefined };
});

//Search Controllers

module.controller('textboxQueryController', function($scope, queryDataModel) {
  $scope.dataModel = new queryDataModel;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('decimalQueryController', function($scope, queryDataModel) {
  $scope.dataModel = new queryDataModel;
  $scope.dataModel.decimalPlaces = 5;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('floatQueryController', function($scope, queryDataModel) {
  $scope.dataModel = new queryDataModel;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('dropdownQueryController', function($scope, queryDataModel) {
  $scope.dataModel = new queryDataModel;
  $scope.dataModel.isNullable = true;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('booleanDropdownQueryController', function($scope, queryDataModel) {
  $scope.dataModel = new queryDataModel;
  $scope.dataModel.defaultValue = null;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('usaDollarQueryController', function($scope, queryDataModel) {
  $scope.dataModel = new queryDataModel;
  $scope.dataModel.decimalPlaces = 2;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('integerQueryController', function($scope, queryDataModel) {
  $scope.dataModel = new queryDataModel;
  $scope.dataModel.operator = 'greater-than';
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('integerRangeQueryController', function($scope, queryDataModel) {
  $scope.dataModel = new queryDataModel;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('checkboxQueryController', function($scope, queryDataModel) {
  $scope.dataModel = new queryDataModel;
  //$scope.dataModel.default = false;
  $scope.dataModel.propertyValue = false;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('orListCheckboxQueryController', function($scope, queryDataModel) {
  $scope.dataModel = new queryDataModel;
  $scope.dataModel.defaultValue = [2,3];
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('radioListButtonQueryController', function($scope, queryDataModel) {
  $scope.dataModel = new queryDataModel;
  $scope.dataModel.default = 4;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('datetimeRangeQueryController', function($scope, queryDataModel) {
  var setDefaultValues = function() {
    $scope.dataModel = new queryDataModel;
    $scope.dataModel.startDefault = '2014-10-30T13:00';
    $scope.dataModel.endDefault = '2014-11-30T13:00';
    $scope.dataModel.startDateInclusive = 'greater-than-or-equal';
    $scope.dataModel.endDateInclusive = 'less-than-or-equal';
    $scope.fields = $scope.dataModel.getFields();
  };

  $scope.startValue = false;
  $scope.setStartValue = function() {
    if ($scope.startValue) {
      $scope.dataModel = new queryDataModel;
      $scope.dataModel.startDefault = undefined;
      $scope.dataModel.startValue = '2014-11-30T13:00';
      $scope.fields = $scope.dataModel.getFields();
    } else {
      setDefaultValues();
    }
  };

  $scope.init = function() {
    setDefaultValues();
  };

  $scope.init();
});

//Edit Controllers
module.controller('fileEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.children = {
    filename: {
      value: { $: 'test.jpg' }
    },
    mimeType: {
      type: {
        queryChoices: function() {
          return {
            then: function(fn) {
              var results =  [
                { value: { $: 1 }, label: 'image/jpeg' },
                { value: { $: 2 }, label: 'image/png' }
              ];
              fn(results);
            }
          }
        }
      },
      value: { $: 1 }
    }
  };
  $scope.fields = $scope.dataModel.getFields();
});


module.controller('checkboxEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value = true;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('decimalEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value = 0.005;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('dropdownEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.queryChoices = function() {
    return {
      then: function(fn) {
        var results =  [
          { value: { $: 1 }, label: 'High - 1' },
          { value: { $: 2 }, label: '2' },
          { value: { $: 3 }, label: '3' },
          { value: { $: 4 }, label: '4' },
          { value: { $: 5 }, label: 'Low - 5' }
        ];
        fn(results);
      }
    }
  };
  $scope.dataModel.value = 5;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('floatEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value = '1.1234A' ;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('integerEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value =  undefined;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('linkEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.mockValue = 6128452301;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('maskedEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value = 6128452301;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('multilineEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value = 'This is some text';
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('passwordEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value = 'secretPassword';
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('percentEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value = 1.1234;
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('textEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value = 'This is some text';
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('textboxEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value = 'This is some text';
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('dateEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value = new Date('2014-10-30T13:00');
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('timeEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.value = 'PT10H30M';
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('datetimeEditController', function($scope, editDataModel) {
  $scope.dataModel = new editDataModel;
  $scope.dataModel.fieldProperty['militaryTime'] = false;
  $scope.dataModel.fieldProperty['period'] = 'AM';
  $scope.dataModel.value = new Date();
  $scope.fields = $scope.dataModel.getFields();
});

module.controller('usaAddressEditController', function($scope, editDataModel) {
  var dataModel = new editDataModel;

  dataModel.children = {
    address1: {
      editor: editor,
      value: {
        $: '1234 Blah Street NW'
      },
      type: {
        canDisplay: true,
        canEdit: true
      }
    },
    address2: {
      editor: editor,
      value: {
        $: '0001 Blah Blah Lane S'
      },
      type: {
        canDisplay: true,
        canEdit: true
      }
    },
    city: {
      editor: editor,
      value: {
        $: 'Minneapolis'
      },
      type: {
        canDisplay: true,
        canEdit: true
      }
    },
    state: {
      editor: editor,
      value: {
        $: 2
      },
      type: {
        property: {

        },
        queryChoices: function() {
          return {
            then: function() {
              return  [
                { value: { $: 1 }, label: 'High - 1' },
                { value: { $: 2 }, label: '2' },
                { value: { $: 3 }, label: '3' },
                { value: { $: 4 }, label: '4' },
                { value: { $: 5 }, label: 'Low - 5' }
              ]
            }
          }
        },
        choices: [
          { value: { $: 1 }, label: 'Iowa' },
          { value: { $: 2 }, label: 'Minnesota' },
          { value: { $: 3 }, label: 'Wisconsin' }
        ],
        canDisplay: true,
        canEdit: true
      }
    },
    zip: {
      editor: editor,
      value: {
        $: 55422
      },
      property: {
        entryFilter: '999999',
        waterMark: '_____'
      },
      type: {
        canDisplay: true,
        canEdit: true,
        entryFilter: '99999-9999',
        watermark: '_____-____'
      }
    }
  };

  var fields = dataModel.getFields();

  var editor = {};
  Object.defineProperty(editor, "isEditing", { get: function () { return $scope.isEditing; } });
  Object.freeze(editor);

  fields.Field1.editor = editor;
  fields.Field1.type.entryFilter = '99999-9999';
  fields.Field1.type.watermark = '_____-____';

  $scope.fields = fields;
});

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});