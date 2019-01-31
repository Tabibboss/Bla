/**
 * @author Tabib Omer - Tabibboss LTD
 * created on 12/17/15
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.setting.roles', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.setting.roles', {
        url: '/roles',
        templateUrl: 'app/pages/setting/roles/roles.html',
        title: 'הרשאות',
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