/*!
 * Classe Slim
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global SlimUrl, SlimConfig, SlimCore, SlimExtensions  */
// @import "SlimCore.js";
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {Slim}
   */
  var Slim = function() {
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
   * @date   2016-04-11
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

  Slim.prototype.run = function() {
    console.log('Slim:run');
    SlimExtensions.run(this);
    var self = this;
    SlimConfig.loadOptions(function(options) {
      /**
       * Recupera as opções do arquivo config/<env>.json
       * @type {Object}
       */
      self.options = options;

      /**
       * Hooks Before
       * @param  {SlimCore}
       * @return {void}
       */
      self.hooks['app.before'].apply(SlimCore);

      /**
       * Carregamento das rotas
       */
      self.routers();

      /**
       * Hooks After
       * @param  {SlimCore}
       * @return {void}
       */
      self.hooks['app.after'].apply(SlimCore);
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

}(this));


