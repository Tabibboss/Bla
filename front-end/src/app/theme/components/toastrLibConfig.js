/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .config(toastrLibConfig);

  /** @ngInject */
  function toastrLibConfig(toastrConfig) {
    angular.extend(toastrConfig, {
      closeButton: true,
      closeHtml: '<button>&times;</button>',
      timeOut: 19000,
      extendedTimeOut: 19000,
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,
      allowHtml: true,
      progressBar: true,
      newestOnTop: true,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    });
  }
})();