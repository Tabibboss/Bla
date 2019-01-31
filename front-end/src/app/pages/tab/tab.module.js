/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tab', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main.tab', {
          url: '/tab',
          template : '<ui-view></ui-view>',
          abstract: true,
          controller: 'TabPageCtrl',
          title: 'tab',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
          authenticate: true,
          params: {                // <-- focusing this one
            authRoles: ['admin']   // <-- roles allowed for this module
          }
        }).state('main.tab.basic', {
          url: '/basic',
          templateUrl: 'app/pages/tab/basic/tables.html',
          title: 'Basic Tables',
          sidebarMeta: {
            order: 0,
          },
          authenticate: true,
          params: {                // <-- focusing this one
            authRoles: ['admin']   // <-- roles allowed for this module
          }
        }).state('main.tab.usuarios', {
          url: '/usuarios',
          templateUrl: 'app/pages/tab/usuarios/table.html',
          title: 'Usuarios',
          sidebarMeta: {
            order: 100,
          },
          authenticate: true,
          params: {                // <-- focusing this one
            authRoles: ['admin']   // <-- roles allowed for this module
          }
        });
    $urlRouterProvider.when('/tab','/tab/basic');
  }

})();
