module.exports = function (grunt) {
  require('jit-grunt')(grunt);
  require('time-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // add vendor prefixes to stylesheets
    autoprefixer: {
      development: {
        options: {
          browsers: ['> 1%', 'last 2 versions', 'Opera 12.1', 'Firefox ESR', 'ie >= 9'],
          map: true
        },
        files: [{
          expand: true, // Enable dynamic expansion
          flatten: true, // Remove all path parts from generated dest paths.
          src: ['css/*.css'], // Actual pattern(s) to match.
          dest: 'css/' // Destination path prefix.
        }],
      }
    },
    imagemin: {
      options: {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      },
      development: {
        files: ['**/*.{png,jpg,gif,jpeg}']
      }
    },
    sass: {
      development: {
        options: {
          sourcemap: 'inline',
          trace: true,
          style: 'expanded',
          debugInfo: false,
          lineNumbers: true,
        },
        files: {
          'css/style.css' : 'scss/style.scss'
        }
      },
      production: {
        options: {
          sourcemap: 'none',
          trace: false,
          style: 'compressed',
          noCache: true,
        },
        files: {
          'css/style.css' : 'scss/style.scss'
        }
      }
    },
    watch: {
      sass: {
        files: ['scss/*.scss', 'scss/**/*.scss'],
        tasks: ['sass:development', 'autoprefixer'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['*.html'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['*.js', '**/*.js', '!js/site.min.js'],
        tasks: ['uglify:development'],
        options: {
          livereload: true
        }
      }
    },
    uglify: {
      development: {
        options: {
          preserveComments: 'all',
          beautify: true,
          mangle: {
            except: ['jQuery']
          }
        },
        files: {
          'js/site.min.js': ['js/*.js','!js/site.min.js']
        }
      },
      production: {
        options: {
          compress: {
            drop_console: true
          },
          preserveComments: false,
          mangle: {
            except: ['jQuery']
          }
        },
        files: {
          'js/site.min.js': ['js/*.js','!js/site.min.js']
        }
      }
    },
  });

  grunt.registerTask('default', ['uglify:development', 'sass:development', 'watch']);
  grunt.registerTask('dev', ['uglify:development','sass:development', 'autoprefixer']);
  grunt.registerTask('production', ['uglify:production','sass:production', 'autoprefixer']);
};