'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VotesCtrl
 * @description
 * # VotesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('BabyNameCtrl', function ($scope, BabynameFactory, Main) {
    if(Main.isAuthenticated()){
      var babyNames = $scope.babyNames;
      var boyNames = $scope.boyNames = [];
      var girlNames = $scope.girlNames = [];

      BabynameFactory.getList().then(function (results){
        results.forEach(function (each) {
          if(each.gender == 'girl') {
            girlNames.push(each);
          } else {
            boyNames.push(each);
          }
        });

      })

    }


    $scope.upvote = function (vote) {
      console.log('upvote');
      vote.upvotes += 1;
      vote.put();
      // BabynameFactory.post(vote).then(function() {
      //   console.log('like saved');
      //
      // });
    };
  });
