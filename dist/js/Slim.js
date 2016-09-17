/*!
 * Classe Slim
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global Url, Config, Core, SlimExtensions  */

/*!
 * Classe Core
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global jQuery, FormData,Url,EventListener, View, Router */

// follow @HenrikJoreteg and @andyet if you like this ;)
(function (window) {
    'use strict';
    var inNode = typeof window === 'undefined',
        ls = !inNode && window.localStorage,
        out = {};

    if (inNode) {
        module.exports = console;
        return;
    }

    var andlogKey = ls.andlogKey || 'debug';
    if (ls && ls[andlogKey] && window.console) {
        out = window.console;
    } else {
        var methods = 'assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn'.split(','),
            l = methods.length,
            fn = function () {};

        while (l--) {
            out[methods[l]] = fn;
        }
    }
    if (typeof exports !== 'undefined') {
        module.exports = out;
    } else {
        window.console = out;
    }
}(this));



/**
 * Emulate FormData for some browsers
 * MIT License
 * (c) 2010 François de Metz
 */
/* jslint devel: true, unparam: true, quotmark: double, indent: 2 */
(function(w) {
    "use strict";
    if (w.FormData) {
        return;
    }
    function FormData() {
        this.fake = true;
        this.boundary = "--------FormData" + Math.random();
        this._fields = [];
    }
    FormData.prototype.append = function(key, value) {
        this._fields.push([key, value]);
    };
    FormData.prototype.toString = function() {
        var boundary = this.boundary;
        var body = "";
        this._fields.forEach(function(field) {
            body += "--" + boundary + "\r\n";
            // file upload
            if (field[1].name) {
                var file = field[1];
                body += "Content-Disposition: form-data; name=\""+ field[0] +"\"; filename=\""+ file.name +"\"\r\n";
                body += "Content-Type: "+ file.type +"\r\n\r\n";
                body += file.getAsBinary() + "\r\n";
            } else {
                body += "Content-Disposition: form-data; name=\""+ field[0] +"\";\r\n\r\n";
                body += field[1] + "\r\n";
            }
        });
        body += "--" + boundary +"--";
        return body;
    };
    w.FormData = FormData;
}(this));



/*!
 * Classe Url
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
(function (window) {
    'use strict';

    /**
     * Inicia propriedades da classe
     * @author Ramon Barros [contato@ramon-barros.com]
     * @date   2016-04-11
     * @return {Url}
     */
    var Url = function() {
        this.system = 'app';
        this.protocol = window.document.location.protocol;
        this.host = window.document.location.host;
        this.hostname = window.document.location.hostname;
        this.origin = window.document.location.origin;
        this.port = window.document.location.port;
        this.pathname = window.document.location.pathname;
        this.baseurl =  null;
        this.apiurl =  null;
        return this.__constructor();
    };

    /**
     * Construtor da classe
     * @author Ramon Barros [contato@ramon-barros.com]
     * @date   2016-04-11
     * @return {Url}
     */
    Url.prototype.__constructor = function() {
        console.log('Url:__constructor()');
        return this;
    };

    /**
     * Seta a origin url
     * @param {string} url string
     */
    Url.prototype.setOrigin = function(url) {
      this.origin = url || this.origin;
      return this;
    };

    /**
     * Seta a base url
     * @param {string} url string
     */
    Url.prototype.setBase = function(url) {
      this.baseurl = url;
      return this;
    };

    /**
     * Seta a url da api
     * @param {string} url
     */
    Url.prototype.setApi = function(url) {
      this.apiurl = url;
      return this;
    };

    /**
     * Limpa url
     * @param  {string} uri
     * @return {string}
     */
    Url.prototype.cleanUri = function(uri) {
      return uri.replace(/\/+/g, '/') // Remove redundant slashes
                .replace(/^\/|\/($|\?)/, '') // Strip leading and trailing '/' (at end or before query string)
                .replace(/#\/?/, ''); // Strip fragment identifiers
    };

    /**
     * Retorna a url base da aplicação
     * @param  {string} url
     * @return {string}
     */
    Url.prototype.baseUrl = function(url) {
      return this.origin + this.baseurl + (url || '');
    };

    /**
     * Retorna a url base da api
     * @param  {string} url
     * @return {string}
     */
    Url.prototype.apiUrl = function(url) {
      return this.origin + this.apiurl + (url || '');
    };

    /**
     * Redireciona para a url especificada.
     * @author Ramon Barros <contato@ramon-barros.com>
     * @date      2016-04-11
     * @copyright Copyright (c) 2016 Ramon Barros
     * @param     {string}   url
     * @return    {void}
     */
    Url.prototype.redirect = function(url) {
        window.location.href = url;
    };

    /**
     * Seta pathname da aplicação
     * @param {string} system
     */
    Url.prototype.setSystem = function(system) {
        this.system = system;
        return this.system;
    };

    /**
     * Retorna os segmentos da url
     * @author Ramon Barros <contato@ramon-barros.com>
     * @date      2016-04-11
     * @copyright Copyright (c) 2016 Ramon Barros
     * @return    {string}
     */
    Url.prototype.segments = function(key) {
        var pathname = this.cleanUri(this.pathname),
            segments = String(pathname).split('/'),
            app = segments.indexOf(this.system) + 1;
            segments = segments.slice(app, segments.length);
        return typeof key !== undefined ? segments[key] : segments;
    };

    window.Url = new Url();
    return Url;

}(this));



/*!
 * Classe EventListener
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
(function (window) {
  'use strict';

  /**
  * Inicia propriedades da classe
  * @author Ramon Barros [contato@ramon-barros.com]
  * @date   2016-04-11
  * @return {EventListener}
  */
  var EventListener = function() {
    this.version = '1.0.0';
    return this.__constructor();
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {EventListener}
   */
  EventListener.prototype.__constructor = function() {
    console.log('EventListener:__constructor()');
    this.onhashchange();
    return this;
  };

  EventListener.prototype.onhashchange = function() {
    // exit if the browser implements that event
    if (typeof window.onhashchange === 'object') { return; }

    var location = window.location,
      oldURL = location.href,
      oldHash = location.hash;

    // check the location hash on a 100ms interval
    setInterval(function() {
      var newURL = location.href,
        newHash = location.hash;

      // if the hash has changed and a handler has been bound...
      if (newHash !== oldHash && typeof window.onhashchange === 'function') {
        // execute the handler
        window.onhashchange({
          type: 'hashchange',
          oldURL: oldURL,
          newURL: newURL
        });

        oldURL = newURL;
        oldHash = newHash;
      }
    }, 100);
  };

  /**
   * Monitora eventos
   * <code>
   *   EventListener.addEvent(document.getElementsByTagName('a'), 'click', function () {
   *   });
   * </code>
   * @param {object}   el
   * @param {string}   type
   * @param {Function} fn
   */
  EventListener.prototype.addEvent = function(el, type, fn) {
    var i = 0;
    if (window.document.addEventListener) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (i; i < el.length; i++) {
          window.EventListener.addEvent(el[i], type, fn);
        }
      }
    } else {
      if (el && el.nodeName || el === window) {
        el.document.body.attachEvent('on' + type, function () {
          return fn.call(el, window.event, window.EventListener);
        });
      } else if (el && el.length) {
        for (i; i < el.length; i++) {
          window.EventListener.addEvent(el[i], type, fn);
        }
      }
    }
  };

  window.EventListener = new EventListener();
  return EventListener;

}(this));





/*!
 * Classe Exceptions
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   */
  var Exceptions = function() {
    return this.__constructor();
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {Exceptions}
   */
  Exceptions.prototype.__constructor = function() {
    console.log('Exceptions:__constructor()');
    this.ajax();
    return this;
  };

  /**
   * Retorna mensagem correspondente ao status.
   * @param  {Integer} code
   * @return {String}
   */
  Exceptions.prototype.jsonResponse = function(code) {
    var jsonCodes = [];
    jsonCodes[400] = 'Unrecognized command';
    jsonCodes[401] = 'Permission denied';
    jsonCodes[402] = 'Missing argument';
    jsonCodes[401] = 'Incorrect password';
    jsonCodes[404] = 'Page not found';
    jsonCodes[405] = 'Email not validated';
    jsonCodes[408] = 'Token expired';
    jsonCodes[411] = 'Insufficient privileges';
    jsonCodes[500] = 'Internal server error';
    return jsonCodes[code];
  };

  /**
   * Mensagem de retorno do ajax amigável para o usuário
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {Exceptions}
   */
  Exceptions.prototype.ajax = function() {
    var self = this;
    // Set up a global AJAX error handler to handle the 401
    // unauthorized responses. If a 401 status code comes back,
    // the user is no longer logged-into the system and can not
    // use it properly.
    $.ajaxSetup({
        statusCode: {
            401: function() {
                $.notify('A sessão foi fechada você será redirecionado para a tela de login!', 'warn');
                // Redirec the to the login page.
                setTimeout(function(){
                    window.location.href = window.location.origin;
                }, 5000);
            }
        }
    });
    $( document ).ajaxError(function(event, jqxhr, settings, thrownError) {
      console.log(event, jqxhr, settings, thrownError);
      $.notify('Desculpe, ocorreu um erro inesperado. ['+self.jsonResponse(jqxhr.status)+']', 'error');
    });
    return this;
  };

  window.Exceptions = new Exceptions();
  return Exceptions;

}(this));



/*!
 * Classe Config
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global Url */
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   */
  var Config = function() {
    this.options = null;
    this.env = 'local';
    this.file = null;

    if (/localhost/.test(Url.host) || /192\.168\.1/.test(Url.host) || /.dev/.test(Url.host)) {
        window.localStorage.debug = true;
    } else {
        delete window.localStorage.debug;
        this.env = 'prod';
    }
    this.setFileOptions();
    return this.__constructor();
  };

  /**
   * Seta o arquivo de configuração da aplicação
   * @author Ramon Barros [contato@ramon-barros.com]
   * @data 2016-05-23
   */
  Config.prototype.setFileOptions = function(file) {
    this.file = file || 'config/' + this.env + '.json';
    return this;
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {Config}
   */
  Config.prototype.__constructor = function() {
    console.log('Config:__constructor()');
    return this;
  };

  /**
   * Carrega as opções da aplicação
   * @return {Config}
   */
  Config.prototype.loadOptions = function(callback) {
    console.log('Config:loadOptions');
    var self = this;
    self.options = self.load('app.options');
    if (!self.options) {
      self.getJsonAsync(self.file).then(function(json) {
        self.options = JSON.parse(json);
        self.save('app.options', self.options, 1200);
        Url.setOrigin(self.options.originUrl);
        Url.setBase(self.options.baseUrl);
        Url.setApi(self.options.apiUrl);
        callback(self.options);
      }).catch(function(error) {
        throw error;
      });
    } else {
      Url.setBase(self.options.baseUrl);
      Url.setApi(self.options.apiUrl);
      callback(self.options);
    }
    return this;
  };

  /**
  * Carrega o arquivo de opções.
  * @param  {Function} callback
  * @return {Config}
  */
  Config.prototype.getJsonAsync = function(url) {
    console.log('Config:getJsonAsync');
    return new Promise(function (resolve, reject) {
      console.log('Config:getJsonAsync() > Promise()');
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function() {
        if (xhr.status === 200) {
          // We can resolve the promise
          resolve(xhr.response);
        } else {
          // It's a failure, so let's reject the promise
          reject('Unable to load JSON');
        }
      };
      xhr.onerror = function() {
        // It's a failure, so let's reject the promise
        reject('Unable to load JSON');
      };
      xhr.send(true);
    });
  };

  /**
   * Salva as opções da aplicação no localStorage por um determinado tempo
   * https://gist.github.com/porkeypop/1096149
   * @param  {String} key
   * @param  {Object} jsonData
   * @param  {Integer} expirationMS
   * @return {Object}
   */
  Config.prototype.save = function(key, jsonData, expirationMS) {
    if (typeof (Storage) === 'undefined') {
      return false;
    }
    //var expirationMS = expirationMin * 60 * 1000;
    var record = { value: JSON.stringify(jsonData), timestamp: new Date().getTime() + expirationMS };
    window.localStorage.setItem(key, JSON.stringify(record));
    return jsonData;
  };

  /**
   * Carrega as opções da aplicação
   * @param  {String} key
   * @return {Object}
   */
  Config.prototype.load = function(key) {
    if (typeof (Storage) === 'undefined') {
      return false;
    }
    var record = JSON.parse(window.localStorage.getItem(key));
    if (!record) {
      return false;
    }
    return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
  };

  window.Config = new Config();
  return Config;

}(this));





/*!
 * Classe View
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global jQuery, twig */
(function (window, $) {
    'use strict';

    /**
     * Inicia propriedades da classe
     * @author Ramon Barros [contato@ramon-barros.com]
     * @date   2016-04-11
     * @return {View}
     */
    var View = function() {
        this.data = {};
        this.namespaces = {};
        return this.__constructor();
    };

    /**
     * Construtor da classe
     * @author Ramon Barros [contato@ramon-barros.com]
     * @date   2016-04-11
     * @return {View}
     */
    View.prototype.__constructor = function() {
        console.log('View:__constructor()');
        return this;
    };

    /**
     * Seta a variável que será passada para a view
     * @param {String} key
     * @param {mixed} value
     */
    View.prototype.setData = function(key, value) {
        this.data[key] = value;
        return this;
    };

    /**
     * Compila o twig para html
     * @param  {String} view
     * @param  {Object} data
     * @return {Twig}
     */
    View.prototype.render = function(view, data, outputReturn) {
        var self = this,
            output;
        self.data = $.extend({}, self.data, data);
        try {
            twig({
                href: view,
                async: !outputReturn,
                load: function(template) {
                    output = template.render(self.data);
                    if (!outputReturn) {
                        $('.app').html(output)
                                 .fadeIn();
                    }
                }
            });
        } catch(e) {
            console.log(e);
        }
        return output;
    };

    window.View = new View();
    return View;

}(this, jQuery));



/*!
 * Classe Router
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 * http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
 */
/* jslint devel: true, unparam: true, indent: 2 */
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   */
  var Router = function() {
    this.routes = [];
    this.mode = null;
    this.root = null;
    return this.__constructor();
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {Router}
   */
  Router.prototype.__constructor = function() {
    console.log('Router:__constructor()');
    this.config({ mode: 'hash'});
    // returning the user to the initial state
    // this.navigate('/sac');
    return this;
  };

  /**
   * Configuração das rotas
   * @param  {Object} options
   * @return {Router}
   */
  Router.prototype.config = function(options) {
    this.mode = options && options.mode && options.mode === 'history' && !!(history.pushState) ? 'history' : 'hash';
    this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
    return this;
  };

  Router.prototype.getFragment = function() {
    var fragment = '';
    if(this.mode === 'history') {
        fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
        var match = window.location.href.match(/#\/(.*)$/);
        fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  };

  Router.prototype.clearSlashes = function(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  };

  Router.prototype.add = function(re, handler) {
    if(typeof re === 'function') {
      handler = re;
      re = '';
    }
    this.routes.push({ re: re, handler: handler});
    return this;
  };

  Router.prototype.remove = function(param) {
    var r;
    for (var i=0; i < this.routes.length; i++) {
      r = this.routes[i];
      if (r.handler === param || r.re.toString() === param.toString()) {
        this.routes.splice(i, 1);
        return this;
      }
    }
    return this;
  };

  Router.prototype.flush = function() {
    this.routes = [];
    this.mode = null;
    this.root = '/';
    return this;
  };

  Router.prototype.check = function(f) {
    var fragment = f || this.getFragment();
    for (var i = 0; i < this.routes.length; i++) {
      var match = fragment.match(this.routes[i].re);
      if (match) {
        match.shift();
        this.routes[i].handler.apply({}, match);
        return this;
      }
    }
    return this;
  };

  Router.prototype.listen = function() {
    var self = this;
    var current = self.getFragment();
    var fn = function() {
      if (current !== self.getFragment()) {
        current = self.getFragment();
        self.check(current);
      }
    };
    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
    return this;
  };

  Router.prototype.navigate = function(path) {
    path = path ? path : '';
    if (this.mode === 'history') {
        history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
        window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    }
    return this;
  };

  Router.prototype.get = function(uri, callback) {
    this.add(uri, callback);
  };

  window.Router = new Router();
  return Router;

}(this));





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
    this.routes.patch = {};
    this.routes.delete = {};
    this.routes.namespaces = {};
    this.tmp = {};
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
    $(document).on('click', '[ui-sref], [sm-ref]', function (e) {
      e.preventDefault();
      var ref = $(this).attr('ui-sref') || $(this).attr('sm-ref');
      console.log('Core:click[ui-sref, sm-ref]['+ref+']');
      self.setHash(ref);
    });
    $(document).on('submit', 'form', function (e) {
      console.log('Core:form.submit');
      e.stopPropagation(); // Stop stuff happening
      e.preventDefault(); // Totally stop stuff happening
      var //elementOrigin = e.originalEvent.currentTarget.activeElement,
          request = ($(this).data('request') || 'enabled') === 'enabled' ? true : false,
          action = $(this).attr('action') || Url.cleanUri(window.location.hash),
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
            self.request(method, Url.apiUrl(action), params).done(self.routes[method][action]);
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
  Core.prototype.post = function(uri, callback) {
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
  Core.prototype.put = function(uri, callback) {
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
  Core.prototype.patch = function(uri, callback) {
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
  Core.prototype.delete = function(uri, callback) {
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
  Core.prototype.submit = function(params) {
    this.request('POST', Url.apiUrl(''), params);
  };

  /**
   * Seta o nome da rota
   * @param  {String} name
   * @return {void}
   */
  Core.prototype.name = function(name) {
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
    SlimExtensions.run(this);
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

}(this));


