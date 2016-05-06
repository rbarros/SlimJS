/*!
 * Gruntfile
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
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
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Limpa pastas para começar novamente
    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            '.tmp',
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
        dest: '.tmp',
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
        src: '.tmp/*.js',
        dest: '<%= config.dist %>/js/<%= pkg.name %>.min.js'
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'clean', 'import_js', 'uglify']);
};
