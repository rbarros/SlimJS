/*!
 * Classe Debug
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-09-16
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
(function (window) {
    'use strict';

    /**
     * Inicia propriedades da classe
     * @author Ramon Barros [contato@ramon-barros.com]
     * @date   2016-09-16
     * @return {Debug}
     */
    var Debug = function() {
        this.console = window.console;
        return this.__constructor();
    };

    /**
     * Construtor da classe
     * @author Ramon Barros [contato@ramon-barros.com]
     * @date   2016-09-16
     * @return {Debug}
     */
    Debug.prototype.__constructor = function() {
        console.log('Debug:__constructor()');
        return this;
    };

    Debug.prototype.caller = function() {
        var name,
            re = /(\w+)@|at (\w+) \(/g,
            st,
            m;
        try {
            throw new Error();
        } catch (e) {
            st = e.stack;
            re.exec(st);
            m = re.exec(st);
            name = m[1] || m[2];
        }
        return name;
    };

    Debug.prototype.assert = function() {
        this.console.assert(Debug.caller(), arguments);
    };

    Debug.prototype.count = function() {
        this.console.count(Debug.caller, arguments);
    };

    Debug.prototype.debug = function() {
        this.console.debug(Debug.caller, arguments);
    };

    Debug.prototype.dir = function() {
        this.console.dir(Debug.caller, arguments);
    };

    Debug.prototype.dirxml = function() {
        this.console.dirxml(Debug.caller, arguments);
    };

    Debug.prototype.error = function() {
        this.console.error(Debug.caller, arguments);
    };

    Debug.prototype.exception = function() {
        this.console.exception(Debug.caller, arguments);
    };

    Debug.prototype.group = function() {
        this.console.group(Debug.caller, arguments);
    };

    Debug.prototype.groupCollapsed = function() {
        this.console.groupCollapsed(Debug.caller, arguments);
    };

    Debug.prototype.groupEnd = function() {
        this.console.groupEnd(Debug.caller, arguments);
    };

    Debug.prototype.info = function() {
        this.console.info(Debug.caller, arguments);
    };

    Debug.prototype.log = function() {
        this.console.log(Debug.caller, arguments);
    };

    Debug.prototype.markTimeline = function() {
        this.console.markTimeline(Debug.caller, arguments);
    };

    Debug.prototype.log = function() {
        this.console.log(Debug.caller, arguments);
    };

    Debug.prototype.warn = function() {
        this.console.warn(Debug.caller, arguments);
    };

    window.Debug = new Debug();
    return Debug;

}(this));
