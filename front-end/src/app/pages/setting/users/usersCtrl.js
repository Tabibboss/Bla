/**
 * @author Tabib Omer - Tabibboss LTD
 * created on 12/16/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting.users')
    .controller('usersCtrl', usersCtrl).factory('myUserToView', function() {
    return {
      MyUser: '',
    }
});




  function usersCtrl($scope, $http, $filter, toastr, editableOptions, editableThemes,localStorage,$uibModal, baProgressModal,myUserToView) {

  var dataUser = localStorage.getObject('dataUser');

      $scope.expandMessage = function(message){
      message.expanded = !message.expanded;
    }
  // $scope.MyRole = shareLocalData.AllUsers;

$scope.open = function (page, size,rowform) {
  // $scope.MyUser = myUserToView.MyUser;

  myUserToView.MyUser = rowform;

  // console.log(myRoleToView);
  // console.log($scope.MyRoleData);

  $uibModal.open({
    animation: true,
    templateUrl: page,
    size: size,
    backdrop: 'static',
    scope: $scope
  });
};

$scope.AreYouSureBroToDeleteUser = function (premData,indexer) {

  var WhatHappaned = $uibModal.open({
    animation: true,
    templateUrl: 'app/pages/setting/users/widgets/AreYouSureBroToDeleteUser.html',
    size: '',
    backdrop: 'static',
  });

  WhatHappaned.result.then(function () {
    // console.info('no');
  }, function () {
    // console.info('ok');

    $scope.CancelNewUser(premData,indexer);
 });
};




var readRoles = function() {
      $http.get('http://localhost/System/Roles/?Action=GetAllRoles&Token='+dataUser.token).then(
      // $http.get('http://localhost:4000/api/usuarios').then(
        function SuccessfulReading(response) {
          $scope.AllGroupRoles = response.data.data;        
        }, 
        function ErrorReading(error) {
          console.log(error);
          toastr.error("שגיאה בקבלת מידע על הקבוצות");
        });
    };

// $scope.getTotal = function(){
//     var total = 0;
//     for(var i = 0; i < $scope.cart.products.length; i++){
//         var product = $scope.cart.products[i];
//         total += (product.price * product.quantity);
//     }
//     return total;
// }
// $scope.AllUsers = shareLocalData.AllUsers;

var readUsers = function() {
      $http.get('http://localhost/System/users/?Action=GetAllUsers&Token='+dataUser.token).then(
      // $http.get('http://localhost:4000/api/AllGroupRoles').then(
        function SuccessfulReading(response) {

          switch(response.data.status) {
            case 'success':
                    $scope.AllUsers = response.data.data.users;        
                    $scope.AllGroups = response.data.data.groups;
                    // shareLocalData.AllUsers = $scope.AllUsers;
                  break;
            case 'error':
                    toastr.error(response.data.msg);
                  break;

          }

          // console.log(response.data.status);
        
          // $scope.AllGroups = response.data.data.Groups;       
          // $scope.AllSubGroups = response.data.data.SubGroups;       
          // $scope.AllApps = response.data.data.Apps;       
          // console.log($scope.AllUsers); 
          // console.log($scope.AllGroupRoles);
        }, 
        function ErrorReading(error) {
          // console.log(error);
          toastr.error("שגיאה בקבלת מידע על כל ההרשאות");
        });
    };






    readRoles();
    readUsers();



   

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

function removeByKey(array, params){
  array.some(function(item, index) {
    return (array[index][params.key] === params.value) ? !!(array.splice(index, 1)) : false;
  });
  return array;
}



function getIndexByHash(AllArray, Hash) {
  var found = AllArray.find(function(item){return item.$$hashKey === Hash});
    return AllArray.indexOf(found);
}

    $scope.SaveUser = function(forms,index) {
      forms.$data["id"] = index.id;
      $http.post('http://localhost/System/users/?Action=SaveUser&Token='+dataUser.token, forms.$data).then(
        function insertedSuccessful(response) {

          switch(response.data.status) {
            case 'success':

                    switch(response.data.type) {
                      case 'insert':
                              // var KeyToChange = $scope.AllGroupRoles.findIndex(obj => { return obj.$$hashKey === index.$$hashKey});
                              var KeyToChange = getIndexByHash($scope.AllUsers,index.$$hashKey);
                              console.log(KeyToChange);
                              $scope.AllUsers[KeyToChange] = response.data.data;
                              // shareLocalData.AllUsers = $scope.AllUsers;
                              toastr.success("המשתמש נוצר בהצלחה");
            
                            break;
                      case 'update':
                              toastr.success("המשתמש נערך בהצלחה");
                            break;
                    }

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

    $scope.addUser = function() {
      $scope.inserted = {
        id: '',
        UserName: '',
        FirstName: '',
        LastName: '',
        roles: ''
      };
      $scope.AllUsers.push($scope.inserted);
    };

 



    $scope.CancelNewUser = function(Group,indexer) {
      $scope.AllUsers.splice(indexer, 1);

      $http.post('http://localhost/System/users/?Action=CancelNewUser&Token='+dataUser.token, Group).then(
        function CancelSuccessful(response) {

          switch(response.data.status) {
            case 'success':
                    toastr.success("המשתמש נמחק בהצלחה");
                  break;

            case 'error':
                    $scope.AllUsers.push(Group);
                    toastr.error(response.data.msg);
                  break;

          }

        },
        function CancelError(error) {
          $scope.AllUsers.push(Group);
          toastr.error("שגיאה, יש לנסות שנית");
        });
    };




    $scope.showSubGroup = function(data) {
      // console.log('data');
      // console.log(data);
      if(data.sub_group_id && $scope.AllSubGroups.length) {

        var selected = $filter('filter')($scope.AllSubGroups, {
          sub_group_id: data.sub_group_id,
          // group_id: data.group_id
        });

        return selected.length ? selected[0].sub_group_desc : '';
      } else return ''
    };



    $scope.showGroup = function(data) {
      if(data.group_id && $scope.AllGroups.length) {

        var selected = $filter('filter')($scope.AllGroups, {group_id: data.group_id});
        
        return selected.length ? selected[0].group_desc : '';
      } else return ''
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
      }
      return selected.length ? selected[0].text : '';
    };




    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';






  }
})();