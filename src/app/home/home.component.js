angular.module('home').controller('home-controller', [
  '$scope',
  function ($scope) {
    ($scope.title = 'About'), ($scope.image = 'images/ape.png');
  },
]);
