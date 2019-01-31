/**
 * @author Tabib Omer - Tabibboss LTD
 * created on 12/17/15
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.setting.users', ['BlurAdmin.pages.setting.UserProfile'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.setting.users', {
        url: '/users',
        templateUrl: 'app/pages/setting/users/users.html',
        title: 'משתמשים',
        sidebarMeta: {
          order: 100,
        },
        authenticate: true,
        params: {                // <-- focusing this one
          authRoles: ['admin']   // <-- roles allowed for this module
        }
      });
  }

})();