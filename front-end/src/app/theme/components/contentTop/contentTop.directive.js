/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('contentTop', contentTop);

  /** @ngInject */
  function contentTop($rootScope, $location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/contentTop/contentTop.html',
      controller: 'contentTopCtrl',
      link: function($scope) {

        
// console.log($rootScope.MyCurrentStatesTabibboss);

          // console.log(AllRouts);
          // console.log('AllRouts');
          // console.log(AllRouts);
          // console.log('MyPath');
          // console.log(MyPath);
          // console.log('MyCurrentStatesTabibboss');
          // console.log($scope.MyCurrentStatesTabibboss);
          // console.log($state);
          // console.log(Bla);
          

$scope.$watch(function () {

            // $scope.activePager = $scope.MyCurrentStatesTabibboss;
            // console.log($scope.MyCurrentStatesTabibboss);
            // 
            if($rootScope.MyCurrentStatesTabibboss) {
              $rootScope.activePageTitle = $rootScope.MyCurrentStatesTabibboss;
              $rootScope.activePageTitler = $state.current.title;
            } else {
              $rootScope.activePageTitle = $state.current.title;
              $rootScope.activePageTitler = $state.current.title;
            }
            
        });

      }
    };
  }

})();