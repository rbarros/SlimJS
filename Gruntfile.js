/*!
 * Gruntfile
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2018-09-21
 * Copyright (c) 2018 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2, camelcase: false */
'use strict';

module.exports = function(grunt) {
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  // Configuração da aplicação
  var appConfig = {
    app: require('./package.json').path || 'app',
    dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({
    config: appConfig,
    pkg: grunt.file.readJSON('package.json'),
    // Banner de identificação dos arquivos.
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.map(pkg.licenses, "type").join(", ") %> */\n',

    // Limpa pastas para começar novamente
    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>'
          ]
        }]
      }
    },

    // Importa arquivos para o App.js
    import_js: {
      files: {
        expand: true,
        cwd: 'src/',
        src: ['**/Slim.js'],
        dest: '<%= config.dist %>/js',
        ext: '.js'
      }
    },

    // Verifica error no código
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'src/{,*/}*.js'
        ]
      }
    },

    // Minifica os arquivos js
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      build: {
        src: '<%= config.dist %>/js/Slim.js',
        dest: '<%= config.dist %>/js/<%= pkg.name %>.min.js'
      }
    },

    // Testes
    qunit: {
      options: {
          '--web-security': 'no',
          coverage: {
            src: [
              //'src/**/*.js'
              'src/Promise.js',
              'src/FormData.js',
              'src/Unserialize.js',
              'src/SlimUrl.js',
              'src/EventListener.js',
              'src/SlimExceptions.js',
              'src/SlimConfig.js',
              'src/SlimView.js',
              'src/SlimRouter.js',
              'src/SlimCore.js',
              'src/Slim.js'
            ],
            instrumentedFiles: 'temp/',
            htmlReport: 'report/coverage',
            coberturaReport: 'report/',
            linesThresholdPct: 85
          }
      },
      all: ['test/**/*.html']
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'clean', 'import_js', 'uglify']);
};
