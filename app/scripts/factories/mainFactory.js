'use strict';

angular.module('clientApp')
  .factory('Main', ['$http', '$localStorage','AppConstants', function($http, $localStorage, AppConstants){
    var baseUrl = AppConstants.api;
    function changeUser(user) {
      angular.extend(currentUser, user);
    }

    // function urlBase64Decode(str) {
    //   var output = str.replace('-', '+').replace('_', '/');
    //   switch (output.length % 4) {
    //     case 0:
    //       break;
    //     case 2:
    //       output += '==';
    //       break;
    //     case 3:
    //       output += '=';
    //       break;
    //     default:
    //       throw 'Illegal base64url string!';
    //   }
    //   return window.atob(output);
    // }
    //
    // function getUserFromToken() {
    //   var token = $localStorage.token;
    //   var user = {};
    //   if (typeof token !== 'undefined') {
    //     var encoded = token.split('.')[1];
    //     user = JSON.parse(urlBase64Decode(encoded));
    //   }
    //   return user;
    // }
    //
    // var currentUser = getUserFromToken();

    var currentUser = {};

    return {
      save: function(data, success, error) {
        $http.post(baseUrl + '/signin', data).success(success).error(error)
      },
      signin: function(data, success, error) {
        $http.post(baseUrl + '/authenticate', data).success(success).error(error)
      },
      me: function(success, error) {
        $http.get(baseUrl + '/api/me').success(success).error(error)
      },
      create: function(data, success, error) {
       $http.post(baseUrl + '/api/users', data).success(success).error(error)
      },
      logout: function(success) {
        changeUser({});
        delete $localStorage.token;
        success();
      },
      autheticateUser: function() {
        $localStorage.token = 'true';
      },
      isAuthenticated: function(){
        if($localStorage.token){
          return true;
        } else {
          return false;
        }
      }
    };
  }
  ]);
