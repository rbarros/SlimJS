/*!
 * Classe Extensions
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-07-12
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global Url, Twig  */
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-07-12
   * @return {Extensions}
   */
  var Extensions = function() {
    this.extensions = {
      router: function() {
        var $app = this;
        Twig.extendFunction('route', function(name) {
          if ($app.routes.namespaces.hasOwnProperty(name)) {
            var uri = Url.cleanUri($app.routes.namespaces[name].uri);
            var hash = '#/' + (uri.length > 0 ? uri : '');
            return hash;
          } else {
            return '#';
          }
        });
      }
    };
    return this.__constructor();
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-07-12
   * @return {Extensions}
   */
  Extensions.prototype.__constructor = function() {
    console.log('Extensions:__constructor()');
    return this;
  };

  /**
   * Adiciona uma nova extensão ao SlimJs
   * @param {String} name
   * @param {Function} extension
   */
  Extensions.prototype.addExtension = function(name, extension) {
    console.log('Extensions:addExtension()');
    this.extensions[name] = extension;
    return this;
  };

  /**
   * Recupera as extensões do SlimJS
   * @param  {String} name
   * @return {object}
   */
  Extensions.prototype.getExtensions = function(name) {
    console.log('Extensions:getExtensions()');
    return name && this.extensions[name] ? this.extensions[name] : this.extensions;
  };

  /**
   * Executa as extensões
   * @return {void}
   */
  Extensions.prototype.run = function($app) {
    console.log('Extensions:run()');
    var extensions = this.getExtensions(),
        extension;
    for (extension in extensions) {
      if (extensions.hasOwnProperty(extension)) {
        (extensions[extension]).apply($app);
      }
    }
  };

  window.SlimExtensions = new Extensions();
  return window.SlimExtensions;

}(this));


