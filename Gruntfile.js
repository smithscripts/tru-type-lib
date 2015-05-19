module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            options: { force: true},
            templates: {
                src: ['build/dist/templates.js']
            },
            all: {
                src: ['build/**/*.*']
            }
        },
        concat: {
            js: {
                src: ['src/js/tru-type-lib.js',
                      'src/js/std-formatters.js',
                      'src/js/core/**/*.js',
                      'src/js/common/directives/**/*.js',
                      'src/js/common/polyfills/**/*.js',
                      'src/js/common/services/**/*.js',
                      'src/js/common/formatters/**/*.js',
                    '<%= ngtemplates.app.dest %>'],
                dest: 'build/dist/tru-type-lib.js',
                nonull: true
            },
            css: {
                src: [
                    'src/css/**/*.css',
                    //'src/css/edit/*.css',
                    //'src/css/list/*.css',
                    //'src/css/query/*.css',
                    //'src/css/**/*.css',
                    //'src/css/**/*.css',
                ],
                dest: 'build/dist/tru-type-lib.css',
                nonull: true
            }
        },
        ngtemplates:  {
            app: {
                src: 'src/**/*.html',
                dest: 'build/dist/templates.js',
                options: {
                    module: 'tru.type.lib'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/dist/tru-type-lib.min.js': ['build/dist/tru-type-lib.js']
                }
            }
        },
        copy: {
            cssToDemo: {
                expand: true,
                cwd: 'build/dist/',
                src: 'tru-type-lib.css',
                dest: 'demo/',
                flatten: false
            },
            cssToDist: {
                expand: true,
                cwd: 'build/dist/',
                src: 'tru-type-lib.css',
                dest: 'dist/',
                flatten: false
            },
            srcToDemo: {
                expand: true,
                cwd: 'build/dist/',
                src: 'tru-type-lib.js',
                dest: 'demo/',
                flatten: false
            },
            srcToDist: {
                expand: true,
                cwd: 'build/dist/',
                src: 'tru-type-lib.js',
                dest: 'dist/',
                flatten: false
            }
        },
        'gh-pages': {
            options: {
                base: 'build',
                add:true
            },
            src: '**/*'
        },
        // Test settings
        karma: {
            options: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS']
            },
            unit: {
                singleRun: true,
                options: {
                    reporters: ['dots', 'coverage']
                }
            },
            server: {
                autoWatch: true
            }
        },
        // Test coverage
        coveralls: {
            options: {
                debug: true,
                coverage_dir: 'test/',
                dryRun: false,
                force: true,
                recursive: true
            }
        },
        ngdocs: {
            all: ['src/js/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-karma-coveralls');
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.registerTask('default', [
        'clean',
        'ngtemplates',
        'concat:js',
        'concat:css',
        //'uglify',
        'clean:templates',
        'copy:cssToDemo',
        'copy:cssToDist',
        //'gh-pages',
        'copy:srcToDemo',
        'copy:srcToDist',
        'clean',
        'ngdocs',
        'karma:unit',
        'coveralls']);
}