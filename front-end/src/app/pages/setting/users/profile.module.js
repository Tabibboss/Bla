/**
 * @author Tabib Omer - Tabibboss LTD
 * created on 12/17/15
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.setting.UserProfile', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.setting.users.UserProfile', {
        url: '/UserProfile/:id',
        url2: '/UserProfile',
        templateUrl: 'app/pages/setting/users/profile.html',
        title: 'פרופיל משתמש',
        authenticate: true,
        params: {                // <-- focusing this one
          authRoles: ['admin']   // <-- roles allowed for this module
        }
      });
  }

})();