'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VoteViewCtrl
 * @description
 * # VoteViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('VoteViewCtrl', function (
    $scope,
    $rootScope,
    $routeParams,
    VoteFactory,
    Main
  ) {
      $scope.isAuthenticated = Main.isAuthenticated();
    if($scope.isAuthenticated) {
      $scope.viewVote = true;
      $scope.vote = VoteFactory.one($routeParams.id).get().$object;
      var vote = $scope.vote;

      if($routeParams.result=='success'){
        $scope.success = true;
      }

      $scope.$on('$routeChangeStart', function(next, current) {
        $rootScope.success = false;
      });
    }
  });
