/*!
 * Classe App
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 4 */
/* global Core */
// @import "Core.js";
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {App}
   */
  var App = function() {
    return this.__constructor();
  };

  /**
   * Extende o Objeto
   * @type {App}
   */
  App.prototype = Core;
  App.prototype.constructor = App;

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {View}
   */
  App.prototype.__constructor = function() {
    console.log('App:__constructor()');
    return this;
  };

  /**
   * Executa comandos para a api
   * @param  {String} command
   * @return {App}
   */
  App.prototype.api = function(command) {
    console.log('App:api');
    var method,
        url,
        params;
    switch (command) {
      case 'check':
        method = 'OPTIONS';
        url = this.apiUrl();
        break;
      default:
        method = 'OPTIONS';
        url = this.apiUrl();
        break;
    }
    return this.request(method, url, params);
  };

  App.prototype.run = function(callback) {
    console.log('App:run');
    return Config.loadOptions(callback);
  };

  App.prototype.flash = function(text, className, position) {
    console.log('App:flash');
    var el = 'form',
        className = className || 'warn',
        position = position || 'top center';
    $(el).notify(
      text,
      {
        className: className,
        position: position
      }
    );
    return this;
  };

  window.$app = new App();
  return window.$app;

}(window));


