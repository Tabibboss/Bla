/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting.roles')
      .directive('baSwitcherr', baSwitcherr);

  /** @ngInject */
  function baSwitcherr() {
    return {
      templateUrl: 'app/pages/setting/roles/viewRole/baSwitcher/baSwitcher.html',
      scope: {
        switcherStyle: '@',
        switcherValue: '=',
        UpdateSwitchRoles: '&',
        switcherCat: '=',
        updateFn: '&',
        switcherId: '='
      },
      controller: 'viewRoleCtrl',
      replace: true,        
        link: function(scope, elm, attrs) {             
        }
    };
  }



})();


