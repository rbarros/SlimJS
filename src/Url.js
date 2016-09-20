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
