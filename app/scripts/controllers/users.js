'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('UsersCtrl', ['$scope', 'UserFactory', 'Main', 'users', function ($scope, UserFactory, Main, users) {
    $scope.isAuthenticated = Main.isAuthenticated();

    if($scope.isAuthenticated) {
      $scope.users = users;
    }
  }]);
