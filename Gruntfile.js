module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
            },
            all: ['src/**/*.js']
        },
        karma: {
            unit: {
                configFile: 'test.conf.js',
                autoWatch: true
            }
        },
        uglify: {
            build: {
                src: 'src/*.js',
                dest: 'build/injector.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint:all', 'karma']);
    grunt.registerTask('build', ['jshint:all', 'uglify']);
};
