(
    function () {

        var paths = {
            app: 'app',
            contactList: 'controllers/contactList',

            //THIRD PARTY LIBRARIES
            angular: 'libs/angular/angular.min',
            'angular-route': 'libs/angular/angular-route.min',
            'angularAMD': 'libs/angular/angularAMD',
            jQuery: 'libs/jQuery/jQuery-1.9.1',
            domReady: 'libs/require/domReady'
        };

        var shim = {
            angular: {
                deps: [ 'jQuery' ],
                exports: 'angular'
            },
            jQuery: {
                exports: 'jQuery'
            },
            'angularAMD': [ 'angular' ],
            'angular-route': {
                deps: [ 'angular' ],
                exports: 'ngRoute'
            },

        };

        requirejs.config( {
            "baseUrl": "assets/scripts/",
            "paths": paths,
            "shim": shim,
            // kick start application
            deps: [ 'app' ]
        } );
    }
)();
