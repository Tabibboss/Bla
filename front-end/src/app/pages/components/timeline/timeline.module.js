/**
 * @author Tabib Omer - Tabibboss LTD
 * created on 1/12/16
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.components.timeline', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.components.timeline', {
        url: '/timeline',
        templateUrl: 'app/pages/components/timeline/timeline.html',
        title: 'Timeline',
        sidebarMeta: {
          icon: 'ion-ios-pulse',
          order: 100,
        },
        authenticate: true
      });
  }
})();