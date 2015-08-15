module.exports = function(grunt){
    require('load-grunt-tasks')(grunt); //load all the tasks
    //require('time-grunt')(grunt); //if you want to add time-grunt
    grunt.initConfig({
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost', //set IP，localhost or other domain name
                livereload: 35729  //declare for grunt-watch listening port
            },
            server: {
                options: {
                    open: true, //auto open website http://
                    base: [
                        './'  //set root directory
                    ]
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>'  //listen 35729
                },
                files: [  //watch files below
                    '*.html',
                    '*/*.html',
                    './styles/{,*/}*.css',
                    './scripts/{,*/}*.js',
                    './images/{,*/}*.{png,jpg,gif}'
                ]
            }
        }
    });
    grunt.registerTask('server', [
        'connect:server',
        'watch'
    ]);
}
