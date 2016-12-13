'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .factory('VoteRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
    });
  })
  .factory('VoteFactory', function (VoteRestangular) {
    return VoteRestangular.service('vote');
  })
  .factory('VoteService', function($http, AppConstants){
    return {
      voteByUser : function(data, success, error) {
        $http.post(AppConstants.api + '/api/voteByUser', data).success(success).error(error)
      }

  }
  })
