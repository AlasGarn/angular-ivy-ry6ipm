var app = angular.module('mysite', ['ngRoute']);
app.config([
  '$routeProvider',
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.component.html',
      })
      .when('/projects', {
        templateUrl: 'app/home/projects.component.html',
      })
      .otherwise({ redirectTo: '/' });
  },
]);
console.log('route provider');
app.controller('headerController', function ($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
});
