module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
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

    grunt.registerTask('default', ['jshint', 'karma']);
    grunt.registerTask('build', ['jshint', 'uglify']);
};
