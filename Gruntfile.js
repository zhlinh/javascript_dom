module.exports = function(grunt){
  require('load-grunt-tasks')(grunt); //load all the tasks
  //require('time-grunt')(grunt); //if you want to add time-grunt
  var fs = require('fs');
  var path = require('path');
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
            '.'  //set root directory
          ],
          middleware: function (connect, options, middlewares) {
            middlewares.unshift(function (req, res, next) {
              var filepath = path.join(options.base[0], req.url);
              if ('POSTPUTDELETE'.indexOf(req.method.toUpperCase()) > -1
                  && fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
                    return res.end(fs.readFileSync(filepath));
                  }
                  return next();
            });
            return middlewares;
          }
        }
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: '<%=connect.options.livereload%>'  //listen 35729
        },
        files: [  //watch files below
          './{,*/}*.html',
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
};
