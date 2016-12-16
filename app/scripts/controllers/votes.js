'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VotesCtrl
 * @description
 * # VotesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('VotesCtrl', function ($scope, VoteFactory, Main, votes) {
    $scope.isAuthenticated = Main.isAuthenticated();
    if($scope.isAuthenticated){
      $scope.votes = votes;

      $scope.$on('event:vote-submit', function(){
        $scope.message = 'Vote submitted successfully. Thank you for voting!!';
        console.log('message = '+$scope.message);
      })


    }

  });
