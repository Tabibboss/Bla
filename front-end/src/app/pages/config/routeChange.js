(function() {
  'use strict';

  angular.module('BlurAdmin.pages.config')
    .run(stateChangeStart);

  /** @ngInject */
  function stateChangeStart($rootScope, $state,$location, localStorage) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
      var login = localStorage.getObject('dataUser');


      var TargetUrl = toState.name.split(".");

      var AllRouts = $state.get().map(function(state) {
        return {Name : state.name, title : state.title, url : state.url, url2 : state.url2, abstract : state.abstract}; 
      });

      $rootScope.MyCurrentStatesTabibboss = [];

      angular.forEach(TargetUrl, function(PathVal, key) {
        PathVal = '/'+PathVal;
        var found = AllRouts.find(function(item){return item.url == PathVal || item.url2 == PathVal});

        if(found) {
          $rootScope.MyCurrentStatesTabibboss.push(found);
        }
      });

      angular.forEach($rootScope.MyCurrentStatesTabibboss, function(Val, key) {
        var OldName = Val.Name;
        // var NewPath = '/'+OldName.replace(/./g,'/');
        var NewPath = '/'+OldName.split(".").join("/");

        $rootScope.MyCurrentStatesTabibboss[key]['NewPath'] = NewPath;
      });


      if (toState.authenticate && _.isEmpty(login)) {
        // User isn’t authenticated
        // console.log('User isn’t authenticated - toState.authenticate: '+toState.authenticate);

        $state.transitionTo("authSignIn");
        event.preventDefault();
      } else {

        var UsersPremmisions = login['role'];

        if(toState.authenticate) {
          var PagePremmisions = toState.params.authRoles;
            

          var matches = UsersPremmisions.filter(function(item){
            return PagePremmisions.indexOf(item) > -1
          })

          if(matches.length > 0) { // Good Access

          } else {
            $state.transitionTo("main.dashboard");
            event.preventDefault();
          }
        }

  
        // console.log("Total matches: ", matches.length);
        // console.log(JSON.stringify(UsersPremmisions)==JSON.stringify(PagePremmisions));
        // var tt = equals(UsersPremmisions,toState.params.authRoles);
        // console.log(tt);


        // console.log('User is authenticated - toState.authenticate: '+toState.authenticate);
      }
    });
  }

})();