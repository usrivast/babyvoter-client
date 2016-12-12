'use strict';

/* Controllers */

angular.module('clientApp')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main',
    function($rootScope, $scope, $location, $localStorage, Main) {
      $scope.loginAlertMessage=true;

      $scope.$on('event:auth-loginConfirmed',  function () {
        Main.me(function (res) {
          $scope.currentUser = res.data.displayName;
        }, function (error) {
          console.log(error);
        });
        $scope.loginAlertMessage=false;

      });

    }])
  .controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {

    Main.me(function(res) {
      $scope.myDetails = res;
    }, function() {
      $rootScope.error = 'Failed to fetch details';
    })
  }]);
