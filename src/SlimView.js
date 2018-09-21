/*!
 * Classe SlimView
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2018-09-21
 * Copyright (c) 2018 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global jQuery, twig */
(function (window, $) {
    'use strict';

    /**
     * Inicia propriedades da classe
     * @author Ramon Barros [contato@ramon-barros.com]
     * @date   2018-09-21
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
     * @date   2018-09-21
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
