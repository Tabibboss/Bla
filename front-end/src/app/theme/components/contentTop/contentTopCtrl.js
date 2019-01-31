/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .controller('contentTopCtrl', contentTopCtrl);

  /** @ngInject */
  function contentTopCtrl($scope, $http, $filter,$state, toastr, editableOptions, editableThemes,localStorage,$uibModal, baProgressModal) {

// var dataUser = localStorage.getObject('dataUser');

    $scope.GoToNewPageFromNav = function(data){
        if(data.abstract) {
            $state.transitionTo("main.dashboard");
        }else {
            $state.transitionTo(data.Name);
        }
        // $state.transitionTo(data.Name);
        // console.log(data);
        // console.log($state.includes);
    }


// console.log('AllUsers');


  }


})();