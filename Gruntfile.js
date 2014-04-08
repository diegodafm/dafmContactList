module.exports = function(grunt) {

	var path = '/app';

 	grunt.initConfig({

    	pkg: grunt.file.readJSON('package.json'),
	    
		concat: {
			options: {
				separator: ';\n'
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		jshint: {
			server: [
                '**/*.js',
                '!node_modules/**/*.js', 
                '!dist/**/*.js',
                '!app/assets/scripts/libs/**/*.js'
            ],
			options: {
				node:true, 
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
 
		watch: {
			livereload: {
				options: {
					livereload: true
				},
				files: ['<%= path %>/**/*.{css, js, html}']
			}
		},

		requirejs: {
			compile: {
				options: {
					baseUrl: "<%= path %>/assets/scripts",
					mainConfigFile: "<%= path %>/assets/scripts/config.js",
					done: function(done, output) {
						var duplicates = require('rjs-build-analysis').duplicates(output);

						if (duplicates.length > 0) {
							grunt.log.subhead('Duplicates found in requirejs build:');
							grunt.log.warn(duplicates);
							done(new Error('r.js built duplicate modules, please check the excludes option.'));
						}

						done();
					}
				}
			}
		},

		compass: {
			dist: {
				options: {
					sassDir: '<%= path %>/assets/styles/sass',
					cssDir: '<%= path %>/assets/styles',
					raw: 'preferred_syntax = :sass\n' // Use `raw` since it's not directly available
				}
			}
		},

		concurrent: {
			tasks: ['watch', 'jshint', 'web_server'],
            options: {
                logConcurrentOutput: true
            }
		},
		
		web_server: {
		    options: {
		      cors: true,
		      port: 8000,
		      nevercache: true,
		      logRequests: true
		    },
		    foo: 'bar' // For some reason an extra key with a non-object value is necessary
		  },
 	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-requirejs'); 
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-web-server');	

	grunt.registerTask('style', ['compass']);
	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('server', [ 'concurrent'] );

};