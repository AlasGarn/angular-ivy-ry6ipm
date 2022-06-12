angular.module('nav', ['ngRoute']).component('home', {
  templateUrl: './nav.component.html',
  controller: [
    '$routeParams',
    function HeaderController($routeParams) {
      this.phoneId = $routeParams.phoneId;
    },
  ],
});

var app = angular.module('nav', ['ngRoute']);
app.config([
  '$routeProvider',
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.component.html',
      })
      .when('/CV', {
        templateUrl: 'app/home/home.component.html',
      })
      .when('/Pubs', {
        templateUrl: 'app/home/home.component.html',
      })
      .when('/projects', {
        templateUrl: 'app/projects/projects.component.html',
      })
      .otherwise({ redirectTo: '/' });
  },
]);

app.controller('headerController', function ($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
});
