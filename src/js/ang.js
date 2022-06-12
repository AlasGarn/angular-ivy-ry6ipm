(function () {
  var app = angular.module('mysite', ['ngRoute']);
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/html/home.html',
      })
      .when('/projects', {
        templateUrl: '/html/projects.html',
      })
      .otherwise({ redirectTo: '/' });
  });
})();

(function () {
  var headerController = function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  };
  angular.module('mysite').controller('HeaderController', headerController);
})();
