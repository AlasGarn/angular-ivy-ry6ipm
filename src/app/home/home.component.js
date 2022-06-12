angular.module('home').component('home', {
  templateUrl: './home.component.html',
  controller: [
    '$routeParams',
    function HeaderController($routeParams) {
      this.phoneId = $routeParams.phoneId;
    },
  ],
});
