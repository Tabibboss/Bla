/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .run(themeRun);

  /** @ngInject */
  function themeRun($timeout, $rootScope,$templateCache, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings) {
    var whatToWait = [
      preloader.loadAmCharts(),
      // preloader.loadsetting(),
      $timeout(3000)
    ];
    // console.log(preloader);

    var theme = themeLayoutSettings;
    if (theme.blur) {
      if (theme.mobile) {
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-mobile.jpg'));
      } else {
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-re.jpg'));
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-blurred-re.jpg'));
      }
    }

    // console.log('whatToWait');
    // console.log(whatToWait);

    $q.all(whatToWait).then(function () {
      // $rootScope.$pageFinishedLoading = true;
      // console.log('סיום טעינה של העמוד');
      // console.log($rootScope.$pageFinishedLoading);
    });

    $timeout(function () {
      if (!$rootScope.$pageFinishedLoading) {
        $rootScope.$pageFinishedLoading = true;
         // console.log('סיום טעינה של העמוד 2');
      }
    }, 7000);


    window.addEventListener("load", function(event) {
    // console.log('הסוף המר');

   // const templateName = 'bootstrap/match-multiple.tpl.html';
   // const templateName2 = 'bootstrap/match.tpl.html';
   // var template = $templateCache.get(templateName);
   // var template2 = $templateCache.get(templateName2);
   // // console.log(template);


   //  template = template.replace('btn-default', 'btn-danger');
   //  template2 = template2.replace('btn-default', 'btn-danger');
   //  template2 = template2.replace('btn-default-focus', 'btn-danger-focus');
   //  $templateCache.put(templateName, template);
   //  $templateCache.put(templateName2, template2);



    });

    $rootScope.$baSidebarService = baSidebarService;


  }

})();