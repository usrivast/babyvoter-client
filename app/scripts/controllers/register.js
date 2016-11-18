(function () {
  'use strict';

  angular
    .module('clientApp')
    .controller('RegisterCtlr', RegisterController);

  RegisterController.$inject = [ '$location', '$rootScope', 'Main'];
  function RegisterController($location, $rootScope, Main) {
    var vm = this;

    vm.register = register;

    function register() {
      vm.dataLoading = true;
      Main.create(vm.user, function(response) {
        if (response.result) {
          Main.autheticateUser();
          $location.path('/');
        } else {
          vm.dataLoading = false;
        }
      }, function () {
        $rootScope.error = 'Failed to fetch details';
      });

    }
  }

})();
