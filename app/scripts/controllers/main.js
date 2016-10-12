'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($location, $localStorage, authService, $scope,  $http) {

    var searchParam = $location.search();
    if(JSON.stringify(searchParam) !== JSON.stringify({})){
      console.log(searchParam);
      $localStorage.token = searchParam.sid;
      authService.loginConfirmed();
      $location.search({});
      // window.location.reload();
    }

    $scope.navfb = function(){
      console.log("navigate to facebook");
    }


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

