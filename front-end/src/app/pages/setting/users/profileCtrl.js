/**
 * @author Tabib Omer - Tabibboss LTD
 * created on 12/16/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting.UserProfile')
    .controller('profileCtrl', profileCtrl).factory('myUserToView', function() {
    return {
      MyUser: '',
    }
});




  function profileCtrl($rootScope, $scope, $http, $filter,$stateParams,$document, fileReader, toastr, editableOptions, editableThemes,localStorage,$uibModal, baProgressModal,myUserToView) {


  var dataUser = localStorage.getObject('dataUser');

  if($stateParams.id) {
  $scope.UserID = $stateParams.id;
  } else {
   $scope.UserID = dataUser.uid;
  }

  
  $scope.picture = $filter('profilePicture')($scope.UserID);
  $scope.Blas = {
    Name: '',
    NewPath: '',
    abstract: true,
    title: $scope.UserID,
    url: '',
    url2: '',
  };




  $scope.AllNavKeys = $rootScope.MyCurrentStatesTabibboss.map(function(o, key) {
    return key;
  });

  $scope.maxKeyOfNav = Math.max.apply(Math, $scope.AllNavKeys);
  




  // $rootScope.MyCurrentStatesTabibboss.push($scope.Blas);

  // console.log($scope.Blas);
  // console.log($rootScope.MyCurrentStatesTabibboss);

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

function FixDataLabelForSelectByKeys(ArrayId, ArrayValue){
  var NewArray = [];
  angular.forEach(ArrayId, function(IdValue, key) {

    var MiniArray = {};

    MiniArray['value'] = IdValue;
    MiniArray['label'] = ArrayValue[key];

    NewArray.push(MiniArray);
  });
  return NewArray;
}


var readFullUserData = function() {
      $http.get('http://localhost/System/users/?Action=readFullUserData&user_id='+$scope.UserID+'&Token='+dataUser.token).then(
      // $http.get('http://localhost:4000/api/usuarios').then(
        function SuccessfulReading(response) {

          switch(response.data.status) {
            case 'success':


                    $scope.AllFullUserData = response.data.data.UserData[0];
                    $scope.AllGroups = response.data.data.groups;
                    $rootScope.MyCurrentStatesTabibboss[$scope.maxKeyOfNav]['title'] = $scope.AllFullUserData.FirstName +' '+ $scope.AllFullUserData.LastName; 
                    
                    $scope.AllFullUserData.RolesName = $scope.AllFullUserData.RolesName.split(',');
                    $scope.AllFullUserData.RolesId = $scope.AllFullUserData.RolesId.split(',');

                    $scope.AllUserGroups = FixDataLabelForSelectByKeys($scope.AllFullUserData.RolesId, $scope.AllFullUserData.RolesName);








          // console.log(attrs);
          // console.log('ngModel');
          // console.log(ngModel);
          // var checkForChange$watcher = scope.$watch(attrs.checkForChange, function(newValue, oldValue) {

            // console.log('oldValue');
            // console.log(oldValue);
            // console.log('newValue');
            // console.log(newValue);

            // if(newValue != oldValue) {
            //   ngModel.$setViewValue(newValue);
            //   ngModel.$render();
            // }
          // });

          // When $destroy is fired stop watching the change.
          // If you don't, and you come back on your state
          // you'll have two watcher watching the same properties
          // scope.$on('$destroy', function() {
          //     checkForChange$watcher();
          // });



                    // $scope.AllFullUserDataOriginalData = JSON.stringify($scope.AllFullUserData);

                    // var $locationChangeStartUnbind = $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    //     // if ($scope.AllFullUserDataOriginalData !== JSON.stringify($scope.AllFullUserData)) {
                    //         //Show alert and prevent state change
                    //         console.log('UBka fg ');
                    //         console.log('User Data Change change');

                    //     // } else {
                    //         console.log('NO CHANGES IN User Data');
                    //         //DO NOTHING THERE IS NO CHANGES IN THE FORM
                    //     // }
                    // });



                    // $scope.$on('$destroy', function () {
                    //     window.onbeforeunload = null;
                    //     $locationChangeStartUnbind();
                    // });




                  break;
            case 'error':
                    toastr.error(response.data.msg);
                  break;

          }

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
                    // $scope.AllGroups = response.data.data.groups;
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






    readFullUserData();
    // readUsers();



   

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
                              // console.log(KeyToChange);
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


    $scope.sumbitUserProfile = function() {
      var inputs = $document[0].querySelectorAll('.panel-content input, .panel-content select');
      
      inputs.forEach(function(input) {
        console.log(input.name + ': ' + input.value);
      });











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



    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };


    $scope.getFile = function () {
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
          });
    };


    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

  }
})();