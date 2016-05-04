/*!
 * Classe Url
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 4 */
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
        this.host = window.document.location.host;
        this.hostname = window.document.location.hostname;
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
     * Retorna os segmentos da url
     * @author Ramon Barros <contato@ramon-barros.com>
     * @date      2016-04-11
     * @copyright Copyright (c) 2016 Ramon Barros
     * @return    {string}
     */
    Url.prototype.segments = function(key) {
        var pathname = window.document.location.pathname.replace(/(^\/|\/$)/g, ''),
            segments = String(pathname).split('/'),
            app = segments.indexOf(this.system) + 1;
            segments = segments.slice(app, segments.length);
        return typeof key !== undefined ? segments[key] : segments;
    };

    window.Url = new Url();
    return Url;

}(window));
