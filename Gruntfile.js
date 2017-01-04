'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    }
  });

  grunt.registerTask('serve', [
    'nodemon'
  ]);

  grunt.registerTask('default', function () {
    grunt.log.writeln('Use `grunt serve` to start a server.');
    grunt.task.run(['nodemon']);
  });
};
