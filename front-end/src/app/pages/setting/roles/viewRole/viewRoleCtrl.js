/**
 * @author Tabib Omer - Tabibboss LTD
 * created on 12/16/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting.roles')
    .controller('viewRoleCtrl', viewRoleCtrl)
      .directive('baS', baS);

  /** @ngInject */


  function baS() {
   return {
        restrict: 'E',
        scope: {
            color1: '=',
            updateFn: '&'
        },
        template: "<button ng-click='updateFn({msg:\"Hello5orld!\"})'>Click</button>",
        replace: true,        
        link: function(scope, elm, attrs) {             
        }
    }
  }


  function viewRoleCtrl($scope, $http, $filter, toastr, editableOptions, editableThemes,localStorage,myRoleToView) {

    var dataUser = localStorage.getObject('dataUser');
    $scope.MyRole = myRoleToView.MyRole;
    $scope.MyRoleData = myRoleToView.MyRoleData;
    

    $scope.item = {
        bgcolor: "33",
      };
      // console.log($scope.Tabib);

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

    readRoleDataByID();


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
            case 'success':
                    toastr.success("ההרשאה נשמרה בהצלחה");
                  break;

            case 'error':
                    toastr.error(response.data.msg);
                  break;

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


  }
})();