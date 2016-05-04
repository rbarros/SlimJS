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
    // Verifica error no código
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= config.app %>/src/{,*/}*.js'
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
        dest: '.tmp/<%= pkg.name %>.min.js'
      }
    },
    // Copia arquivos para outros lugares, para determinadas tarefas possam utilizar.
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          dest: '<%= config.dist %>/styles/',
          src: '{,*/}*.css'
        },
        {
          expand: true,
          cwd: '<%= config.app %>/scripts',
          dest: '<%= config.dist %>/scripts/',
          src: '{,*/}*.js'
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html',
              'views/{,**/}*.{html,twig}',
              'images/{,*/}*.{webp}',
              'styles/fonts/{,*/}*.*'
          ]
        }, {
            expand: true,
            cwd: '<%= config.app %>/images',
            dest: '<%= config.dist %>/images',
            src: ['{,*/}*.{png,jpg,jpeg,gif,webp,svg}']
        }, {
            expand: true,
            cwd: './libs/font-awesome/fonts',
            dest: '<%= config.dist %>/fonts',
            src: ['{,*/}*.{otf,eot,svg,ttf,woff,woff2}']
        }, {
            expand: true,
            cwd: '<%= config.app %>/fonts',
            dest: '<%= config.dist %>/fonts',
            src: ['{,*/}*.{otf,eot,svg,ttf,woff,woff2}']
        },
        {
          expand: true,
          cwd: '.tmp',
          dest: '<%= config.dist %>',
          src: ['{,*/}*.{js,min.js}']
        }]
      },
    },
    // Importa arquivos para o App.js
    import_js: {
      files: {
        expand: true,
        cwd: '<%= config.app %>/src/',
        src: ['**/app.js'],
        dest: '.tmp',
        ext: '.js'
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'import_js', 'copy']);

  grunt.registerTask('build', ['jshint', 'import_js', 'copy', 'uglify']);
};
