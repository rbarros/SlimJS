/*!
 * Classe Debug
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
        var called,
            re = /([^\s]+)/g,
            st,
            m;
        try {
            throw new Error();
        } catch (e) {
            st = e.stack;
            st = st.replace(/(Debug.[^\s]+)/g, '');
            st = st.replace(/(@http[^\s]+)/g, '');
            m = st.match(re);
            called = m.join(' -> ');
        }
        return called;
    };

    Debug.prototype.assert = function(arg) {
        var self = this;
        this.console.assert('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.count = function(arg) {
        var self = this;
        this.console.count('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.debug = function(arg) {
        var self = this;
        this.console.debug('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.dir = function(arg) {
        var self = this;
        this.console.dir('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.dirxml = function(arg) {
        var self = this;
        this.console.dirxml('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.error = function(arg) {
        var self = this;
        this.console.error('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.exception = function(arg) {
        var self = this;
        this.console.exception('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.group = function(arg) {
        var self = this;
        this.console.group('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.groupCollapsed = function(arg) {
        var self = this;
        this.console.groupCollapsed('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.groupEnd = function(arg) {
        var self = this;
        this.console.groupEnd('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.info = function(arg) {
        var self = this;
        this.console.info('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.markTimeline = function(arg) {
        var self = this;
        this.console.markTimeline('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.log = function(arg) {
        var self = this;
        this.console.log('Debug: ' + self.caller(), arg);
    };

    Debug.prototype.warn = function(arg) {
        var self = this;
        this.console.warn('Debug: ' + self.caller(), arg);
    };

    window.Debug = new Debug();
    return Debug;

}(this));
