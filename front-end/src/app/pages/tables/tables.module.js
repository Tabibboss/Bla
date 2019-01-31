/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main.tables', {
          url: '/tables',
          template : '<ui-view></ui-view>',
          abstract: true,
          controller: 'TablesPageCtrl',
          title: 'Tables',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
          authenticate: true,
          params: {                // <-- focusing this one
            authRoles: ['admin']   // <-- roles allowed for this module
          }
        }).state('main.tables.basic', {
          url: '/basic',
          templateUrl: 'app/pages/tables/basic/tables.html',
          title: 'Basic Tables',
          sidebarMeta: {
            order: 0,
          },
          authenticate: true,
          params: {                // <-- focusing this one
            authRoles: ['admin']   // <-- roles allowed for this module
          }
        }).state('main.tables.smart', {
          url: '/smart',
          templateUrl: 'app/pages/tables/smart/tables.html',
          title: 'Smart Tables',
          sidebarMeta: {
            order: 100,
          },
          authenticate: true,
          params: {                // <-- focusing this one
            authRoles: ['admin']   // <-- roles allowed for this module
          }
        }).state('main.tables.usuarios', {
          url: '/usuarios',
          templateUrl: 'app/pages/tables/usuarios/table.html',
          title: 'Usuarios',
          sidebarMeta: {
            order: 100,
          },
          authenticate: true,
          params: {                // <-- focusing this one
            authRoles: ['admin']   // <-- roles allowed for this module
          }
        });
    $urlRouterProvider.when('/tables','/tables/basic');
  }

})();
