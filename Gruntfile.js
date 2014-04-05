module.exports = function(grunt) {

 	grunt.initConfig({

    	pkg: grunt.file.readJSON('package.json'),
	    
		concat: {
			options: {
				separator: ';'
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
			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			options: {
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
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		},

		requirejs: {
			compile: {
				options: {
					baseUrl: "src/main/webapp/assets/scripts",
					mainConfigFile: "src/main/webapp/assets/scripts/config.js",
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
					sassDir: 'src/main/webapp/assets/styles/sass',
					cssDir: 'src/main/webapp/assets/styles',
					raw: 'preferred_syntax = :sass\n' // Use `raw` since it's not directly available
				}
			}
		}

 	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-requirejs'); 
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('style', ['compass']);
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'requirejs']);

};