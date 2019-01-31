/**
 * @author Tabib Omer - Tabibboss LTD
 * created on 12/16/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting.roles')
    .controller('rolesCtrl', rolesCtrl).factory('myRoleToView', function() {
    return {
      MyRole: '',
      MyRoleData: ''
    }
});

  /** @ngInject */



  function rolesCtrl($scope, $http, $filter, toastr, editableOptions, editableThemes,localStorage,$uibModal, baProgressModal, myRoleToView) {

  var dataUser = localStorage.getObject('dataUser');



$scope.open = function (page, size,rowform) {
  $scope.MyRole = myRoleToView.MyRole;
  $scope.MyRoleData = myRoleToView.MyRoleData;
  myRoleToView.MyRole = rowform;

  // console.log(myRoleToView);
  // console.log($scope.MyRoleData);

  $uibModal.open({
    animation: true,
    templateUrl: page,
    size: size,
    scope: $scope
  });
};


$scope.AreYouSureBroToDeleteGroup = function (groupData,indexer) {

  var WhatHappaned = $uibModal.open({
    animation: true,
    templateUrl: 'app/pages/setting/roles/widgets/AreYouSureToDeleteGroup.html',
    size: '',
    backdrop: 'static',
  });

  WhatHappaned.result.then(function () {
    console.info('no');
  }, function () {
    console.info('ok');

    $scope.CancelNewGroup(groupData,indexer);
 });
};


$scope.AreYouSureBroToDeletePrem = function (premData,indexer) {

  var WhatHappaned = $uibModal.open({
    animation: true,
    templateUrl: 'app/pages/setting/roles/widgets/AreYouSureToDeletePrem.html',
    size: '',
    backdrop: 'static',
  });

  WhatHappaned.result.then(function () {
    // console.info('no');
  }, function () {
    // console.info('ok');

    $scope.CancelNewPremissions(premData,indexer);
 });
};

$scope.AreYouSureBroToDeleteCat = function (premData,indexer) {

  var WhatHappaned = $uibModal.open({
    animation: true,
    templateUrl: 'app/pages/setting/roles/widgets/AreYouSureBroToDeleteCat.html',
    size: '',
    backdrop: 'static',
  });

  WhatHappaned.result.then(function () {
    // console.info('no');
  }, function () {
    // console.info('ok');

    $scope.CancelNewCat(premData,indexer);
 });
};

$scope.AreYouSureBroToDeleteSubCat = function (premData,indexer) {

  var WhatHappaned = $uibModal.open({
    animation: true,
    templateUrl: 'app/pages/setting/roles/widgets/AreYouSureBroToDeleteSubCat.html',
    size: '',
    backdrop: 'static',
  });

  WhatHappaned.result.then(function () {
    // console.info('no');
  }, function () {
    // console.info('ok');

    $scope.CancelNewSubCat(premData,indexer);
 });
};


$scope.AreYouSureBroToDeleteApp = function (premData,indexer) {

  var WhatHappaned = $uibModal.open({
    animation: true,
    templateUrl: 'app/pages/setting/roles/widgets/AreYouSureBroToDeleteApp.html',
    size: '',
    backdrop: 'static',
  });

  WhatHappaned.result.then(function () {
    // console.info('no');
  }, function () {
    // console.info('ok');

    $scope.CancelNewApps(premData,indexer);
 });
};





var readRoles = function() {
      $http.get('http://localhost/System/Roles/?Action=GetAllRoles&Token='+dataUser.token).then(
      // $http.get('http://localhost:4000/api/usuarios').then(
        function SuccessfulReading(response) {

          switch(response.data.status) {
            case 'success':
                    $scope.AllGroupRoles = response.data.data; 
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

var readPremission = function() {
      $http.get('http://localhost/System/Roles/?Action=GetAllPremission&Token='+dataUser.token).then(
      // $http.get('http://localhost:4000/api/AllGroupRoles').then(
        function SuccessfulReading(response) {


          switch(response.data.status) {
            case 'success':
                    $scope.AllPremissions = response.data.data.Premission;        
                    $scope.AllGroups = response.data.data.Groups;       
                    $scope.AllSubGroups = response.data.data.SubGroups;       
                    $scope.AllApps = response.data.data.Apps; 
                  break;
            case 'error':
                    toastr.error(response.data.msg);
                  break;

          }


        }, 
        function ErrorReading(error) {
          console.log(error);
          toastr.error("שגיאה בקבלת מידע על כל ההרשאות");
        });
    };






    readRoles();
    readPremission();



   

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



    $scope.removeUser = function(index) {
      $scope.AllGroupRoles.splice(index, 1);
    };


function getIndexByHash(AllArray, Hash) {
  var found = AllArray.find(function(item){return item.$$hashKey === Hash});
    return AllArray.indexOf(found);
}

    $scope.SaveRole = function(forms,index) {
      forms.$data["role_id"] = index.role_id;
      $http.post('http://localhost/System/Roles/?Action=SaveRole&Token='+dataUser.token, forms.$data).then(
        function insertedSuccessful(response) {

          switch(response.data.status) {
            case 'success':
                    switch(response.data.type) {
                      case 'insert':
                              // var KeyToChange = $scope.AllGroupRoles.findIndex(obj => { return obj.$$hashKey === index.$$hashKey});
                              var KeyToChange = getIndexByHash($scope.AllGroupRoles,index.$$hashKey);
                              console.log(KeyToChange);
                              $scope.AllGroupRoles[KeyToChange].role_id = response.data.data.role_id;
                              toastr.success("הקבוצה נוספה בהצלחה");
            
                            break;
                      case 'update':
                              toastr.success("הקבוצה נערכה בהצלחה");
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
        role_id: '',
        role_desc: '',
        role_name: ''
      };
      $scope.AllGroupRoles.push($scope.inserted);
    };

 



    $scope.CancelNewGroup = function(Group,indexer) {
      $scope.AllGroupRoles.splice(indexer, 1);

      $http.post('http://localhost/System/Roles/?Action=CancelGroup&Token='+dataUser.token, Group).then(
        function CancelSuccessful(response) {

          switch(response.data.status) {
            case 'success':
                    toastr.success("הקבוצה נמחקה בהצלחה");
                  break;
            case 'error':
                    $scope.AllGroupRoles.push(Group);
                    toastr.error(response.data.msg);
                  break;

          }
        },
        function CancelError(error) {
          $scope.AllGroupRoles.push(Group);
          toastr.error("שגיאה, יש לנסות שנית");
        });
    };

    $scope.ColorType = [
      'primary',
      'success',
      'info',
      'warning',
      'danger',
      ];


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

    $scope.addPrem = function() {
      $scope.inserted = {
        perm_id: '',
        perm_desc: null,
        group_id: ''
      };
      $scope.AllPremissions.push($scope.inserted);
      // console.log($scope.AllPremissions);
    };

    $scope.SavePerm = function(forms,index) {
      forms.$data["perm_id"] = index.perm_id;
      // console.log(forms);
      // console.log(index);
      $http.post('http://localhost/System/Roles/?Action=SavePerm&Token='+dataUser.token, forms.$data).then(
        function insertedSuccessful(response) {

          switch(response.data.status) {
            case 'success':
                    switch(response.data.type) {
                      case 'insert':
                              // var KeyToChange = $scope.AllPremissions.findIndex(obj => { return obj.$$hashKey === index.$$hashKey});
                              var KeyToChange = getIndexByHash($scope.AllPremissions,index.$$hashKey);
                              $scope.AllPremissions[KeyToChange].perm_id = response.data.data.perm_id;
                              $scope.AllPremissions[KeyToChange].perm_key = response.data.data.perm_key;
                              toastr.success("הקבוצה נוספה בהצלחה");
            
                            break;
                      case 'update':
                              toastr.success("הקבוצה נערכה בהצלחה");
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

    $scope.CancelNewPremissions = function(prem,indexer) {
      // console.log(indexer);
      // console.log($scope.AllPremissions);
      if (prem.perm_id != '') {
         $scope.AllPremissions.splice(indexer, 1);

          $http.post('http://localhost/System/Roles/?Action=CancelPerm&Token='+dataUser.token, prem).then(
            function CancelSuccessful(response) {

              switch(response.data.status) {
                case 'success':
                        toastr.success("ההרשאה נמחקה בהצלחה");
                      break;
                case 'error':
                        $scope.AllPremissions.push(prem);
                        toastr.error(response.data.msg);
                      break;

              }

            },
            function CancelError(error) {
              $scope.AllPremissions.push(prem);
              toastr.error("שגיאה, יש לנסות שנית");
            });
      } else {
        console.log('Empty');


        $scope.AllPremissions.splice(indexer, 1);
        // $scope.AllPremissions.splice(prem, 1);
      }
  
    };

    $scope.addCat = function() {
      $scope.inserted = {
        group_id: '',
        group_desc: null
      };
      $scope.AllGroups.push($scope.inserted);
      // console.log($scope.AllPremissions);
    };

    $scope.SaveCat = function(forms,index) {
      forms.$data["group_id"] = index.group_id;
      $http.post('http://localhost/System/Roles/?Action=SaveCat&Token='+dataUser.token, forms.$data).then(
        function insertedSuccessful(response) {


              switch(response.data.status) {
                case 'success':
                          switch(response.data.type) {
                            case 'insert':
                                    // var KeyToChange = $scope.AllGroupRoles.findIndex(obj => { return obj.$$hashKey === index.$$hashKey});
                                    var KeyToChange = getIndexByHash($scope.AllGroups,index.$$hashKey);
                                    console.log(KeyToChange);
                                    $scope.AllGroups[KeyToChange].group_id = response.data.data.group_id;
                                    toastr.success("הקטגוריה נוספה בהצלחה");
                  
                                  break;
                            case 'update':
                                    toastr.success("הקטגוריה נערכה בהצלחה");
                                  break;
                          }
                      break;
                case 'error':
                        // $scope.AllPremissions.push(prem);
                        toastr.error(response.data.msg);
                      break;

              }

        },
        function insertedError(error) {
          toastr.error("שגיאה, יש לנסות שנית");
        });
    };


    $scope.CancelNewCat = function(prem,indexer) {
      if (prem.group_id != '') {
         $scope.AllGroups.splice(indexer, 1);

          $http.post('http://localhost/System/Roles/?Action=CancelCat&Token='+dataUser.token, prem).then(
            function CancelSuccessful(response) {

              switch(response.data.status) {
                case 'success':
                        toastr.success("הקטגוריה נמחקה בהצלחה");
                      break;
                case 'error':
                        $scope.AllGroups.push(prem);
                        toastr.error(response.data.msg);
                      break;

              }

            },
            function CancelError(error) {
              $scope.AllGroups.push(prem);
              toastr.error("שגיאה, יש לנסות שנית");
            });
      } else {
        $scope.AllGroups.splice(indexer, 1);
      }
  
    };

    
    $scope.addSubCat = function() {
      $scope.inserted = {
        sub_group_id: '',
        group_id: '',
        sub_group_desc: null
      };
      $scope.AllSubGroups.push($scope.inserted);
      // console.log($scope.AllPremissions);
    };

    $scope.SaveSubCat = function(forms,index) {
      forms.$data["sub_group_id"] = index.sub_group_id;
      $http.post('http://localhost/System/Roles/?Action=SaveSubCat&Token='+dataUser.token, forms.$data).then(
        function insertedSuccessful(response) {



              switch(response.data.status) {
                case 'success':
                        switch(response.data.type) {
                          case 'insert':
                                  // var KeyToChange = $scope.AllGroupRoles.findIndex(obj => { return obj.$$hashKey === index.$$hashKey});
                                  var KeyToChange = getIndexByHash($scope.AllSubGroups,index.$$hashKey);
                                  console.log(KeyToChange);
                                  $scope.AllSubGroups[KeyToChange].sub_group_id = response.data.data.sub_group_id;
                                  toastr.success("התת קטגוריה נוספה בהצלחה");
                
                                break;
                          case 'update':
                                  toastr.success("התת קטגוריה נערכה בהצלחה");
                                break;
                        }
                      break;
                case 'error':
                        // $scope.AllGroups.push(prem);
                        toastr.error(response.data.msg);
                      break;
              }

        },
        function insertedError(error) {
          toastr.error("שגיאה, יש לנסות שנית");
        });
    };


    $scope.CancelNewSubCat = function(prem,indexer) {
      if (prem.sub_group_id != '') {
         $scope.AllSubGroups.splice(indexer, 1);

          $http.post('http://localhost/System/Roles/?Action=CancelSubCat&Token='+dataUser.token, prem).then(
            function CancelSuccessful(response) {

              switch(response.data.status) {
                case 'success':
                        toastr.success("הקטגוריה נמחקה בהצלחה");
                      break;
                case 'error':
                        $scope.AllSubGroups.push(prem);
                        toastr.error(response.data.msg);
                      break;

              }


            },
            function CancelError(error) {
              $scope.AllSubGroups.push(prem);
              toastr.error("שגיאה, יש לנסות שנית");
            });
      } else {
        $scope.AllSubGroups.splice(indexer, 1);
      }
  
    };

    $scope.addApps = function() {
      $scope.inserted = {
        id: '',
        AppDesc: null
      };
      $scope.AllApps.push($scope.inserted);
      // console.log($scope.AllPremissions);
    };

    $scope.SaveApps = function(forms,index) {
      forms.$data["id"] = index.id;
      $http.post('http://localhost/System/Roles/?Action=SaveApps&Token='+dataUser.token, forms.$data).then(
        function insertedSuccessful(response) {

              switch(response.data.status) {
                case 'success':
                          switch(response.data.type) {
                            case 'insert':
                                    // var KeyToChange = $scope.AllGroupRoles.findIndex(obj => { return obj.$$hashKey === index.$$hashKey});
                                    var KeyToChange = getIndexByHash($scope.AllApps,index.$$hashKey);
                                    console.log(KeyToChange);
                                    $scope.AllApps[KeyToChange].id = response.data.data.id;
                                    toastr.success("האפליקציה נוספה בהצלחה");
                  
                                  break;
                            case 'update':
                                    toastr.success("האפליקציה נערכה בהצלחה");
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


    $scope.CancelNewApps = function(prem,indexer) {
      if (prem.id != '') {
         $scope.AllApps.splice(indexer, 1);

          $http.post('http://localhost/System/Roles/?Action=CancelApps&Token='+dataUser.token, prem).then(
            function CancelSuccessful(response) {

              switch(response.data.status) {
                case 'success':
                        toastr.success("הקטגוריה נמחקה בהצלחה");
                      break;
                case 'error':
                        $scope.AllApps.push(prem);
                        toastr.error(response.data.msg);
                      break;

              }

            },
            function CancelError(error) {
              $scope.AllApps.push(prem);
              toastr.error("שגיאה, יש לנסות שנית");
            });
      } else {
        $scope.AllApps.splice(indexer, 1);
      }
  
    };

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';




    $scope.smartTablePageSize = 10;






  }
})();