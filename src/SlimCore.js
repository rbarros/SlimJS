/*!
 * Classe SlimCore
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global jQuery, FormData, SlimUrl, EventListener, SlimView, SlimRouter */
// @import "AndLog.js";
// @import "FormData.js";
// @import "SlimDebug.js";
// @import "SlimUrl.js";
// @import "EventListener.js";
// @import "SlimExceptions.js";
// @import "SlimConfig.js";
// @import "SlimView.js";
// @import "SlimRouter.js";
// @import "SlimExtensions.js";
(function (window, $) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   */
  var SlimCore = function() {
    this.view = null;
    this.router = null;
    this.options = null;
    this.params = [];
    this.routes = {};
    this.routes.get = {};
    this.routes.post = {};
    this.routes.put = {};
    this.routes.patch = {};
    this.routes.delete = {};
    this.routes.namespaces = {};
    this.tmp = {};
    this.hooks = {
      /**
       * Esse hook é chamado antes que o aplicativo Slim seja executado e é invocado uma vez durante o ciclo de vida da aplicação.
       */
      'before': function() {
        console.log('SlimCore:hook.before');
      },
      /**
       * Esse hook é invocado antes do roteador ser disparado e é invocado uma vez durante o ciclo de vida da aplicação.
       */
      'before.router': function() {
        console.log('SlimCore:hook.before.router');
      },
      /**
       * Este hook é invocado antes que a rota correspondente atual seja disparada.
       * Normalmente, este hook é invocado apenas uma vez durante o ciclo de vida da aplicação, no entanto, este hook pode ser invocado várias vezes.
       */
      'before.dispatch': function() {
        console.log('SlimCore:hook.before.dispatch');
      },
      /**
       * Este hook é invocado após a rota correspondente atual ser disparada.
       * Normalmente, este gancho é invocado apenas uma vez durante o ciclo de vida da aplicação, no entanto, este gancho pode ser invocado várias vezes.
       */
      'after.dispatch': function() {
        console.log('SlimCore:hook.after.dispatch');
      },
      /**
       * Este hook é invocado após o roteador ser disparado, antes que a resposta seja enviada para o cliente e é invocado uma vez durante o ciclo de vida da aplicação.
       */
      'after.router': function() {
        console.log('SlimCore:hook.after.router');
      },
      /**
       * Este hook é invocado após a resposta ser enviada para o cliente e é invocado uma vez durante o ciclo de vida da aplicação.
       */
      'after': function() {
        console.log('SlimCore:hook.after');
      }
    };
    return this.__constructor();
  };

   /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {SlimCore}
   */
  SlimCore.prototype.__constructor = function() {
    console.log('SlimCore:__constructor()');
    this.view = SlimView;
    this.router = SlimRouter;
    return this;
  };

  // SlimCore.prototype.run = function(functionName, context /*, args */) {
  //   var args = [].slice.call(arguments).splice(2);
  //   var namespaces = functionName.split('.');
  //   var func = namespaces.pop();
  //   for(var i = 0; i < namespaces.length; i++) {
  //     context = context[namespaces[i]];
  //   }
  //   console.log(context, func, context[func]);
  //   return (context[func]).apply(context, args);
  // };

  SlimCore.prototype.setDefaultRouter = function(uri) {
    this.defaultRouter = uri;
  };

  /**
   * Seta o hash da url
   * @param {string} uri
   * @return {SlimCore}
   */
  SlimCore.prototype.setHash = function(uri) {
    var hash,
        params,
        first,
        sep;
    if (uri === '/') {
      hash = '#/';
    } else {
      uri = SlimUrl.cleanUri(uri);
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
  SlimCore.prototype.routers = function() {
    console.log('SlimCore:routers()');
    var self = this;
    $(document).on('click', '[ui-sref], [sm-ref]', function (e) {
      e.preventDefault();
      var ref = $(this).attr('ui-sref') || $(this).attr('sm-ref');
      console.log('SlimCore:click[ui-sref, sm-ref]['+ref+']');
      self.setHash(ref);
    });
    $(document).on('submit', 'form', function (e) {
      console.log('SlimCore:form.submit');
      e.stopPropagation(); // Stop stuff happening
      e.preventDefault(); // Totally stop stuff happening
      var //elementOrigin = e.originalEvent.currentTarget.activeElement,
          request = ($(this).data('request') || 'enabled') === 'enabled' ? true : false,
          action = $(this).attr('action') || SlimUrl.cleanUri(window.location.hash),
          enctype = $(this).attr('enctype'),
          method = ($(this).find('input[name="_METHOD"]').val() || $(this).attr('method') || 'get').toLowerCase(),
          data = $(this).serialize(); // Serialize the form data
      if (self.routes.hasOwnProperty(method)) {
        if (self.routes[method].hasOwnProperty(action)) {
          self.params = [];
          if (enctype === 'multipart/form-data') {
            data = new FormData(e.target);
          }
          if (request) {
            var urlSplit = action.split('?', 2);
            var pathParts = urlSplit[0].split('/', 50);
            var queryParts = data.split('&', 50);
            var params = self.getParamsFromRouter(action, pathParts, queryParts);
            self.request(method, SlimUrl.apiUrl(action), params).done(self.routes[method][action]);
          } else {
            self.params.push(data);
            (self.routes[method][action]).apply(self, self.params);
          }
        } else {
          throw 'Rota não encontrada ['+method+':'+action+']!';
        }
      } else {
        throw 'Rota não encontrada['+method+':'+action+']!';
      }
    });
    if (window.location.hash.length > 0) {
      var route = SlimUrl.cleanUri(window.location.hash);
      self.setHash(route);
    } else if (this.defaultRouter) {
      self.setHash(this.defaultRouter);
    }
  };

  /**
   * Recupera os parametros para a rota
   * @param  {string} rule
   * @param  {array} pathParts
   * @param  {array} queryParts
   * @return {array}
   */
  SlimCore.prototype.getParamsFromRouter = function(rule, pathParts, queryParts) {
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

  /**
   * Compila a view informada
   * @param  {string} view   arquivo html/twig
   * @param  {array}  data   varriáveis passadas para a view
   * @param  {bolean} output true para retornar a view compilada
   * @return {mixed}         retorna a view
   */
  SlimCore.prototype.render = function(view, data, output) {
    return this.view.setHook(this.hooks).render(SlimUrl.baseUrl(/* this.settings['templates.path'] */view), data, output);
  };

  /**
   * Redirect url
   * @param  {string} uri    url para redirecionamento
   * @param  {array} params parametros
   * @return {void}
   */
  SlimCore.prototype.redirect = function(uri, params) {
    var self = window.SlimCore;
    if (self.routes.get.hasOwnProperty(uri)) {
      self.params = [];
      for (var param in params) {
          self.params.push(params[param]);
      }
      self.setHash(uri);
    }
  };

  /**
   * Altera o hook padrão
   * @param  {string} name
   * @param  {function} callable
   * @return {SlimCore}
   */
  SlimCore.prototype.hook = function(name, callable) {
    var self = window.SlimCore;
    if (self.hooks.hasOwnProperty(name)) {
      self.hooks[name] = callable;
    }
    return this;
  };

  /**
   * Registra as rotas GET
   * @param  {String}   uri
   * @param  {Function} callback
   * @return {void}
   */
  SlimCore.prototype.get = function(uri, callback) {
    this.tmp.method = 'get';
    this.tmp.uri = uri;
    this.routes.get[uri.replace(/^\//, '')] = callback;
    return this;
  };

  /**
   * Registra as rotas POST
   * @param  {String}   uri
   * @param  {Function} callback
   * @return {void}
   */
  SlimCore.prototype.post = function(uri, callback) {
    this.tmp.method = 'post';
    this.tmp.uri = uri;
    this.routes.post[uri.replace(/^\//, '')] = callback;
    return this;
  };

  /**
   * Registra as rotas PUT
   * @param  {String}   uri
   * @param  {Function} callback
   * @return {void}
   */
  SlimCore.prototype.put = function(uri, callback) {
    this.tmp.method = 'put';
    this.tmp.uri = uri;
    this.routes.put[uri.replace(/^\//, '')] = callback;
    return this;
  };

  /**
   * Registra as rotas PATCH
   * @param  {String}   uri
   * @param  {Function} callback
   * @return {void}
   */
  SlimCore.prototype.patch = function(uri, callback) {
    this.tmp.method = 'patch';
    this.tmp.uri = uri;
    this.routes.patch[uri.replace(/^\//, '')] = callback;
    return this;
  };

  /**
   * Registra as rotas DELETE
   * @param  {String}   uri
   * @param  {Function} callback
   * @return {void}
   */
  SlimCore.prototype.delete = function(uri, callback) {
    this.tmp.method = 'delete';
    this.tmp.uri = uri;
    this.routes.delete[uri.replace(/^\//, '')] = callback;
    return this;
  };

  /**
   * Envio do formulário
   * @param  {Object} params
   * @return {void}
   */
  SlimCore.prototype.submit = function(params) {
    this.request('POST', SlimUrl.apiUrl(''), params);
  };

  /**
   * Seta o nome da rota
   * @param  {String} name
   * @return {void}
   */
  SlimCore.prototype.name = function(name) {
    this.routes.namespaces[name] = {
      name: name,
      method: this.tmp.method,
      uri: this.tmp.uri
    };
    this.tmp.method = undefined;
    this.tmp.uri = undefined;
  };

  /**
   * Requisição Ajax para api/interface
   * @param  {String} method
   * @param  {String} url
   * @param  {Object} params
   * @return {void}
   */
  SlimCore.prototype.request = function(method, url, params, async) {
    console.log('SlimCore:request['+method+']['+url+']');
    var jqxhr,
        processData = !(params instanceof FormData), // default: true, application/x-www-form-urlencoded: false (Don't process the files)
        // Set content type to false as jQuery will tell the server its a query string request
        contentType = (params instanceof FormData) ? false : 'application/x-www-form-urlencoded; charset=UTF-8', // files set false or default
        debug = false;
    jqxhr = $.ajax({
      method: method || 'GET',
      url: url || SlimUrl.apiUrl(),
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
  window.SlimCore = new SlimCore();

  EventListener.addEvent(window, 'hashchange', function() {
    var route = window.SlimUrl.cleanUri(window.location.hash),
        urlSplit = route.split('?', 2),
        pathParts = urlSplit[0].split('/', 50),
        queryParts = urlSplit[1] ? urlSplit[1].split('&', 50) : [],
        call;
    if (window.SlimCore.routes.get.hasOwnProperty(route)) {
      (window.SlimCore.routes.get[route]).apply(window.SlimCore, window.SlimCore.params);
    } else {
      call = false;
      $.each(window.SlimCore.routes.get, function(url, handler) {
        var params = window.SlimCore.getParamsFromRouter(url, pathParts, queryParts);
        if (params) {
          // Automatic parameter assignment
          window.SlimCore.params = [];
          for (var param in params) {
              window.SlimCore.params.push(params[param]);
          }
          //handler.call(params);
          call = true;
          handler.apply(window.SlimCore, window.SlimCore.params);
        }
      });
      if (!call) {
        window.location.href = '404.html';
      }
    }
  });

  return SlimCore;

}(this, jQuery));


