'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VoteAddCtrl
 * @description
 * # VoteAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('VoteAddCtrl', function ($rootScope, $scope, VoteFactory, UserFactory,
                                       $location, Main, $timeout, $uibModal, $log, user) {
    var vm = this;
    var vote = $scope.vote = {};
    vote.day = 15;
    vote.babyName = [];
    var error = $scope.error ={};
    $scope.currentUser = user;

    $scope.$on('event:auth-loginConfirmed', Main.isAuthenticated());

    if (!Main.isAuthenticated()) {
      $rootScope.$broadcast('event:auth-loginRequired', Main.isAuthenticated())
    }

    $scope.isAuthenticated = Main.isAuthenticated();

    var names = $scope.names = [];

    function validateVotes () {
      if(vote.day<1){
        error.msg = "Please select the day";
        error.status = true;
        return error;
      }
      if(!vote.month){
        error.msg = "Please select the month";
        error.status = true;
        return error;
      }
      if(!vote.gender){
        error.msg = "Please select the gender";
        error.status = true;
        return error;
      }
      error.status = false;
      return error;
    }

    $scope.$on('$routeChangeStart', function(next, current) {
      if((current.$$route.templateUrl !== 'views/vote-add.html')&&(current.$$route.templateUrl !== 'views/vote-view.html')){
        alert('Your vote has not been saved!!');
      }

    });

    vm.openVote = openVote;
    function openVote () {
      Main.me(function (res) {
        $scope.currentUser = res.data.firstName + ' ' + res.data.lastName;
        vote.user = res.data._id;
        // $scope.vote.user = res.data.displayName;
        vote.day = $scope.slider_toggle.value;
        error = validateVotes();
        if(!error.status) {
          openConfirmModal();
          // VoteFactory.post($scope.vote).then(function () {
          //   $location.path('/votes');
          // });
        }
      }, function (err) {

        console.log('Error: ' + err);
        error.status = true;
        error.msg = 'An error occured while saving. Please try later. ' + err;
      });

      // if(names.length > 0) {
      //   names.forEach(function(each) {
      //     vote.babyName.push(each.text);
      //   });
      // }

      // var user = Main.me(function(res) {
      //   vote.user = res.data._id;


    };

    vm.cancel = cancel;

    function cancel () {
      $location.path('/votes');
    }

    $scope.setGender = setGender;

    function setGender(gender) {
      $scope.vote.gender = gender;
    }


    var months = [
      'November',
      'December',
      'January'
    ];

    var noDays = 31;
    $scope.days = (function () {
      var list = [];
      for (var i = 1; i <= noDays; i++) {
        list.push(i);
      }
      return list;

    })();

    $scope.genders = [
      'boy',
      'girl'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.myInterval = 2000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.setMonth = function (index) {
      if(index==0){
        alert('Cannot select a past month');
      }

      if (index) {
        $scope.active = index;
        $scope.myInterval = 0;
        $scope.$broadcast('rzSliderForceRender');
        vote.month = months[index];
      }
    };

    // $scope.slides = [{
    //   image: "/images/baby-boy.png",
    //   text: "boy",
    //   id: 1
    // }, {
    //   image: "/images/baby-girl.png",
    //   text: "girl",
    //   id: 2
    // }];

    $scope.addSlide = function () {
      // var newWidth = 600 + slides.length + 1;
      slides.push({
        image: "/images/november.png",
        text: "November 2016",
        id: 1
      });

      slides.push({
        image: "/images/december.png",
        text: "December 2016",
        id: 2
      });

      slides.push({
        image: "/images/january.png",
        text: "January 2017",
        id: 3
      });
    };

    $scope.addSlide();

    $scope.slider_toggle = {
      value: vote.day,
      options: {
        floor: 1,
        ceil: noDays
      }
    };

    $timeout(function () {
      $scope.$broadcast('rzSliderForceRender');
    });

    vm.openNameModal = function () {

      var modalInstance = $uibModal.open({
        templateUrl: '/views/vote-babyname.html',
        controller: ModalInstanceCtrl
      });


      modalInstance.result.then(function (name) {
        if (name) {
          vote.babyName.push(name);
        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    var ModalInstanceCtrl = function ($scope, $uibModalInstance) {
      $scope.babyName = {};

      $scope.ok = function () {
        $uibModalInstance.close($scope.babyName);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    };

    function openConfirmModal () {
      var confirmModalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        templateUrl: '/views/vote-view-modal.html',
        controller: ConfirmModalInstanceCtrl,
        controllerAs: ConfirmModalInstanceCtrl,
        resolve: {
          vote: function () {
            return vote;
          }
        }
      });

      confirmModalInstance.result.then(function (result) {
        if(result.status){
          console.log("error", result.msg);
          $scope.error = result;
        } else {
          $rootScope.$broadcast('event:vote-submit');
        }
      }, function () {
        $log.info('modal-component dismissed at: ' + new Date());
      });
    };

    var ConfirmModalInstanceCtrl = function ($scope, $uibModalInstance, Main, vote) {
      vm = this;
      $scope.vote= vote;

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      }

      $scope.saveVote = function () {
            VoteFactory.post($scope.vote).then(function (res) {
              if(res.result) {
                console.log("saved", res.status);
                $uibModalInstance.close(res);
                $location.path('/vote/'+res.data._id+'/success');
              }else{
                console.log("error", res.data);
                var error = {};
                error.msg = res.data;
                error.status = true;
                $uibModalInstance.close(error);

              }
            }),function(response) {
              $uibModalInstance.close();
              console.log("Error with status code", response.status);
              $scope.error.msg = response.statusText;
            }
        // if(names.length > 0) {
        //   names.forEach(function(each) {
        //     vote.babyName.push(each.text);
        //   });
        // }

        // var user = Main.me(function(res) {
        //   vote.user = res.data._id;


      };


    };

  });


