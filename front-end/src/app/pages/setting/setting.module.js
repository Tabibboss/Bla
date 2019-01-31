/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.setting', [
      'BlurAdmin.pages.setting.roles',
      'BlurAdmin.pages.setting.users',
      // 'BlurAdmin.pages.setting.profile',
      // 'BlurAdmin.pages.setting.users.profile',
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.setting', {
        url: '/setting',
        abstract: true,
        template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
        title: 'הגדרות',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 150,
        },
        authenticate: true,
        params: {                // <-- focusing this one
          authRoles: ['admin']   // <-- roles allowed for this module
        }
      });
  }

})();