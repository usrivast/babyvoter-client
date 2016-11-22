(function () {
  'use strict';

  angular
    .module('clientApp')
    .controller('SignInCtrl', SignInCtrl);

  SignInCtrl.$inject = ['$location', '$localStorage', '$rootScope', 'Main'];
  function SignInCtrl($location, $localStorage, $rootScope, Main) {
    var vm = this;
    vm.signin = signin;

    function signin () {
      vm.loading = true;

      var data = vm.formdata;
      Main.signin(data, function (res) {
        if (res.type == false) {
          vm.loading = false;
          vm.error = res.data;
        } else {
          vm.loading = false;
          $localStorage.token = res.data.token;
          $location.path('/');
          $rootScope.$broadcast('event:auth-loginConfirmed', Main.isAuthenticated())
        }
      }, function (error) {
        vm.loading = false;
        $rootScope.error = error.message;
      })
    };
  }

})();
