(function() {
  'use strict';

  angular.module('BlurAdmin.pages.config', [])
    .config(routeConfig)
    // .factory('permissions',permissions)
    .directive('hasPermission',hasPermission)
    .directive('checkForChange',checkForChange);







// function permissions() {

//   var permissionList = [];
//   return {
//     hasPermission: function (permission) {
//     	console.log('permissionList');
//     	console.log(permissionList);
//       permission = permission.trim();
//       return permissionList.some(item => {
//         if (typeof item.Name !== 'string') { // item.Name is only used because when I called setPermission, I had a Name property
//           return false;
//         }
//         return item.Name.trim() === permission;
//       });
//     }
//   };
// }



function checkForChange(localStorage) {





      return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
          // console.log('ngModel');
          // console.log(ngModel);

          
          // console.log('attrs');
          // console.log(attrs.checkForChange);
          // console.log('ngModel');
          // console.log(ngModel);
          var checkForChange$watcher = scope.$watch(attrs.checkForChange, function(newValue, oldValue) {


              if (typeof newValue !== 'undefined' && typeof oldValue !== 'undefined') {
                // console.log('oldValue');
                // console.log(oldValue);
                // console.log('newValue');
                // console.log(elem);
                // console.log(newValue);
                elem.parent().parent().addClass('Tbiber');
              }
          });

          // When $destroy is fired stop watching the change.
          // If you don't, and you come back on your state
          // you'll have two watcher watching the same properties
          scope.$on('$destroy', function() {
              checkForChange$watcher();
          });
        }



}


  // return {
  //     restrict: 'A',
  //     scope: {
  //         myDirective: '='
  //     },
  //     link: function (scope, element, attrs) {
  //         // set the initial value of the textbox
  //         console.log(scope);
  //         // element.val(scope.myDirective);
  //         // element.data('old-value', scope.myDirective);

  //         // // detect outside changes and update our input
  //         // scope.$watch('myDirective', function (val) {
  //         //     element.val(scope.myDirective);
  //         // });

  //         // // on blur, update the value in scope
  //         // element.bind('propertychange keyup change paste', function (blurEvent) {
  //         //     if (element.data('old-value') != element.val()) {
  //         //         console.log('value changed, new value is: ' + element.val());
  //         //         scope.$apply(function () {
  //         //             scope.myDirective = element.val();
  //         //             element.data('old-value', element.val());
  //         //         });
  //         //     }
  //         // });
  //     }
  // };

}


function hasPermission(localStorage) {

        var login = localStorage.getObject('dataUser');
        var UsersPremmisions = login['prem'];

// console.log(login);

  return {
    link: function(scope, element, attrs) {

      if(!_.isString(attrs.hasPermission)) {
        throw 'hasPermission value must be a string'
      }
      var value = attrs.hasPermission.trim();
      var notPermissionFlag = value[0] === '!';
      if(notPermissionFlag) {
        value = value.slice(1).trim();
      }

      function toggleVisibilityBasedOnPermission() {

      	var hasPermission = false;


		var found = UsersPremmisions.find(function(item){
			// console.log(typeof(item));
			return item == value
		});

		if(found > 0) { // Good Access
			hasPermission = true;
		}

        
        if(hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag) {
          // element[0].style.display = 'block';
        }
        else {
          // element[0].style.display = 'none';
          element.remove();
        }
      }

      toggleVisibilityBasedOnPermission();
      scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
    }
  };
}

  /** @ngInject */
  function routeConfig() {

  }

})();