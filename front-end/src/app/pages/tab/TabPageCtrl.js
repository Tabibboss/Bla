/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tab')
      .controller('TabPageCtrl', TabPageCtrl).factory('myRoleToView', function() {
    return {
      MyRole: '',
      MyRoleData: ''
    }
});

  /** @ngInject */
  function TabPageCtrl($scope, $http, $filter, toastr, editableOptions, editableThemes,localStorage,myRoleToView) {














  }

})();
