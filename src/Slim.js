/*!
 * Classe Slim
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global Url, Config, Core  */
// @import "Core.js";
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
  Slim.prototype = Core;
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
    return Url.baseUrl(url);
  };

  /**
   * Retorna a url base da api
   * @param  {string} url
   * @return {string}
   */
  Slim.prototype.apiUrl = function(url) {
    return Url.apiUrl(url);
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
        url = Url.apiUrl();
        break;
      default:
        method = 'OPTIONS';
        url = Url.apiUrl();
        break;
    }
    return this.request(method, url, params);
  };

  Slim.prototype.run = function(callback) {
    console.log('Slim:run');
    return Config.loadOptions(callback);
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

  window.$app = new Slim();
  return window.$app;

}(window));


