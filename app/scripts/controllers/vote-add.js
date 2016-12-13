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
                                       $location, Main, $timeout, $uibModal, $log, $document) {
    var vm = this;
    var currentUser = {};
    var vote = $scope.vote = {};
    vote.day = 15;
    vote.babyName = [];

    $scope.$on('event:auth-loginConfirmed', Main.isAuthenticated());

    if (!Main.isAuthenticated()) {
      $rootScope.$broadcast('event:auth-loginRequired', Main.isAuthenticated())
    }

    $scope.isAuthenticated = Main.isAuthenticated();

    var names = $scope.names = [];

    $scope.saveVote = function () {
      Main.me(function (res) {
        $scope.currentUser = res.data.firstName + ' ' + res.data.lastName;
        vote.user = res.data._id;
        // $scope.vote.user = res.data.displayName;
        vote.day = $scope.slider_toggle.value;
        VoteFactory.post($scope.vote).then(function () {
          $location.path('/votes');
        });
      }, function (error) {
        console.log('Error: ' + error)
      });
      // if(names.length > 0) {
      //   names.forEach(function(each) {
      //     vote.babyName.push(each.text);
      //   });
      // }

      // var user = Main.me(function(res) {
      //   vote.user = res.data._id;


    };

    $scope.cancel = function () {
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

    $scope.open = function () {

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


  });


