module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    build: {
      files: [
      {src: 'app/js/<%= pkg.name %>.js',  dest: 'app/js/<%= pkg.name %>.min.js'},
      {src: 'app/js/dependencies.js',  dest: 'app/js/dependencies.min.js'}
      ]
    }
  },
  concat: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    build: {
      files: [
      {
        src: [
        'app/bower_components/Chart.js/Chart.js',
        'app/bower_components/tc-angular-chartjs/dist/tc-angular-chartjs.js',
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-animate/angular-animate.js',
        'app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/angular-route/angular-route.js',
        'app/bower_components/jquery/jquery.js',
        'app/bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js'
        ],
        dest: 'app/js/dependencies.js'
      },
      {src: 'app/src/js/*.js', dest: 'app/js/<%= pkg.name %>.js'},
      {src: ['app/bower_components/bootswatch-dist/css/bootstrap.css','app/bower_components/bootstrap-datepicker/css/datepicker3.css','app/src/css/*.css'], dest: 'app/css/<%= pkg.name %>.css'}
      ]
    }
  } ,
  copy: {
    build: {
      files: [
      {expand: true, flatten: true, src: ['app/bower_components/bootswatch-dist/fonts/*'], dest: 'app/fonts/', filter: 'isFile'}
      ]
    }
  },
  watch: {
    files: ['app/src/*/*'],
    tasks: ['default'],
  }
});

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-copy');


// Default task(s).
grunt.registerTask('default', ['copy','concat','uglify']);

};