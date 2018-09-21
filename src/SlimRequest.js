/*!
 * Classe SlimRequest
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-10-13
 * Copyright (c) 2018 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
// @import "SlimCore.js";
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-10-13
   * @return {Slim}
   */
  var SlimRequest = function(settings) {
    var methods = ['get', 'post', 'put', 'delete'],
        defaultSettings = {
          baseUrl: '',
          method: '',
          url: '',
          dataType: 'json',
          success: function() {
          },
          complete: function() {
          }
        };
    this.settings = $.extend({}, defaultSettings, settings);
    return this.__constructor(methods);
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-10-13
   * @return {View}
   */
  SlimRequest.prototype.__constructor = function(methods) {
    console.log('SlimRequest:__constructor()');
    if (this.settings.method && this.settings.url) {
      return this.xhrConnection(
        this.settings.method,
        this.settings.baseUrl + this.settings.url,
        this.settings.data || null,
        this.settings
      );
    }
    var settings = this.settings;
    return methods.reduce(function (acc, method) {
      acc[method] =  function(url, data) {
        return this.xhrConnection(
          method,
          settings.baseUrl + url,
          settings.data || data,
          settings
        );
      };
      return acc;
    }, ());
    /*
    let xmlhttp = null;
    try {
      if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      } else {
        // IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = this.onreadystatechange;
      xmlhttp.open(
        this.settings.method,
        this.settings.url,
        this.settings.async
      );
      xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      if (this.settings.data) {
        xmlhttp.etRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(this.settings.data));
      } else {
        xmlhttp.send();
      }
      if (this.settings.success && typeof this.settings.success === 'function') {
        this.settings.success(xmlhttp.responseText);
      }
    } catch (e) {

    }
    return this;
    */
  };

  SlimRequest.prototype.xhrConnection = function(type, url, data, options) {
    var returnMethods = ['then', 'catch', 'always'],
        promiseMethods = returnMethods.reduce(function (promise, method) {
        promise[method] = function (callback) {
        promise[method] = callback;
          return promise;
        };
      return promise;
    }, {});
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.withCredentials = options.hasOwnProperty('withCredentials');
    this.setHeaders(xhr, options.headers);
    xhr.addEventListener('readystatechange', this.ready(promiseMethods, xhr), false);
    xhr.send(this.objectToQueryString(data));
    promiseMethods.abort = function () {
      return xhr.abort();
    };
    return promiseMethods;
  };

  SlimRequest.prototype.setHeaders = function(xhr, headers) {
    headers = headers || {};
    if (!this.hasContentType(headers)) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    Object.keys(headers).forEach(function (name) {
      if (headers[name]) {
        xhr.setRequestHeader(name, headers[name]);
      }
    });
  };

  SlimRequest.prototype.hasContentType = function(headers) {
    return Object.keys(headers).some(function (name) {
      return name.toLowerCase() === 'content-type';
    });
  };

  SlimRequest.prototype.ready = function(promiseMethods, xhr) {
    return function handleReady () {
      if (xhr.readyState === xhr.DONE) {
        xhr.removeEventListener('readystatechange', handleReady, false);
        promiseMethods.always.apply(promiseMethods, this.parseResponse(xhr));

        if (xhr.status >= 200 && xhr.status < 300) {
          promiseMethods.then.apply(promiseMethods, this.parseResponse(xhr));
        } else {
          promiseMethods.catch.apply(promiseMethods, this.parseResponse(xhr));
        }
      }
    };
  };

  SlimRequest.prototype.parseResponse = function(xhr) {
    var result;
    try {
      result = JSON.parse(xhr.responseText);
    } catch (e) {
      result = xhr.responseText;
    }
    return [ result, xhr ];
  };

  SlimRequest.prototype.objectToQueryString = function(data) {
    return this.isObject(data) ? this.getQueryString(data) : data;
  };

  SlimRequest.prototype.isObject = function(data) {
    return Object.prototype.toString.call(data) === '[object Object]';
  };

  SlimRequest.prototype.getQueryString = function(object) {
    return Object.keys(object).reduce(function (acc, item) {
      var prefix = !acc ? '' : acc + '&';
      return prefix + this.encode(item) + '=' + this.encode(object[item]);
    }, '');
  };

  SlimRequest.prototype.encode = function(value) {
    return encodeURIComponent(value);
  };

  SlimRequest.prototype.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      if (this.settings.dataType === 'json') {
        this.responseText = JSON.parse(this.responseText);
      } else {
        this.responseText = this.responseText;
      }
    }
  };

  window.SlimRequest = SlimRequest;
  return window.SlimRequest;

}(this));
