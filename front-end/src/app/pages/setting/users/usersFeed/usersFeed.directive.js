/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting.users')
      .directive('usersFeed', usersFeed);

  /** @ngInject */
  function usersFeed() {
    return {
      restrict: 'E',
      controller: 'usersFeedCtrl',
      templateUrl: 'app/pages/setting/users/usersFeed/usersFeed.html'
    };
  }
})();