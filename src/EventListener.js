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


