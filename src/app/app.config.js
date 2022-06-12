angular.module('mysite', ['ngRoute']).config([
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
