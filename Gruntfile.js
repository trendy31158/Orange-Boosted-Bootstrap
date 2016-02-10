/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  /* boosted mod */
  var serveStatic = require('serve-static');
  /* end mod */
  var fs = require('fs');
  var path = require('path');
  var glob = require('glob');
  var isTravis = require('is-travis');
  var npmShrinkwrap = require('npm-shrinkwrap');
  var mq4HoverShim = require('mq4-hover-shim');
  var autoprefixerSettings = require('./grunt/autoprefixer-settings.js');
  var autoprefixer = require('autoprefixer')(autoprefixerSettings);

  var generateCommonJSModule = require('./grunt/bs-commonjs-generator.js');
  var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' });

  Object.keys(configBridge.paths).forEach(function (key) {
    configBridge.paths[key].forEach(function (val, i, arr) {
      arr[i] = path.join('./.tmpdocs/assets', val);
    });
  });

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n' +
            ' */\n',
    jqueryCheck: 'if (typeof jQuery === \'undefined\') {\n' +
                 '  throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery\')\n' +
                 '}\n',
    jqueryVersionCheck: '+function ($) {\n' +
                        '  var version = $.fn.jquery.split(\' \')[0].split(\'.\')\n' +
                        '  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 3)) {\n' +
                        '    throw new Error(\'Bootstrap\\\'s JavaScript requires at least jQuery v1.9.1 but less than v3.0.0\')\n' +
                        '  }\n' +
                        '}(jQuery);\n\n',

    // Task configuration.
    clean: {
      dist: 'dist',
      docs: 'docs/dist',
      tmp: '.tmpdocs'
    },

    // JS build configuration
    lineremover: {
      es6Import: {
        files: {
          '<%= concat.bootstrap.dest %>': '<%= concat.bootstrap.dest %>'
        },
        options: {
          exclusionPattern: /^(import|export)/g
        }
      }
    },

    babel: {
      dev: {
        options: {
          sourceMap: true,
          modules: 'ignore'
        },
        files: {
          'js/dist/util.js'      : 'js/src/util.js',
          'js/dist/alert.js'     : 'js/src/alert.js',
          'js/dist/button.js'    : 'js/src/button.js',
          'js/dist/carousel.js'  : 'js/src/carousel.js',
          'js/dist/collapse.js'  : 'js/src/collapse.js',
          'js/dist/dropdown.js'  : 'js/src/dropdown.js',
          'js/dist/modal.js'     : 'js/src/modal.js',
          'js/dist/scrollspy.js' : 'js/src/scrollspy.js',
          'js/dist/tab.js'       : 'js/src/tab.js',
          'js/dist/tooltip.js'   : 'js/src/tooltip.js',
          'js/dist/megamenu.js'   : 'js/src/megamenu.js',
          'js/dist/popover.js'   : 'js/src/popover.js'
        }
      },
      dist: {
        options: {
          modules: 'ignore'
        },
        files: {
          '<%= concat.bootstrap.dest %>' : '<%= concat.bootstrap.dest %>'
        }
      },
      umd: {
        options: {
          modules: 'umd'
        },
        files: {
          'dist/js/umd/util.js'      : 'js/src/util.js',
          'dist/js/umd/alert.js'     : 'js/src/alert.js',
          'dist/js/umd/button.js'    : 'js/src/button.js',
          'dist/js/umd/carousel.js'  : 'js/src/carousel.js',
          'dist/js/umd/collapse.js'  : 'js/src/collapse.js',
          'dist/js/umd/dropdown.js'  : 'js/src/dropdown.js',
          'dist/js/umd/modal.js'     : 'js/src/modal.js',
          'dist/js/umd/scrollspy.js' : 'js/src/scrollspy.js',
          'dist/js/umd/tab.js'       : 'js/src/tab.js',
          'dist/js/umd/tooltip.js'   : 'js/src/tooltip.js',
          'dist/js/umd/megamenu.js'   : 'js/src/megamenu.js',
          'dist/js/umd/popover.js'   : 'js/src/popover.js'
        }
      }
    },

    eslint: {
      options: {
        configFile: 'js/.eslintrc'
      },
      target: 'js/src/*.js'
    },

    jscs: {
      options: {
        config: 'js/.jscsrc'
      },
      grunt: {
        src: ['Gruntfile.js', 'grunt/*.js']
      },
      core: {
        src: 'js/src/*.js'
      },
      test: {
        src: 'js/tests/unit/*.js'
      },
      assets: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null
        },
        src: ['.tmpdocs/assets/js/src/*.js', '.tmpdocs/assets/js/*.js', '!.tmpdocs/assets/js/*.min.js']
      }
    },

    stamp: {
      options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>\n+function ($) {\n',
        footer: '\n}(jQuery);'
      },
      bootstrap: {
        files: {
          src: '<%= concat.bootstrap.dest %>'
        }
      }
    },

    concat: {
      options: {
        stripBanners: false
      },
      bootstrap: {
        src: [
          'js/src/util.js',
          'js/src/alert.js',
          'js/src/button.js',
          'js/src/carousel.js',
          'js/src/collapse.js',
          'js/src/dropdown.js',
          'js/src/modal.js',
          'js/src/scrollspy.js',
          'js/src/tab.js',
          'js/src/tooltip.js',
          'js/src/megamenu.js',
          'js/src/popover.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      /* boosted mod */
      plugins: {
        src: [
          'dist/js/<%= pkg.name %>.js',
          'bower_components/jquery.tablesorter/dist/js/jquery.tablesorter.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      docsJs: {
          src: [
              '.tmpdocs/assets/js/src/application.js',
              '.tmpdocs/assets/js/src/application-orange.js'
          ],
          dest: '.tmpdocs/assets/js/src/application.js'
      },
      fontIcons: {
          src: [
          'dist/css/<%= pkg.name %>.css',
          'bower_components/fontawesome/css/font-awesome.css'
          ],
          dest: 'dist/css/<%= pkg.name %>.css'
      }
      /* end mod */
    },

    uglify: {
      options: {
        compress: {
          warnings: false
        },
        mangle: true,
        preserveComments: /^!|@preserve|@license|@cc_on/i
      },
      core: {
        src: '<%= concat.bootstrap.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      docsJs: {
        src: configBridge.paths.docsJs,
        dest: '.tmpdocs/assets/js/docs.min.js'
      }
    },

    qunit: {
      options: {
        inject: 'js/tests/unit/phantom.js'
      },
      files: 'js/tests/index.html'
    },

    // CSS build configuration
    scsslint: {
      options: {
        bundleExec: true,
        config: 'scss/.scss-lint.yml',
        reporterOutput: null
      },
      core: {
        src: ['scss/{,**/}*.scss', '!scss/_normalize.scss']
      },
      docs: {
        src: ['docs/assets/scss/*.scss', '!scss/_normalize.scss', '!docs/assets/scss/docs.scss']
      }
    },

    postcss: {
      core: {
        options: {
          map: true,
          processors: [
            mq4HoverShim.postprocessorFor({ hoverSelectorPrefix: '.bs-true-hover ' }),
            autoprefixer
          ]
        },
        src: 'dist/css/*.css'
      },
      docs: {
        options: {
          processors: [
            autoprefixer
          ]
        },
        src: ['docs/assets/css/docs.min.css']
      },
      examples: {
        options: {
          processors: [
            autoprefixer
          ]
        },
        expand: true,
        cwd: 'docs/examples/',
        src: ['**/*.css'],
        dest: 'docs/examples/'
      }
    },

    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        compatibility: 'ie9',
        keepSpecialComments: '*',
        sourceMap: true,
        advanced: false
      },
      core: {
        files: [
          {
            expand: true,
            cwd: 'dist/css',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/css',
            ext: '.min.css'
          }
        ]
      },
      docs: {
        src: '.tmpdocs/assets/css/docs.min.css',
        dest: '.tmpdocs/assets/css/docs.min.css'
      }
    },

    csscomb: {
      options: {
        config: 'scss/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      },
      examples: {
        expand: true,
        cwd: '.tmpdocs/examples/',
        src: '**/*.css',
        dest: '.tmpdocs/examples/'
      },
      docs: {
        src: '.tmpdocs/assets/css/src/docs.css',
        dest: '.tmpdocs/assets/css/src/docs.css'
      }
    },

    copy: {
      docs: {
        expand: true,
        cwd: 'dist/',
        src: [
          '**/*'
        ],
        dest: '.tmpdocs/dist/'
      },
      /* boosted mod */
      tmpdocs: {
        files: [
          {
            cwd: 'docs',
            expand: true,
            src: ['{,**/}*'],
            dest: '.tmpdocs'
          },
          {
            cwd: 'docs-orange',
            expand: true,
            src: ['{,**/}*'],
            dest: '.tmpdocs'
          }
        ]
      },
      fonts: {
        expand: true,
        cwd: 'fonts/',
        src: ['*'],
        dest: 'dist/fonts/'
      },
      fontIcons: {
        expand: true,
        cwd: 'bower_components/fontawesome/fonts/',
        src: ['*'],
        dest: 'dist/fonts/'
      },
      img: {
        expand: true,
        cwd: 'img/',
        src: ['*'],
        dest: 'dist/img/'
      }
      /* end mod */
    },

    /* boosted mod */
    connect: {
    //   server: {
    //     options: {
    //       port: 3000,
    //       base: '.'
    //     }
    //   }
    // },
      livereload: {
        options: {
          open: true,
          port: 9000,
          middleware: function (connect) {
            return [
              serveStatic('_gh_pages')
            ];
          }
        }
      }
      },
    /* end mod */

    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        incremental: false
      },
      docs: {},
      github: {
        options: {
          raw: 'github: true'
        }
      }
    },

    /* boosted mod */
    replace: {
        paths1: {
          src: ['_gh_pages/*.html'],
          overwrite: true,
          replacements: [{
                from: 'href="/',
                to: 'href="'
            }]
        },
        paths2: {
          src: ['_gh_pages/*/*.html'],
          overwrite: true,
          replacements: [{
                from: 'href="/',
                to: 'href="../'
            },
            {
              from: 'src="dist',
              to: 'src="../dist',
            },
            {
              from: 'src="/dist',
              to: 'src="../dist',
            },
            {
              from: 'src="/assets',
              to: 'src="../assets',
            },
            {
              from: 'src="/../assets',
              to: 'src="../assets',
            },
            {
              from: 'src="/examples',
              to: 'src="../examples',
            }]
        },
        paths3: {
          src: ['_gh_pages/*/*/*.html'],
          overwrite: true,
          replacements: [{
                from: 'href="/',
                to: 'href="../../'
            },
            {
              from: 'src="/dist',
              to: 'src="../../dist',
            },
            {
              from: 'src="dist',
              to: 'src="../../dist',
            },
            {
              from: 'src="/assets',
              to: 'src="../../assets',
            },
            {
              from: 'src="/../assets',
              to: 'src="../../assets',
            }]
        }
    },
    /* end mod */

    htmllint: {
      options: {
        ignore: [
          'Element “img” is missing required attribute “src”.',
          'Attribute “autocomplete” is only allowed when the input type is “color”, “date”, “datetime”, “datetime-local”, “email”, “month”, “number”, “password”, “range”, “search”, “tel”, “text”, “time”, “url”, or “week”.',
          'Attribute “autocomplete” not allowed on element “button” at this point.',
          'Element “div” not allowed as child of element “progress” in this context. (Suppressing further errors from this subtree.)',
          'Consider using the “h1” element as a top-level heading only (all “h1” elements are treated as top-level headings by many screen readers and other tools).',
          'The “datetime” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “color” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “date” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “datetime-local” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “month” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “time” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “week” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'Attribute “integrity” not allowed on element “script” at this point.' // Until https://github.com/jzaefferer/grunt-html/issues/86 gets fixed
        ]
      },
      src: ['_gh_pages/**/*.html', 'js/tests/visual/*.html']
    },

    watch: {
      src: {
        files: '<%= jscs.core.src %>',
        /* boosted mod */
        tasks: ['babel:dev', 'dist-js', 'docs']
        /* end mod */
      },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['dist-css', 'docs']
      },
      docs: {
        /* boosted mod */
        files: ['docs-orange/**/*'],
        tasks: ['dist-css', 'docs']
        /* end mod */
      }
    },

    'saucelabs-qunit': {
      all: {
        options: {
          build: process.env.TRAVIS_JOB_ID,
          concurrency: 10,
          maxRetries: 3,
          maxPollRetries: 4,
          urls: ['http://127.0.0.1:3000/js/tests/index.html?hidepassed'],
          browsers: grunt.file.readYAML('grunt/sauce_browsers.yml')
        }
      }
    },

    exec: {
      npmUpdate: {
        command: 'npm update'
      }
    },

    buildcontrol: {
      options: {
        dir: '_gh_pages',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:twbs/derpstrap.git',
          branch: 'gh-pages'
        }
      }
    },

    compress: {
      main: {
        options: {
          archive: 'boosted-<%= pkg.version %>-dist.zip',
          mode: 'zip',
          level: 9,
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: 'boosted-<%= pkg.version %>-dist'
          }
        ]
      }
    }

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies',
    // Exclude Sass compilers. We choose the one to load later on.
    pattern: ['grunt-*', '!grunt-sass', '!grunt-contrib-sass'] });
  require('time-grunt')(grunt);

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll:docs', 'htmllint']);

  var runSubset = function (subset) {
    return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset;
  };
  var isUndefOrNonZero = function (val) {
    return val === undefined || val !== '0';
  };

  // Test task.
  var testSubtasks = [];
  // Skip core tests if running a different subset of the test suite
  if (runSubset('core') &&
    // Skip core tests if this is a Savage build
    process.env.TRAVIS_REPO_SLUG !== 'twbs-savage/bootstrap') {
    testSubtasks = testSubtasks.concat(['dist-css', 'dist-js', 'test-scss', 'test-js', 'docs']);
  }
  // Skip HTML validation if running a different subset of the test suite
  if (runSubset('validate-html') &&
      isTravis &&
      // Skip HTML5 validator when [skip validator] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_VALIDATOR)) {
    testSubtasks.push('validate-html');
  }
  // Only run Sauce Labs tests if there's a Sauce access key
  if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined' &&
      // Skip Sauce if running a different subset of the test suite
      runSubset('sauce-js-unit') &&
      // Skip Sauce on Travis when [skip sauce] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_SAUCE)) {
    testSubtasks.push('babel:dev');
    testSubtasks.push('connect');
    testSubtasks.push('saucelabs-qunit');
  }
  grunt.registerTask('test', testSubtasks);
  grunt.registerTask('test-js', ['eslint', 'jscs:core', 'jscs:test', 'jscs:grunt', 'qunit']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['babel:dev', 'concat:bootstrap', 'lineremover', 'babel:dist', 'stamp', 'concat:plugins','uglify:core', 'commonjs']);

  grunt.registerTask('test-scss', ['scsslint:core']);

  // CSS distribution task.
  // Supported Compilers: sass (Ruby) and libsass.
  (function (sassCompilerName) {
    require('./grunt/bs-sass-compile/' + sassCompilerName + '.js')(grunt);
  })(process.env.TWBS_SASS || 'libsass');
  // grunt.registerTask('sass-compile', ['sass:core', 'sass:extras', 'sass:docs']);
  grunt.registerTask('sass-compile', ['sass:core', 'copy:tmpdocs', 'sass:docs']);

  grunt.registerTask('dist-css', ['sass-compile', 'postcss:core', 'csscomb:dist', 'concat:fontIcons', 'cssmin:core', 'cssmin:docs']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'clean:tmp', 'dist-css', 'dist-js', 'copy:fonts', 'copy:fontIcons','copy:img']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'test']);

  grunt.registerTask('commonjs', ['babel:umd', 'npm-js']);

  grunt.registerTask('npm-js', 'Generate npm-js entrypoint module in dist dir.', function () {
    var srcFiles = Object.keys(grunt.config.get('babel.umd.files')).map(function (filename) {
      return './' + path.join('umd', path.basename(filename))
    })
    var destFilepath = 'dist/js/npm.js';
    generateCommonJSModule(grunt, srcFiles, destFilepath);
  });

  // Docs task.
  /* boosted mod */
  grunt.registerTask('docs-css', ['sass:docs','postcss:docs', 'postcss:examples', 'csscomb:docs', 'csscomb:examples', 'cssmin:docs']);
  grunt.registerTask('docs-js', ['concat:docsJs', 'uglify:docsJs']);
   /* end mod */
  grunt.registerTask('lint-docs-css', ['scsslint:docs']);
  grunt.registerTask('lint-docs-js', ['jscs:assets']);
  /* boosted mod */
  grunt.registerTask('replace-paths', ['replace:paths1', 'replace:paths2', 'replace:paths3']);
  grunt.registerTask('docs', ['lint-docs-css','docs-css', 'docs-js', 'lint-docs-js', 'clean:docs', 'copy:docs', 'jekyll:docs', 'replace-paths']);
  /* end mod */
  grunt.registerTask('docs-github', ['jekyll:github']);
  grunt.registerTask('prep-release', ['dist', 'docs', 'docs-github', 'compress']);

  // Publish to GitHub
  grunt.registerTask('publish', ['buildcontrol:pages']);

  // Task for updating the cached npm packages used by the Travis build (which are controlled by test-infra/npm-shrinkwrap.json).
  // This task should be run and the updated file should be committed whenever Bootstrap's dependencies change.
  grunt.registerTask('update-shrinkwrap', ['exec:npmUpdate', '_update-shrinkwrap']);
  grunt.registerTask('_update-shrinkwrap', function () {
    var done = this.async();
    npmShrinkwrap({ dev: true, dirname: __dirname }, function (err) {
      if (err) {
        grunt.fail.warn(err);
      }
      var dest = 'grunt/npm-shrinkwrap.json';
      fs.renameSync('npm-shrinkwrap.json', dest);
      grunt.log.writeln('File ' + dest.cyan + ' updated.');
      done();
    });
  });

  /* boosted mod */
  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    grunt.task.run([
      'dist',
      'docs',
      'connect:livereload',
      'watch'
    ]);
  });
  /* end mod */
};
