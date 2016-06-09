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
        return output;
    };

    window.View = new View();
    return View;

}(this, jQuery));


