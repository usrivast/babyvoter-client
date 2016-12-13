'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($location, $localStorage, $scope,  $http, $rootScope, Main, VoteService) {

    var searchParam = $location.search();
    if(JSON.stringify(searchParam) !== JSON.stringify({})){
      console.log(searchParam);
      $localStorage.token = searchParam.sid;
      $location.search({});
      $location.path('/');
      $rootScope.$broadcast('event:auth-loginConfirmed', Main.isAuthenticated())

      // window.location.reload();
    }

    var user;
    $scope.gotoVote = function () {
      var user;
      Main.me(function (res) {
        user = res.data;
        var param = {"user_id":user._id};
        VoteService.voteByUser(param, function(data){
          if(data && data.length>0){
            $location.path("/vote/"+data[0]._id);

          }else{
            $location.path("/vote");
          }
        }, function (error) {
          console.log(error);
        });
      }, function (error) {
        console.log(error);
      });

    }

  });

