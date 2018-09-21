/*!
 * Classe SlimRouter
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2018-09-21
 * Copyright (c) 2018 Ramon Barros
 * http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
 */
/* jslint devel: true, unparam: true, indent: 2 */
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2018-09-21
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
   * @date   2018-09-21
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


