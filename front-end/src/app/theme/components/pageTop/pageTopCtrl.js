/**
 * @author Tabib Omer - Tabibboss LTD
 * created on 12/16/15
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.theme.components')
    .controller('pageTopCtrl', pageTopCtrl);


  function pageTopCtrl($rootScope, $scope, $http, $filter, toastr, editableOptions, editableThemes,localStorage,$uibModal, baProgressModal,myUserToView) {


  var dataUser = localStorage.getObject('dataUser');

  // $scope.UserID = $stateParams.id;
  $scope.MyprofilePicture = $filter('profilePicture')(dataUser.uid);
  $scope.MyprofileID = dataUser.uid;
  console.log($scope.MyprofileID);


  }
})();