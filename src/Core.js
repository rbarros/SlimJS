/*!
 * Classe Core
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global window, jQuery, FormData,Url,EventListener, View, Router */
// @import "AndLog.js";
// @import "FormData.js";
// @import "Url.js";
// @import "EventListener.js";
// @import "Exceptions.js";
// @import "Config.js";
// @import "View.js";
// @import "Router.js";
(function (window, $) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   */
  var Core = function() {
    this.view = null;
    this.router = null;
    this.options = null;
    this.params = [];
    this.routes = {};
    this.routes.get = {};
    this.routes.post = {};
    this.routes.put = {};
    this.hooks = {
      'app.before': function() {
        console.log('Core:hook.before');
      },
      'app.after': function() {
        console.log('Core:hook.after');
      }
    };
    return this.__constructor();
  };

   /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {Core}
   */
  Core.prototype.__constructor = function() {
    console.log('Core:__constructor()');
    this.view = View;
    this.router = Router;
    return this;
  };

  // Core.prototype.run = function(functionName, context /*, args */) {
  //   var args = [].slice.call(arguments).splice(2);
  //   var namespaces = functionName.split('.');
  //   var func = namespaces.pop();
  //   for(var i = 0; i < namespaces.length; i++) {
  //     context = context[namespaces[i]];
  //   }
  //   console.log(context, func, context[func]);
  //   return (context[func]).apply(context, args);
  // };

  Core.prototype.setDefaultRouter = function(uri) {
    this.defaultRouter = uri;
  };

  Core.prototype.setHash = function(uri) {
    var hash,
        params,
        first,
        sep;
    if (uri === '/') {
      hash = '#/';
    } else {
      uri = Url.cleanUri(uri);
      hash = '#/' + (uri.length > 0 ? uri : '');
    }
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else if (this.routes.get.hasOwnProperty(uri)) {
      (this.routes.get[uri]).apply(this, this.params);
    } else {
      hash = hash.replace(/([\?\&]time=[^\&]+)/, '');
      params = hash.split('&');
      hash = params.shift();
      first = params.length > 0 ? '&'+params.join('&') : '';
      hash = hash + first;
      sep = /\?/.test(hash) ? '&' : '?';
      window.location.hash =  hash + (sep + 'time='+(new Date()).getTime());
    }
    return this;
  };

  /**
   * Rotas das aplicação
   * @param  {Object} options
   * @return {void}
   */
  Core.prototype.routers = function() {
    console.log('Core:routers()');
    var self = this;
    $(document).on('click', '[ui-sref]', function (e) {
      e.preventDefault();
      var ref = $(this).attr('ui-sref');
      console.log('Core:click[ui-sref]['+ref+']');
      self.setHash(ref);
    });
    $(document).on('submit', 'form', function (e) {
      console.log('Core:form.submit');
      e.stopPropagation(); // Stop stuff happening
      e.preventDefault(); // Totally stop stuff happening
      var elementOrigin = e.originalEvent.currentTarget.activeElement,
          $btn = $(elementOrigin),
          action = $(this).attr('action'),
          enctype = $(this).attr('enctype'),
          method = ($('input[name=_METHOD]').val() || $('form').attr('method')).toLowerCase(),
          data = $(this).serialize(); // Serialize the form data
      if (self.routes.hasOwnProperty(method)) {
        if (self.routes[method].hasOwnProperty(action)) {
          self.params = [];
          if (enctype === 'multipart/form-data') {
            data = new FormData(e.target);
          }
          self.params.push(data);
          $btn.button('loading');
          (self.routes[method][action]).apply(self, self.params);
          $btn.button('reset');
        } else {
          throw 'Rota não encontrada ['+method+':'+action+']!';
        }
      } else {
        throw 'Rota não encontrada['+method+':'+action+']!';
      }
    });
    if (window.location.hash.length > 0) {
      var route = Url.cleanUri(window.location.hash);
      self.setHash(route);
    } else if (this.defaultRouter) {
      self.setHash(this.defaultRouter);
    }
  };

  Core.prototype.getParamsFromRouter = function(rule, pathParts, queryParts) {
    var params = {},
        missingParams = {},
        parts = rule.split('/', 50);

    // Don't match if fixed rule is longer than path
    if (parts.length < pathParts.length) { return false; }

    // Parse path components
    for (var i = 0; i < parts.length; i++) {
        var rulePart = parts[i];
        var part = pathParts[i];

        if (part !== undefined) {
            // Assign part to named parameter
            if (rulePart.charAt(0) === ':') {
                params[rulePart.substr(1)] = part;
                continue;
            }
            // If explicit parts differ, no match
            else if (rulePart !== part) {
                return false;
            }
        }
        // If no path part and not a named parameter, no match
        else if (rulePart.charAt(0) !== ':') {
            return false;
        }
        else {
            missingParams[rulePart.substr(1)] = true;
        }
    }
    // Parse query strings
    for (var x=0; x<queryParts.length; x++) {
        var nameValue = queryParts[x].split('=', 2);
        var key = nameValue[0];
        // But ignore empty parameters and don't override named parameters
        if (nameValue.length === 2 && !params[key] && !missingParams[key]) {
            params[key] = nameValue[1];
        }
    }

    return params;
  };

  Core.prototype.render = function(view, data, output) {
    return this.view.render(Url.baseUrl(view), data, output);
  };

  Core.prototype.redirect = function(uri, params) {
    var self = window.Core;
    if (self.routes.get.hasOwnProperty(uri)) {
      self.params = [];
      for (var param in params) {
          self.params.push(params[param]);
      }
      self.setHash(uri);
    }
  };

  Core.prototype.hook = function(name, callable) {
    var self = window.Core;
    if (self.hooks.hasOwnProperty(name)) {
      self.hooks[name] = callable;
      self.hooks['app.before'].apply(self);
    }
    return this;
  };

  /**
   * Registra as rotas GET
   * @param  {String}   uri
   * @param  {Function} callback
   * @return {void}
   */
  Core.prototype.get = function(uri, callback) {
    this.routes.get[uri.replace(/^\//, '')] = callback;
  };

  /**
   * Registra as rotas POST
   * @param  {String}   uri
   * @param  {Function} callback
   * @return {void}
   */
  Core.prototype.post = function(uri, callback) {
    this.routes.post[uri.replace(/^\//, '')] = callback;
  };

  /**
   * Registra as rotas PUT
   * @param  {String}   uri
   * @param  {Function} callback
   * @return {void}
   */
  Core.prototype.put = function(uri, callback) {
    this.routes.put[uri.replace(/^\//, '')] = callback;
  };

  /**
   * Envio do formulário
   * @param  {Object} params
   * @return {void}
   */
  Core.prototype.submit = function(params) {
    this.request('POST', Url.apiUrl(''), params);
  };

  /**
   * Requisição Ajax para api/interface
   * @param  {String} method
   * @param  {String} url
   * @param  {Object} params
   * @return {void}
   */
  Core.prototype.request = function(method, url, params, async) {
    console.log('Core:request['+method+']['+url+']');
    var jqxhr,
        processData = !(params instanceof FormData), // default: true, application/x-www-form-urlencoded: false (Don't process the files)
        // Set content type to false as jQuery will tell the server its a query string request
        contentType = (params instanceof FormData) ? false : 'application/x-www-form-urlencoded; charset=UTF-8', // files set false or default
        debug = false;
    jqxhr = $.ajax({
      method: method || 'GET',
      url: url || Url.apiUrl(),
      data: params || {},
      processData: processData,
      contentType: contentType,
      dataType: 'json',
      async: async || true
    })
    .done(function(/* msg */) {
      // console.log(msg);
      if (debug) {
        $.notify('Ok!', 'success');
      }
    })
    .fail(function(/* msg */) {
      // console.log(msg);
      if (debug) {
        $.notify('Error!', 'error');
      }
    })
    .always(function(/* msg */) {
      // console.log(msg);
      if (debug) {
        $.notify('Complete!', 'warn');
      }
    });
    return jqxhr;
  };

  /**
   * Extende o Objeto
   * @type {View}
   */
  window.Core = new Core();

  window.Core.hooks['app.before'].apply(window.Core);
  EventListener.addEvent(window, 'load', function() {
    window.Core.hooks['app.after'].apply(window.Core);
  });
  EventListener.addEvent(window, 'hashchange', function() {
    window.Core.hooks['app.before'].apply(window.Core);
    var route = window.Url.cleanUri(window.location.hash);
    var urlSplit = route.split('?', 2);
    var pathParts = urlSplit[0].split('/', 50);
    var queryParts = urlSplit[1] ? urlSplit[1].split('&', 50) : [];
    if (window.Core.routes.get.hasOwnProperty(route)) {
      (window.Core.routes.get[route]).apply(window.Core, window.Core.params);
    } else {
      var call = false;
      $.each(window.Core.routes.get, function(url, handler) {
        var params = window.Core.getParamsFromRouter(url, pathParts, queryParts);
        if (params) {
          // Automatic parameter assignment
          window.Core.params = [];
          for (var param in params) {
              window.Core.params.push(params[param]);
          }
          //handler.call(params);
          call = true;
          handler.apply(window.Core, window.Core.params);
        }
      });
      if (!call) {
        window.location.href = '404.html';
      }
    }
  });

  return Core;

}(this, jQuery));


