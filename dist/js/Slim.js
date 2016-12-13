/*!
 * Classe Slim
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * @version 1.0.2
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global SlimUrl, SlimConfig, SlimCore, SlimExtensions  */

/*!
 * Classe SlimCore
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global jQuery, FormData, SlimUrl, EventListener, SlimView, SlimRouter */

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
 * Classe SlimDebug
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-09-16
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
(function (window) {

    /**
     * Inicia propriedades da classe
     * @author Ramon Barros [contato@ramon-barros.com]
     * @date   2016-09-16
     * @return {SlimDebug}
     */
    var SlimDebug = function() {
        this.console = window.console;
        return this.__constructor();
    };

    /**
     * Construtor da classe
     * @author Ramon Barros [contato@ramon-barros.com]
     * @date   2016-09-16
     * @return {SlimDebug}
     */
    SlimDebug.prototype.__constructor = function() {
        console.log('SlimDebug:__constructor()');
        return this;
    };

    SlimDebug.prototype.caller = function() {
        var called,
            re = /([^\s]+)/g,
            st,
            m;
        try {
            throw new Error();
        } catch (e) {
            st = e.stack;
            st = st.replace(/(SlimDebug.[^\s]+)/g, '');
            st = st.replace(/(@http[^\s]+)/g, '');
            m = st.match(re);
            called = m.join(' -> ');
        }
        return called;
    };

    SlimDebug.prototype.assert = function(arg) {
        var self = this;
        this.console.assert('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.count = function(arg) {
        var self = this;
        this.console.count('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.debug = function(arg) {
        var self = this;
        this.console.debug('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.dir = function(arg) {
        var self = this;
        this.console.dir('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.dirxml = function(arg) {
        var self = this;
        this.console.dirxml('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.error = function(arg) {
        var self = this;
        this.console.error('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.exception = function(arg) {
        var self = this;
        this.console.exception('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.group = function(arg) {
        var self = this;
        this.console.group('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.groupCollapsed = function(arg) {
        var self = this;
        this.console.groupCollapsed('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.groupEnd = function(arg) {
        var self = this;
        this.console.groupEnd('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.info = function(arg) {
        var self = this;
        this.console.info('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.markTimeline = function(arg) {
        var self = this;
        this.console.markTimeline('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.log = function(arg) {
        var self = this;
        this.console.log('SlimDebug: ' + self.caller(), arg);
    };

    SlimDebug.prototype.warn = function(arg) {
        var self = this;
        this.console.warn('SlimDebug: ' + self.caller(), arg);
    };

    window.SlimDebug = new SlimDebug();
    return SlimDebug;

}(this));



/*!
 * Classe SlimUrl
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
     * @return {SlimUrl}
     */
    var SlimUrl = function() {
        this.system = 'app';
        this.hash = window.document.location.hash;
        this.host = window.document.location.host;
        this.hostname = window.document.location.hostname;
        this.origin = window.document.location.origin;
        this.port = window.document.location.port;
        this.protocol = window.document.location.protocol;
        this.pathname = window.document.location.pathname;
        this.search = window.document.location.search;
        this.baseurl =  '';
        this.apiurl =  '';
        return this.__constructor();
    };

    /**
     * Construtor da classe
     * @author Ramon Barros [contato@ramon-barros.com]
     * @date   2016-04-11
     * @return {SlimUrl}
     */
    SlimUrl.prototype.__constructor = function() {
        console.log('SlimUrl:__constructor()');
        return this;
    };

    /**
     * Seta a origin url
     * @param {string} url string
     */
    SlimUrl.prototype.setOrigin = function(url) {
      this.origin = url || this.origin;
      return this;
    };

    /**
     * Seta a base url
     * @param {string} url string
     */
    SlimUrl.prototype.setBase = function(url) {
      this.baseurl = url;
      return this;
    };

    /**
     * Seta a url da api
     * @param {string} url
     */
    SlimUrl.prototype.setApi = function(url) {
      this.apiurl = url;
      return this;
    };

    /**
     * Limpa url
     * @param  {string} uri
     * @return {string}
     */
    SlimUrl.prototype.cleanUri = function(uri) {
      return uri.replace(/\/+/g, '/') // Remove redundant slashes
                .replace(/^\/|\/($|\?)/, '') // Strip leading and trailing '/' (at end or before query string)
                .replace(/#\/?/, ''); // Strip fragment identifiers
    };

    /**
     * Retorna a url base da aplicação
     * @param  {string} url
     * @return {string}
     */
    SlimUrl.prototype.baseUrl = function(url) {
      return this.origin + this.baseurl + (url || '');
    };

    /**
     * Retorna a url base da api
     * @param  {string} url
     * @return {string}
     */
    SlimUrl.prototype.apiUrl = function(url) {
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
    SlimUrl.prototype.redirect = function(url) {
        window.location.href = url;
    };

    /**
     * Seta pathname da aplicação
     * @param {string} system
     */
    SlimUrl.prototype.setSystem = function(system) {
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
    SlimUrl.prototype.segments = function(key) {
        var pathname = this.cleanUri(this.pathname),
            segments = String(pathname).split('/'),
            app = segments.indexOf(this.system) + 1;
            segments = segments.slice(app, segments.length);
        return typeof key !== undefined ? segments[key] : segments;
    };

    window.SlimUrl = new SlimUrl();
    return SlimUrl;

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
 * Classe SlimExceptions
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
  var SlimExceptions = function() {
    return this.__constructor();
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {SlimExceptions}
   */
  SlimExceptions.prototype.__constructor = function() {
    console.log('SlimExceptions:__constructor()');
    this.ajax();
    return this;
  };

  /**
   * Retorna mensagem correspondente ao status.
   * @param  {Integer} code
   * @return {String}
   */
  SlimExceptions.prototype.jsonResponse = function(code) {
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
   * @return {SlimExceptions}
   */
  SlimExceptions.prototype.ajax = function() {
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

  window.SlimExceptions = new SlimExceptions();
  return SlimExceptions;

}(this));



/*!
 * Classe SlimConfig
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global SlimUrl */
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   */
  var SlimConfig = function() {
    this.options = null;
    this.env = 'local';
    this.file = null;

    if (/localhost/.test(SlimUrl.host) || /192\.168\.1/.test(SlimUrl.host) || /.dev/.test(SlimUrl.host)) {
        window.localStorage.debug = true;
    } else {
        delete window.localStorage.debug;
        this.env = 'prod';
    }
    this.setFileOptions();
    return this.__constructor();
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {SlimConfig}
   */
  SlimConfig.prototype.__constructor = function() {
    console.log('SlimConfig:__constructor()');
    return this;
  };

  /**
   * Seta o arquivo de configuração da aplicação
   * @author Ramon Barros [contato@ramon-barros.com]
   * @data 2016-05-23
   */
  SlimConfig.prototype.setFileOptions = function(file) {
    this.file = file || 'config/' + this.env + '.json';
    return this;
  };

  /**
   * Carrega as opções da aplicação
   * @return {SlimConfig}
   */
  SlimConfig.prototype.loadOptions = function(core, callback) {
    console.log('SlimConfig:loadOptions');
    var self = this;
    self.options = self.load('app.options');
    if (!self.options) {
      self.getJsonAsync(self.file).then(function(json) {
        self.options = JSON.parse(json);
        self.save('app.options', self.options, 1200);
        SlimUrl.setOrigin(self.options.originUrl);
        SlimUrl.setBase(self.options.baseUrl);
        SlimUrl.setApi(self.options.apiUrl);
        callback(self.options);
        /**
         * Hooks After
         * @param  {SlimCore}
         * @return {void}
         */
        core.hooks.after.apply(core);
      }).catch(function(error) {
        throw error;
      });
    } else {
      SlimUrl.setBase(self.options.baseUrl);
      SlimUrl.setApi(self.options.apiUrl);
      callback(self.options);
    }
    return this;
  };

  /**
  * Carrega o arquivo de opções.
  * @param  {Function} callback
  * @return {SlimConfig}
  */
  SlimConfig.prototype.getJsonAsync = function(url) {
    console.log('SlimConfig:getJsonAsync');
    return new Promise(function (resolve, reject) {
      console.log('SlimConfig:getJsonAsync() > Promise()');
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
  SlimConfig.prototype.save = function(key, jsonData, expirationMS) {
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
  SlimConfig.prototype.load = function(key) {
    if (typeof (Storage) === 'undefined') {
      return false;
    }
    var record = JSON.parse(window.localStorage.getItem(key));
    if (!record) {
      return false;
    }
    return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
  };

  window.SlimConfig = new SlimConfig();
  return SlimConfig;

}(this));





/*!
 * Classe SlimView
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
     * @return {SlimView}
     */
    var SlimView = function() {
        this.data = {};
        this.namespaces = {};
        this.hooks = {
          'before.dispatch': function() {
            console.log('SlimCore:hook.before.dispatch');
          },
          'after.dispatch': function() {
            console.log('SlimCore:hook.after.dispatch');
          }
        };
        return this.__constructor();
    };

    /**
     * Construtor da classe
     * @author Ramon Barros [contato@ramon-barros.com]
     * @date   2016-04-11
     * @return {SlimView}
     */
    SlimView.prototype.__constructor = function() {
        console.log('SlimView:__constructor()');
        return this;
    };

    /**
     * Seta a variável que será passada para a view
     * @param {String} key
     * @param {mixed} value
     */
    SlimView.prototype.setData = function(key, value) {
        this.data[key] = value;
        return this;
    };

    /**
     * Seta os hooks para execução antes e depois do render
     * @param {SlimView} hooks
     */
    SlimView.prototype.setHook = function(hooks) {
        this.hooks['before.dispatch'] = hooks['before.dispatch'];
        this.hooks['after.dispatch'] = hooks['after.dispatch'];
        return this;
    };

    /**
     * Compila o twig para html
     * @param  {String} view
     * @param  {Object} data
     * @return {Twig}
     */
    SlimView.prototype.render = function(view, data, outputReturn) {
        var self = this,
            output;
        self.data = $.extend({}, self.data, data);
        try {
            /**
             * Hooks Before Dispatch
             * @param  {SlimCore}
             * @return {void}
             */
            self.hooks['before.dispatch'].apply(self);

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

            /**
             * Hooks After Dispatch
             * @param  {SlimCore}
             * @return {void}
             */
            self.hooks['after.dispatch'].apply(self);

        } catch(e) {
            console.log(e);
        }
        return output;
    };

    window.SlimView = new SlimView();
    return SlimView;

}(this, jQuery));



/*!
 * Classe SlimRouter
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
  var SlimRouter = function() {
    this.routes = [];
    this.mode = null;
    this.root = null;
    return this.__constructor();
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {SlimRouter}
   */
  SlimRouter.prototype.__constructor = function() {
    console.log('SlimRouter:__constructor()');
    this.config({ mode: 'hash'});
    // returning the user to the initial state
    // this.navigate('/sac');
    return this;
  };

  /**
   * Configuração das rotas
   * @param  {Object} options
   * @return {SlimRouter}
   */
  SlimRouter.prototype.config = function(options) {
    this.mode = options && options.mode && options.mode === 'history' && !!(history.pushState) ? 'history' : 'hash';
    this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
    return this;
  };

  SlimRouter.prototype.getFragment = function() {
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

  SlimRouter.prototype.clearSlashes = function(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  };

  SlimRouter.prototype.add = function(re, handler) {
    if(typeof re === 'function') {
      handler = re;
      re = '';
    }
    this.routes.push({ re: re, handler: handler});
    return this;
  };

  SlimRouter.prototype.remove = function(param) {
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

  SlimRouter.prototype.flush = function() {
    this.routes = [];
    this.mode = null;
    this.root = '/';
    return this;
  };

  SlimRouter.prototype.check = function(f) {
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

  SlimRouter.prototype.listen = function() {
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

  SlimRouter.prototype.navigate = function(path) {
    path = path ? path : '';
    if (this.mode === 'history') {
        history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
        window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    }
    return this;
  };

  SlimRouter.prototype.get = function(uri, callback) {
    this.add(uri, callback);
  };

  window.SlimRouter = new SlimRouter();
  return SlimRouter;

}(this));





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
            var uri = SlimUrl.cleanUri($app.routes.namespaces[name].uri);
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

  SlimCore.prototype.hook = function(name, callable) {
    var self = window.SlimCore;
    if (self.hooks.hasOwnProperty(name)) {
      self.hooks[name] = callable;
      //self.hooks['before'].apply(self);
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




(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
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
    this.version = '1.0.2';
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

}(this));


