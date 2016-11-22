'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($location, $localStorage, $scope,  $http) {

    var searchParam = $location.search();
    if(JSON.stringify(searchParam) !== JSON.stringify({})){
      console.log(searchParam);
      $localStorage.token = searchParam.sid;
      $location.search({});
      $location.path('/');
      $rootScope.$broadcast('event:auth-loginConfirmed', Main.isAuthenticated())

      // window.location.reload();
    }

  });

