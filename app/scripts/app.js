'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngRoute',
    'ngStorage',
    'restangular',
    'ui.bootstrap',
    'ngSanitize',
    'ui.select2',
    'ngAnimate',
    'rzModule',
    'ngTagsInput'
  ])
  .constant("AppConstants", {
    // "api": "http://localhost:3000"
    "api": "https://arcane-peak-48225.herokuapp.com"
  })
  .config(['$routeProvider', 'RestangularProvider', '$httpProvider', 'AppConstants',
    function ($routeProvider, RestangularProvider, $httpProvider, AppConstants) {

      RestangularProvider.setBaseUrl(AppConstants.api+'/api/');

      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl',
        })
        .when('/contact', {
          templateUrl: 'views/contact.html',
          controller: 'ContactCtrl',
        })
        .when('/babynames', {
          templateUrl: 'views/babynames.html',
          controller: 'BabyNameCtrl',
        })
        .when('/votes', {
          templateUrl: 'views/votes.html',
          controller: 'VotesCtrl',
        })
        .when('/create/vote', {
          templateUrl: 'views/vote-add.html',
          controller: 'VoteAddCtrl'
        })
        .when('/vote/:id', {
          templateUrl: 'views/vote-view.html',
          controller: 'VoteViewCtrl',
        })
        .when('/vote/:id/delete', {
          templateUrl: 'views/vote-delete.html',
          controller: 'VoteDeleteCtrl',
        })
        .when('/vote/:id/edit', {
          templateUrl: 'views/vote-edit.html',
          controller: 'VoteEditCtrl',
        })
        .when('/home', {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl',
        })
        .when('/signin', {
          templateUrl: 'views/signin.html',
          controller: 'HomeCtrl',
        })
        .when('/signup', {
          templateUrl: 'views/signup.html',
          controller: 'HomeCtrl',
        })
        .when('/me', {
          templateUrl: 'views/me.html',
          controller: 'HomeCtrl',
        })
        .when('/users', {
          templateUrl: 'views/users.html',
          controller: 'UsersCtrl',
        })
        .when('/user/:id', {
          templateUrl: 'views/user-view.html',
          controller: 'UserViewCtrl',
        })
        .when('/create/user', {
          templateUrl: 'views/user-signup.html',
          controller: 'UserSignupCtrl',
        })
        .otherwise({
          redirectTo: '/'
        });

      $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
        return {
          'request': function (config) {
            config.headers = config.headers || {};
            config.headers['Content-Type'] = "application/json";
            if ($localStorage.token) {
              config.headers.Authorization = 'Bearer ' + $localStorage.token;
              config.headers.token = $localStorage.token;
            }
            return config;
          },
          'responseError': function (response) {
            if (response.status === 401 || response.status === 403) {
              $location.path('/signin');
            }
            return $q.reject(response);
          }
        };
      }]);
    }])
  //TODO remove this if not being used
  .config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
  })
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main',
    function ($rootScope, $scope, $location, $localStorage, Main) {
      $scope.isAuthenticated = Main.isAuthenticated();

      var viewLocation = {};
      $scope.isActive = function () {
        return viewLocation === $location.path();
      };


      $scope.signin = function () {
        var formData = {
          email: $scope.email,
          password: $scope.password
        }

        Main.signin(formData, function (res) {
          if (res.type == false) {
            alert(res.data)
          } else {
            $localStorage.token = res.data.token;
            window.location.reload();
            // window.location = "/";
          }
        }, function () {
          $rootScope.error = 'Failed to signin';
        })
      };

      $scope.signup = function () {
        var formData = {
          email: $scope.email,
          password: $scope.password
        }

        Main.save(formData, function (res) {
          if (res.type == false) {
            alert(res.data)
          } else {
            $localStorage.token = res.data.token;
            window.location = "/"
          }
        }, function () {
          $rootScope.error = 'Failed to signup';
        })
      };

      $scope.me = function () {
        Main.me(function (res) {
          $scope.myDetails = res;
        }, function () {
          $rootScope.error = 'Failed to fetch details';
        })
      };


      $scope.logout = function () {
        Main.logout(function () {
          window.location = "/"
        }, function () {
          alert("Failed to logout!");
        });
      };
      $scope.token = $localStorage.token;

    }])
  .run(function ($rootScope, $location, Main) {

    // enumerate routes that don't need authentication
    var routesThatDontRequireAuth = ['/signin', '/signup', '/about', '/'];

    // check if current location matches route
    var routeClean = function (route) {
      if(route === '') {
        route = '/'
      }

      for( var i = 0; i < routesThatDontRequireAuth.length; i++){
        if(route.trim() === routesThatDontRequireAuth[i]){
          return true;
        }
      }

      return false;
      // return _.find(routesThatDontRequireAuth,
      //   function (noAuthRoute) {
      //     return _.str.startsWith(route, noAuthRoute);
      //   });
    };

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // if route requires auth and user is not logged in
      if (!routeClean($location.path()) && !Main.isAuthenticated()) {
        // redirect back to login
        $location.path('/signin');
      }
    });
  });

