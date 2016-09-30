/*!
 * Classe SlimConfig
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global SlimUrl */
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   */
  var SlimConfig = function() {
    this.options = null;
    this.env = 'local';
    this.file = null;

    if (/localhost/.test(SlimUrl.host) || /192\.168\.1/.test(SlimUrl.host) || /.dev/.test(SlimUrl.host)) {
        window.localStorage.debug = true;
    } else {
        delete window.localStorage.debug;
        this.env = 'prod';
    }
    this.setFileOptions();
    return this.__constructor();
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {SlimConfig}
   */
  SlimConfig.prototype.__constructor = function() {
    console.log('SlimConfig:__constructor()');
    return this;
  };

  /**
   * Seta o arquivo de configuração da aplicação
   * @author Ramon Barros [contato@ramon-barros.com]
   * @data 2016-05-23
   */
  SlimConfig.prototype.setFileOptions = function(file) {
    this.file = file || 'config/' + this.env + '.json';
    return this;
  };

  /**
   * Carrega as opções da aplicação
   * @return {SlimConfig}
   */
  SlimConfig.prototype.loadOptions = function(callback) {
    console.log('SlimConfig:loadOptions');
    var self = this;
    self.options = self.load('app.options');
    if (!self.options) {
      self.getJsonAsync(self.file).then(function(json) {
        self.options = JSON.parse(json);
        self.save('app.options', self.options, 1200);
        SlimUrl.setOrigin(self.options.originUrl);
        SlimUrl.setBase(self.options.baseUrl);
        SlimUrl.setApi(self.options.apiUrl);
        callback(self.options);
      }).catch(function(error) {
        throw error;
      });
    } else {
      SlimUrl.setBase(self.options.baseUrl);
      SlimUrl.setApi(self.options.apiUrl);
      callback(self.options);
    }
    return this;
  };

  /**
  * Carrega o arquivo de opções.
  * @param  {Function} callback
  * @return {SlimConfig}
  */
  SlimConfig.prototype.getJsonAsync = function(url) {
    console.log('SlimConfig:getJsonAsync');
    return new Promise(function (resolve, reject) {
      console.log('SlimConfig:getJsonAsync() > Promise()');
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function() {
        if (xhr.status === 200) {
          // We can resolve the promise
          resolve(xhr.response);
        } else {
          // It's a failure, so let's reject the promise
          reject('Unable to load JSON');
        }
      };
      xhr.onerror = function() {
        // It's a failure, so let's reject the promise
        reject('Unable to load JSON');
      };
      xhr.send(true);
    });
  };

  /**
   * Salva as opções da aplicação no localStorage por um determinado tempo
   * https://gist.github.com/porkeypop/1096149
   * @param  {String} key
   * @param  {Object} jsonData
   * @param  {Integer} expirationMS
   * @return {Object}
   */
  SlimConfig.prototype.save = function(key, jsonData, expirationMS) {
    if (typeof (Storage) === 'undefined') {
      return false;
    }
    //var expirationMS = expirationMin * 60 * 1000;
    var record = { value: JSON.stringify(jsonData), timestamp: new Date().getTime() + expirationMS };
    window.localStorage.setItem(key, JSON.stringify(record));
    return jsonData;
  };

  /**
   * Carrega as opções da aplicação
   * @param  {String} key
   * @return {Object}
   */
  SlimConfig.prototype.load = function(key) {
    if (typeof (Storage) === 'undefined') {
      return false;
    }
    var record = JSON.parse(window.localStorage.getItem(key));
    if (!record) {
      return false;
    }
    return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
  };

  window.SlimConfig = new SlimConfig();
  return SlimConfig;

}(this));


