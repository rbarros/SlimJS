/*!
 * Classe Slim
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2018-09-21
 * @version 1.0.3
 * Copyright (c) 2018 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global jQuery, SlimUrl, SlimConfig, SlimCore, SlimExtensions  */
// @import "SlimCore.js";
(function (window, $) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2018-09-21
   * @return {Slim}
   */
  var Slim = function(settings) {
    var defaultSettings = {
      // Application
      // 'mode': 'development',
      // Debugging
      'debug': true,
      // View
      'templates.path': './views',
      // Cookies
      // 'cookies.encrypt': false,
      // 'cookies.lifetime': '20 minutes',
      // 'cookies.path': '/',
      // 'cookies.domain': null,
      // 'cookies.secure': false,
      // 'cookies.httponly': false,
    };
    this.version = '1.0.3';
    this.settings = $.extend({}, defaultSettings, settings);
    return this.__constructor();
  };

  /**
   * Extende o Objeto
   * @type {Slim}
   */
  Slim.prototype = SlimCore;
  Slim.prototype.constructor = Slim;

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2018-09-21
   * @return {View}
   */
  Slim.prototype.__constructor = function() {
    console.log('Slim:__constructor()');
    return this;
  };

  /**
   * Retorna a url base da aplicação
   * @param  {string} url
   * @return {string}
   */
  Slim.prototype.baseUrl = function(url) {
    return SlimUrl.baseUrl(url);
  };

  /**
   * Retorna a url base da api
   * @param  {string} url
   * @return {string}
   */
  Slim.prototype.apiUrl = function(url) {
    return SlimUrl.apiUrl(url);
  };

  /**
   * Executa comandos para a api
   * @param  {String} command
   * @return {Slim}
   */
  Slim.prototype.api = function(command) {
    console.log('Slim:api');
    var method,
        url,
        params;
    switch (command) {
      case 'check':
        method = 'OPTIONS';
        url = SlimUrl.apiUrl();
        break;
      default:
        method = 'OPTIONS';
        url = SlimUrl.apiUrl();
        break;
    }
    return this.request(method, url, params);
  };

  /**
   * Inicia a aplicação
   * @return {void}
   */
  Slim.prototype.run = function() {
    console.log('Slim:run');
    SlimExtensions.run(this);
    var self = this;

    /**
     * Hooks Before
     * @param  {SlimCore}
     * @return {void}
     */
    self.hooks.before.apply(SlimCore);

    SlimConfig.loadOptions(SlimCore, function(options) {
      if (self.settings.debug !== true) {
        delete window.localStorage.debug;
      }

      /**
       * Recupera as opções do arquivo config/<env>.json
       * @type {Object}
       */
      self.options = options;

      /**
       * Hooks Before Router
       * @param  {SlimCore}
       * @return {void}
       */
      self.hooks['before.router'].apply(SlimCore);

      /**
       * Carregamento das rotas
       */
      self.routers();

      /**
       * Hooks After Router
       * @param  {SlimCore}
       * @return {void}
       */
      self.hooks['after.router'].apply(SlimCore);
    });
  };

  Slim.prototype.flash = function(text, className, position) {
    console.log('Slim:flash');
    $('form').notify(
      text,
      {
        className: className || 'warn',
        position: position || 'top center'
      }
    );
    return this;
  };

  window.Slim = Slim;
  return window.Slim;

}(this, jQuery));


