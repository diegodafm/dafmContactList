module.exports = function ( grunt ) {

    var path = '/app';

    grunt.initConfig( {

        pkg: grunt.file.readJSON( 'package.json' ),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [ '**/*.js',
                    '!node_modules/**/*.js',
                    '!dist/**/*.js',
                    '!app/assets/libs/**/*.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': [ '<%= concat.dist.dest %>' ]
                }
            }
        },

        jshint: {
            server: [
                '**/*.js',
                '!node_modules/**/*.js',
                '!dist/**/*.js',
                '!app/assets/libs/**/*.js'
            ],
            options: {
                node: true,
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
                "-W099": true
            }
        },

        jsbeautifier: {
            all: {
                src: [
                    '**/**.js',
                    '!node_modules/**',
                    '!tools/grunt-template-jasmine-requirejs/**',
                    '!test/jasmine/common/**',
                    '!app/assets/scripts/libs/**/*.js'
                ],
                options: {
                    config: 'config/js-beautify.json'
                }
            }
        },

        watch: {
            livereload: {
                options: {
                    livereload: true
                },
                files: [ '<%= path %>/**/*.{css, js, html}' ]
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'app/assets/styles/sass',
                    cssDir: 'app/assets/styles',
                    raw: 'preferred_syntax = :sass\n' // Use `raw` since it's not directly available
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    base: 'app/',
                    hostname: 'localhost',
                    keepalive: true,
                    livereload: true
                }
            }
        },

        jasmine: {
            pivotal: {
                src: 'app/assets/scripts/**/*.js',
                options: {
                    specs: 'spec/*Spec.js',
                    helpers: 'spec/*Helper.js'
                }
            }
        },

        protractor: {
            options: {
                configFile: "node_modules/protractor/referenceConf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            dafm: {
                options: {
                    configFile: "test/protractor.conf.js", // Target-specific config file
                    keepAlive: true, // If false, the grunt process stops when the test fails.
                    noColor: false, // If true, protractor will not use colors in its output.
                    args: {} // Target-specific arguments
                }
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                runnerPort: 9999,
                browsers: [ 'Chrome' ]
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-compass' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-jsbeautifier' );
    grunt.loadNpmTasks( 'grunt-contrib-jasmine' );
    grunt.loadNpmTasks( 'grunt-protractor-runner' );
    grunt.loadNpmTasks( 'grunt-karma' );

    grunt.registerTask( 'style', [ 'compass' ] );
    grunt.registerTask( 'default', [ 'jshint', 'jsbeautifier:all', 'concat', 'uglify' ] );
    grunt.registerTask( 'server', [ 'jsbeautifier:all', 'jshint', 'connect:server' ] );


};;
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
] );;
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
)();;
app.controller( 'ContactController', [ 'ContactService', '$scope', '$modal',

    function ( ContactService, $scope, $modal ) {

        $scope.list = ContactService.getAllContacts();

        $scope.editContact = function ( $contact ) {
            var modalInstance = $modal.open( {
                templateUrl: 'templates/editContact.html',
                controller: 'EditUserController',
                resolve: {
                    contact: function () {
                        return $contact;
                    }
                }
            } ).result.then( function ( result ) {
                ContactService.edit( result.contact );
                $scope.list = ContactService.getAllContacts();
            } );
        };

        $scope.newContact = function () {
            var modalInstance = $modal.open( {
                templateUrl: 'templates/editContact.html',
                controller: 'NewUserController'
            } ).result.then( function ( result ) {
                ContactService.add( result.contact );
                $scope.list = ContactService.getAllContacts();
            } );
        };

        $scope.removeContact = function ( $contact ) {
            var modalInstance = $modal.open( {
                templateUrl: 'templates/removeContact.html',
                controller: 'RemoveUserController',
                resolve: {
                    contact: function () {
                        return $contact;
                    }
                }
            } ).result.then( function ( result ) {
                ContactService.remove( result.contact );
                $scope.list = ContactService.getAllContacts();
            } );
        };
    }
] );

app.controller( 'EditUserController', function ( $rootScope, $scope, $modalInstance, contact ) {
    $scope.title = 'Edit Contact';
    $scope.contact = {
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        address: contact.address,
    };

    $scope.ok = function () {
        $modalInstance.close( $scope );
    };

    $scope.cancel = function () {
        $modalInstance.dismiss( 'cancel' );
    };
} );


app.controller( 'NewUserController', function ( $rootScope, $scope, $modalInstance ) {
    $scope.title = 'Add Contact';
    $scope.contact = {
        id: '',
        name: '',
        phone: '',
        address: ''
    };

    $scope.cancel = function () {
        $modalInstance.dismiss( 'cancel' );
    };

    $scope.ok = function () {
        $modalInstance.close( $scope );
    };

} );

app.controller( 'RemoveUserController', function ( $rootScope, $scope, $modalInstance, contact ) {
    $scope.title = 'Remove Contact';
    $scope.contact = {
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        address: contact.address,
    };

    $scope.cancel = function () {
        $modalInstance.dismiss( 'cancel' );
    };

    $scope.ok = function () {
        $modalInstance.close( $scope );
    };

} );;
app.service( 'ContactService', [ '$log',
    function ( $log ) {

        return {
            add: function ( contact ) {
                var list = this.getAllContacts();
                contact.id = 'id_' + ( new Date() ).getTime();
                list.push( contact );
                localStorage.dafmContactList = angular.toJson( list );
            },

            edit: function ( contact ) {
                var list = angular.fromJson( localStorage.dafmContactList );
                for ( var i = list.length - 1; i >= 0; i-- ) {
                    if ( list[ i ].id == contact.id ) {
                        list[ i ] = contact;
                    }
                }
                localStorage.dafmContactList = angular.toJson( list );

            },

            remove: function ( contact ) {
                var list = angular.fromJson( localStorage.dafmContactList );
                for ( var i = list.length - 1; i >= 0; i-- ) {
                    if ( list[ i ].id == contact.id ) {
                        list.splice( i, 1 );
                    }
                }
                localStorage.dafmContactList = angular.toJson( list );
            },

            getAllContacts: function () {
                if ( !localStorage.dafmContactList || localStorage.dafmContactList === "" ) {
                    return [];
                } else {
                    return angular.fromJson( localStorage.dafmContactList );
                }
            }
        };
    }
] );; // Karma configuration
// Generated on Mon Apr 14 2014 03:48:22 GMT-0300 (BRT)

module.exports = function ( config ) {
    config.set( {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [ 'jasmine' ],


        // list of files / patterns to load in the browser
        files: [

        ],


        // list of files to exclude
        exclude: [

        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'progress' ],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [ 'Chrome' ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    } );
};;
describe( "hello-test", function () {
    var ptor = progractor.getInstance();

    describe( "index", function () {
        it( "Should display the correct title", function () {
            ptor.get( '#/' );
            expect( ptor.getTitle() ).toBe( 'hello' );
        } );
    } );
} );;
define( function () {
    return "hello";
} );;
require( [ 'hello', 'world' ], function ( hello, world ) {
    console.log( hello, world );
} );;
define( function () {
    return "world";
} );;
exports.config = {
    specs: [
        './e2e/**/*.spec.js'
    ],

    chromeDriver: '../node_modules/protractor/selenium/chromedriver',

    baseUrl: 'http://localhost:3333'
};
