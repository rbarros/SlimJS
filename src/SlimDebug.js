/*!
 * Classe SlimDebug
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-09-16
 * Copyright (c) 2018 Ramon Barros
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
