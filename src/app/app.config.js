var app = angular.module('mysite', ['ngRoute'])
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

app.controller("loginController", function ($scope, $location) {
           
  $scope.authenticate = function (username) {
      // write authentication code here.. 

      $location.path('/student/' + username)
  };

});

app.controller("studentController", function ($scope, $routeParams) {
  $scope.username = $routeParams.username;
});