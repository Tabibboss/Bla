(function() {
  'use strict';

  angular.module('BlurAdmin.pages.authSignIn')
    .controller('authSignInCtrl', authSignInCtrl);

  /** @ngInject */
  function authSignInCtrl($scope,$rootScope,$location, localStorage, $state,$http,toastr,themeLayoutSettings) {
    var vm = this;
    var Theme = themeLayoutSettings;
    // gfgf = _.intersection();
    vm.logar = logar;

    // $rootScope.$pageFinishedLoading = true;
    // console.log('pageFinishedLoading');
    // console.log($rootScope.$pageFinishedLoading);
    init();

    function init() {
      localStorage.clear();
    }

    function logar() {
      if (vm.user) {
       if (vm.passWord) {

            

          var dataUser = {
            user: vm.user,
            passWord: vm.passWord,
            // role: ['admin','Kof'],
          };

          var config = {
              headers : {
                'Content-Type': 'application/x-www-form-urlencoded', 
                  // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                  'X-Requested-With': 'XMLHttpRequest',

                  // 'Access-Control-Allow-Origin': 'http://localhost:4000',
                  // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                  // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                  // 'Access-Control-Allow-Credentials': true,



              },
              method: "POST",
              transformRequest: [function (data) { return data; }],
              transformResponse: [function (data) { return data; }],
          }

          if(!Theme.mobile) {

          $http.post('http://localhost/System/Login/', $.param(dataUser), config)
            .success(function (data, status, headers, config) {
         
                $scope.PostDataResponse = data;
                var Jsoner = $.parseJSON($scope.PostDataResponse);

                switch(Jsoner.status) {
                  case 'ok':
                            dataUser['token'] = Jsoner.token;
                            dataUser['role'] = Jsoner.role;
                            dataUser['prem'] = Jsoner.prem;

                            var CoockiesHash = {
                              user: vm.user,
                              token: Jsoner.token,
                              uid: Jsoner.uid,
                              GroupID: Jsoner.GroupID,
                              role: Jsoner.role,
                              prem: Jsoner.prem,
                            };


                            localStorage.setObject('dataUser', CoockiesHash);
                            $('body #stars,body #stars2,body #stars3').remove();
                            // $rootScope.$pageFinishedLoading = false;

                            // $state.go('main.dashboard');
                            $location.path('/');
                            break;
                  case 'error':
                            toastr.error('שם משתמש וסיסמה אינם נכונים, אנא נסה שנית', '', {
                              "autoDismiss": true,
                              "type": "error",
                              "timeOut": 5000,
                              "extendedTimeOut": "2000"
                            })
                            break;
                }
                
            })
            .error(function (data, status, header, config) {
                toastr.error('שגיאת רשת בהתחברות, יש לנסות שנית', '', {
                  "autoDismiss": true,
                  "type": "error",
                  "timeOut": 5000,
                  "extendedTimeOut": "2000"
                })
            });
          } else {
            localStorage.setObject('dataUser', dataUser);
            $('body #stars,body #stars2,body #stars3').remove();

            $state.go('main.dashboard');

            // console.log('success - Log Me In');
          }

  

        } else {
          toastr.error('חובה להכניס סיסמה', '', {
            "autoDismiss": true,
            "type": "error",
            "timeOut": 5000
          })

        }
    } else {
      toastr.error('חובה להכניס שם משתמש', '', {
        "autoDismiss": false,
        "type": "error",
        "timeOut": 5000
      })
    }

  }







  }

})();