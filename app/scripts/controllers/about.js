'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.myInterval = 2000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [
      {image: "/images/us/6c93fc7f2ea7b1450ea6378fb569b065.jpg"},
      {image: "/images/us/20131127_123337.jpg"},
      // {image: "/images/us/20140329_155547.jpg"},
      // {image: "/images/us/20140703_151544.jpg"},
      {image: "/images/us/20140920_175051~2.jpg"},
      {image: "/images/us/20140920_191207~2.jpg"},
      // {image: "/images/us/20141011_225027.jpg"},
      {image: "/images/us/IMAG0499.jpg"},
      // {image: "/images/us/IMG_0062.JPG"},
      // {image: "/images/us/IMG_0073.JPG"},
      {image: "/images/us/IMG_0134.JPG"},
      {image: "/images/us/IMG_0162.JPG"},
      {image: "/images/us/IMG_0172.JPG"},
      {image: "/images/us/IMG_0210.jpg"},
      {image: "/images/us/IMG_2004.JPG"},
      {image: "/images/us/IMG_1960.JPG"},

      {image: "/images/us/IMG_1844.JPG"},
      {image: "/images/us/IMG_0692.JPG"},
      {image: "/images/us/IMG_0801.JPG"},
      {image: "/images/us/IMG_2720.JPG"},
      {image: "/images/us/thumb_IMG_2211_1024.jpg"},
      {image: "/images/us/thumb_IMG_2237_1024.jpg"},
      {image: "/images/us/thumb_IMG_2277_1024.jpg"}
    ];

    //
    //
    //
    //
    //
    //
    // thumb_IMG_2277_1024.jpg
    var currIndex = 0;

    // $scope.addSlide = function () {
    //   // var newWidth = 600 + slides.length + 1;
    //   slides.push({
    //     image: "/images/november.png",
    //     text: "November 2016",
    //     id: 1
    //   });
    //
    //   slides.push({
    //     image: "/images/december.png",
    //     text: "December 2016",
    //     id: 2
    //   });
    //
    //   slides.push({
    //     image: "/images/january.png",
    //     text: "January 2017",
    //     id: 3
    //   });
    // };
    //
    // $scope.addSlide();
    //

  });
