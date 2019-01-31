/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.profile', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.profile', {
        url: '/profile',
        title: 'פרופיל אישי',
        // templateUrl: 'app/pages/profile/profile.html',
        templateUrl: 'app/pages/setting/users/profile.html',
        controller: 'ProfilePageCtrl',
                sidebarMeta: {
          icon: 'ion ion-person',
          order: 0,
        },
        authenticate: true,
        params: {                // <-- focusing this one
          authRoles: ['admin']   // <-- roles allowed for this module
        }
      });
  }

})();