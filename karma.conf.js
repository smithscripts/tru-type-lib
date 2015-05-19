module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: './',

        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // 3rd-party code
            'test/lib/jquery/jquery.js',
            'test/lib/jquery/jasmine-jquery.js',
            'test/lib/angular/1.2.22/angular.js',
            'test/lib/angular/1.2.22/angular-animate.js',
            'test/lib/angular/1.2.22/angular-mocks.js',
            'test/lib/angular/1.2.22/browserTrigger.js',

            // app code
            'src/js/tru-type-lib.js',
            'src/js/std-formatters.js',
            'src/js/core/**/*.js',
            'src/js/common/directives/**/*.js',
            'src/js/common/polyfills/**/*.js',
            'src/js/common/services/**/*.js',
            'src/js/common/filters/**/*.js',
            'src/js/common/formatters/**/*.js',

            // tests
            'test/directives/*.js',
            'test/services/*.js',

            'test/**/*datetimeSpanShortSpec.js',

            // templates
            'src/templates/**/*.html'
        ],

        // list of files to exclude
        exclude: [

        ],

        preprocessors: {
            // location of templates
            'src/templates/**/*.html': ['html2js'],
            'src/js/**/*.js' : 'coverage'
        },

        coverageReporter: {
            type: "lcov",
            dir: "coverage/"
        },

        reporters: ['coverage', 'coveralls'],

        // web server port
        // CLI --port 9876
        port: 9020,

        // enable / disable colors in the output (reporters and logs)
        // CLI --colors --no-colors
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // CLI --log-level debug
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        // CLI --capture-timeout 5000
        captureTimeout: 20000,

        // Auto run tests on start (when browsers are captured) and exit
        // CLI --single-run --no-single-run
        singleRun: false,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 500,

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-html2js-preprocessor',
            'karma-phantomjs-launcher',
            'karma-script-launcher',
            'karma-coverage'
        ]
    });
};