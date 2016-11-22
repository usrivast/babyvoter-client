'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VotesCtrl
 * @description
 * # VotesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('VotesCtrl', function ($scope, VoteFactory, Main) {
    $scope.isAuthenticated = Main.isAuthenticated();
    if($scope.isAuthenticated){
      var votes = VoteFactory.getList().$object;
      votes.forEach(function(vote){
        if(!vote.user.facebook.picture.data.url){
          vote.user.facebook.picture.data.url = 'https://www.flickr.com/photos/fritsenfruitig/4603158401';
        }
      })
      $scope.votes = votes;
    }

  });
