/*!
 * Classe SlimExtensions
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-07-12
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global SlimUrl, Twig  */
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-07-12
   * @return {SlimExtensions}
   */
  var SlimExtensions = function() {
    this.extensions = {
      router: function() {
        var $app = this;
        Twig.extendFunction('route', function(name, params) {
          if ($app.routes.namespaces.hasOwnProperty(name)) {
            var uri = Url.cleanUri($app.routes.namespaces[name].uri);
            var urlSplit = uri.split('?', 2);
            var pathParts = urlSplit[0].split('/', 50);
            var queryParts = urlSplit[1] ? urlSplit[1].split('&', 50) : [];
            var rules = $app.getParamsFromRouter(uri, pathParts, queryParts);
            if (Object.getOwnPropertyNames(rules).length > 0 && Object.getOwnPropertyNames(params).length > 0) {
              $.each(params, function(k, v) {
                if (rules.hasOwnProperty(k)) {
                  uri = uri.replace(new RegExp('('+rules[k]+')', 'g'), v);
                }
              });
            }
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
   * @return {SlimExtensions}
   */
  SlimExtensions.prototype.__constructor = function() {
    console.log('SlimExtensions:__constructor()');
    return this;
  };

  /**
   * Adiciona uma nova extensão ao SlimJs
   * @param {String} name
   * @param {Function} extension
   */
  SlimExtensions.prototype.addExtension = function(name, extension) {
    console.log('SlimExtensions:addExtension()');
    this.extensions[name] = extension;
    return this;
  };

  /**
   * Recupera as extensões do SlimJS
   * @param  {String} name
   * @return {object}
   */
  SlimExtensions.prototype.getExtensions = function(name) {
    console.log('SlimExtensions:getExtensions()');
    return name && this.extensions[name] ? this.extensions[name] : this.extensions;
  };

  /**
   * Executa as extensões
   * @return {void}
   */
  SlimExtensions.prototype.run = function($app) {
    console.log('SlimExtensions:run()');
    var extensions = this.getExtensions(),
        extension;
    for (extension in extensions) {
      if (extensions.hasOwnProperty(extension)) {
        (extensions[extension]).apply($app);
      }
    }
  };

  window.SlimExtensions = new SlimExtensions();
  return window.SlimExtensions;

}(this));


