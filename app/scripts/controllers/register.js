(function () {
  'use strict';

  angular
    .module('clientApp')
    .controller('RegisterCtlr', RegisterController);

  RegisterController.$inject = [ '$location', '$localStorage', '$rootScope', 'Main'];
  function RegisterController($location, $localStorage, $rootScope, Main) {
    var vm = this;

    vm.register = register;

    function register() {
      vm.dataLoading = true;
      vm.user.facebook = {
        "picture":{
          "data":{
            "url":"http://67.media.tumblr.com/cf431f02a476a427d3e2e5e46520e330/tumblr_nfybpsbnof1qarlxmo1_1280.png"

          }
        }
      }
      Main.create(vm.user, function(response) {
        if (response.type) {
          // Main.autheticateUser();
          $localStorage.token = response.token;
          $location.path('/');
          $rootScope.$broadcast('event:auth-loginConfirmed', Main.isAuthenticated())
        } else {
          vm.dataLoading = false;
          var error = {
            message: response.error.message
          }
          $rootScope.error =error;
        }
      }, function (error) {
        vm.dataLoading = false;
        if(error) {
          $rootScope.error = error;
        } else {
          var error = {
            message: 'Opps!!! An error occured processing your request. Please try later.'
          }
          $rootScope.error =error;        }
      });

    }
  }

})();
