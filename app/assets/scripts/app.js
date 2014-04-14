var app = angular.module( 'dafmContactList', [ 'ngRoute', 'ui.bootstrap' ] );
app.config( [ '$routeProvider',
    function ( $routeProvider ) {
        $routeProvider.when( '/', {
            controller: 'ContactController',
            navTab: "home",
            templateUrl: 'templates/contactList.html'
        } ).when( '/:status', {
            controller: 'TodoCtrl',
            templateUrl: 'todomvc-index.html'
        } ).otherwise( {
            redirectTo: '/'
        } );
    }
] );
