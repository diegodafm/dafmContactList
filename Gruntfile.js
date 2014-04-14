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
                    configFile: "protractor_conf.js", // Target-specific config file
                    keepAlive: true, // If false, the grunt process stops when the test fails.
                    noColor: false, // If true, protractor will not use colors in its output.
                    args: {} // Target-specific arguments
                }
            }
        },

        karma: {
            unit: {
                urlRoot: '/app',
                configFile: 'karma.config.js',
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
    grunt.registerTask( 'test-karma', [ 'jsbeautifier:all', 'jshint', 'karma' ] );
    grunt.registerTask( 'test-protractor', [ 'jsbeautifier:all', 'jshint', 'protractor:dafm' ] );


};
