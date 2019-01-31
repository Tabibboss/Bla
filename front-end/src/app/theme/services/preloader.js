/**
 * @author Tabib Omer - Tabibboss LTD
 * created on 3/1/16
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .service('preloader', preloader);

  /** @ngInject */
  function preloader($q) {
    return {
      loadImg: function (src) {
        var d = $q.defer();
        var img = new Image();
        img.src = src;
        // console.log('img');
        // console.log(img);
        img.onload = function(){
          d.resolve();
        };
        return d.promise;
      },
      loadAmCharts : function(){
        var d = $q.defer();
        // console.log('d');
        // console.log(d);
        AmCharts.ready(function(){
          d.resolve();
        });
        return d.promise;
      }
    }
  }

})();