'use strict';

angular.module('clientApp')
  .factory('Main', ['$http', '$localStorage','AppConstants', function($http, $localStorage, AppConstants){
    var baseUrl = AppConstants.api;
    function changeUser(user) {
      angular.extend(currentUser, user);
    }

    function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }

    function getUserFromToken() {
      var token = $localStorage.token;
      var user = {};
      if (typeof token !== 'undefined') {
        var encoded = token.split('.')[1];
        user = urlBase64Decode(encoded);
      }
      return user;
    }

    function me() {
      $http.get(baseUrl + '/api/me').then(function(response){
        return response;
      })
    }

    // function getUser(){
    //   me(function(data){
    //     return data;
    //   },function(){
    //     console.log('error getting data');
    //     return 'error';
    //   });
    // }
    //
    // var currentUser = getUserFromToken();

    var currentUser = {};

    return {
      // save: function(data, success, error) {
      //   $http.post(baseUrl + '/signin', data).success(success).error(error)
      // },
      signin: function(data, success, error) {
        $http.post(baseUrl + '/authenticate', data).success(success).error(error)
      },
      me: function(success, error) {
        $http.get(baseUrl + '/api/me').success(success).error(error)
      },
      create: function(data, success, error) {
       $http.post(baseUrl + '/signup', data).success(success).error(error)
      },
      logout: function(success) {
        changeUser({});
        delete $localStorage.token;
        success();
      },
      isAuthenticated: function(){
        if($localStorage.token){
          return true;
        } else {
          return false;
        }
      },
      getUser: me
    };
  }
  ]);
