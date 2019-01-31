/**
 * @author Tabib Omer - Tabibboss LTD
 * created on 12/16/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting.users')
  .filter('groupSelectpickerOptions', GroupSelectpickerOptions)
    .controller('userSettingCtrl', userSettingCtrl);

  /** @ngInject */



function GroupSelectpickerOptions() {
    return function (items, props) {
      var out = [];

      if (angular.isArray(items)) {
        var keys = Object.keys(props);

        items.forEach(function (item) {
          var itemMatches = false;

          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }

      return out;
    };
  }

  
  function userSettingCtrl($scope, $http, $filter,$timeout, toastr, editableOptions, editableThemes,localStorage,myUserToView) {

    var dataUser = localStorage.getObject('dataUser');
    $scope.MyUser = myUserToView.MyUser;
    // $scope.MyRoleData = myRoleToView.MyRoleData;
    
    $scope.progressFunction = function() {
      return $timeout(function() {}, 3000);
    };




    $scope.item = {
        bgcolor: "33",
      };
      console.log('MyUser');
      console.log($scope.MyUser);

     $scope.DoIt = function(index) {
      // $scope.usuarios.splice(index, 1);
      console.log('index555');
    };

    $scope.DoSome = function() {
      $scope.inserted = {
        role_id: '',
        role_desc: '',
        role_name: ''
      };
      $scope.usuarios.push($scope.inserted);
    };


var readRoleDataByID = function() {
      $http.get('http://localhost/System/Roles/?Action=GetDataByRole&role_id='+$scope.MyRole.role_id+'&Token='+dataUser.token).then(
        function SuccessfulReading(response) {

        var AllGroups = {};  
        var AllSubGroups = [];  

        angular.forEach(response.data.data, function(value, key) {
          var Suby= {};
          var NewStatus = false;
          if(value.status === 'true' || value.status === true) {
            NewStatus = true;
          }
          
          response.data.data[key]['status'] = NewStatus;
          AllGroups[value.group_id] = value.group_desc;

          var obj = $filter('filter')(AllSubGroups, {sub_group_id: value.sub_group_id}, true)[0];
          if(typeof(obj) != 'object') {
            Suby['group_id'] = value.group_id;
            Suby['sub_group_id'] = value.sub_group_id;
            Suby['sub_group_desc'] = value.sub_group_desc;
          }

          AllSubGroups.push(Suby);
        });


         $scope.AllGroupsCats = AllGroups;
         $scope.AllSubGroupsCats = AllSubGroups;

        $scope.MyRoleData = response.data.data;
        myRoleToView.MyRoleData = response.data.data;    
        }, 
        function ErrorReading(error) {
          console.log(error);
          toastr.error("Error al obtener usuarios del servidor");
        });
    };

    // readRoleDataByID();


    $scope.ColorType = [
      'primary',
      'success',
      'info',
      'warning',
      'danger',
      ];

    $scope.ColorTypeCode = {
      primary: '#4db1a7',
      success: '#90b900',
      info: '#2692b2',
      warning: '#dfb81c',
      danger: '#e85656'
      };

      // console.log($scope);


    $scope.UpdateSwitchRoles = function(perm_id,perm_val,cat_id) {
      // forms.$data["role_id"] = index.role_id;
      // console.log(perm_val);
      // console.log(perm_id);

      var NewVal = '1';

      if(perm_val === true) {
        NewVal = '0';
      }

       var Data = {
        perm_val: NewVal,
        perm_id: perm_id,
        cat_id: cat_id,
      };

      $http.post('http://localhost/System/Roles/?Action=UpdateSwitchRoles&Token='+dataUser.token, Data).then(
        function insertedSuccessful(response) {
            // console.log(response);
          switch(response.data.status) {
            case 'ok':
                  toastr.success("ההרשאה נשמרה בהצלחה");
                  break;

              default:
              toastr.error("שגיאה, יש לנסות שנית");
          }

        },
        function insertedError(error) {
          toastr.error("שגיאה, יש לנסות שנית");
        });
    };





   $scope.color1 = "color";
    $scope.updateFn = function(msg) {        
        alert(msg);
        console.log('jj');
    }

  $scope.oneAtATime = true;
  $scope.obj = {
    isopen: true,
    isAllOpen: false
  };























    var vm = this;
    vm.disabled = undefined;


    $scope.standardItem = {};
    $scope.standardSelectItems = [
      {label: 'Option 1', value: 1},
      {label: 'Option 2', value: 2},
      {label: 'Option 3', value: 3},
      {label: 'Option 4', value: 4}
    ];

    $scope.withSearchItem = {};

    $scope.selectWithSearchItems = [
      {label: 'Hot Dog, Fries and a Soda', value: 1},
      {label: 'Burger, Shake and a Smile', value: 2},
      {label: 'Sugar, Spice and all things nice', value: 3},
      {label: 'Baby Back Ribs', value: 4}
    ];
    $scope.groupedItem = {};
    $scope.groupedSelectItems = [
      {label: 'Group 1 - Option 1', value: 1, group: 'Group 1'},
      {label: 'Group 2 - Option 2', value: 2, group: 'Group 2'},
      {label: 'Group 1 - Option 3', value: 3, group: 'Group 1'},
      {label: 'Group 2 - Option 4', value: 4, group: 'Group 2'}
    ];

    $scope.groupedByItem = {};
    $scope.groupedBySelectItems = [
      {name: 'Adam', country: 'United States'},
      {name: 'Amalie', country: 'Argentina'},
      {name: 'Estefanía', country: 'Argentina'},
      {name: 'Adrian', country: 'Ecuador'},
      {name: 'Wladimir', country: 'Ecuador'},
      {name: 'Samantha', country: 'United States'},
      {name: 'Nicole', country: 'Colombia'},
      {name: 'Natasha', country: 'Ecuador'},
      {name: 'Michael', country: 'Colombia'},
      {name: 'Nicolás', country: 'Colombia'}
    ];
    $scope.someGroupFn = function (item) {

      if (item.name[0] >= 'A' && item.name[0] <= 'M')
        return 'From A - M';
      if (item.name[0] >= 'N' && item.name[0] <= 'Z')
        return 'From N - Z';
    };

    $scope.disableItem = {};
    $scope.disableItems = [];

    $scope.multipleItem = {};
    $scope.multipleSelectItems = [
      {label: 'Option 1', value: 1},
      {label: 'Option 2', value: 2},
      {label: 'Option 3', value: 3},
      {label: 'Option 4', value: 4},
      {label: 'Option 5', value: 5},
      {label: 'Option 6', value: 6},
      {label: 'Option 7', value: 7},
      {label: 'Option 8', value: 8}
    ];
    $scope.withDeleteItem = {};
    $scope.withDeleteSelectItems = [
      {label: 'Option 1', value: 1},
      {label: 'Option 2', value: 2},
      {label: 'Option 3', value: 3},
      {label: 'Option 4', value: 4},
      {label: 'Option 5', value: 5},
      {label: 'Option 6', value: 6},
      {label: 'Option 7', value: 7},
      {label: 'Option 8', value: 8}
    ];




























  }
})();