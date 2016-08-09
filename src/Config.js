/*!
 * Classe Config
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
/* jslint devel: true, unparam: true, indent: 2 */
/* global Url */
(function (window) {
  'use strict';

  /**
   * Inicia propriedades da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   */
  var Config = function() {
    this.options = null;
    this.env = 'local';
    this.file = null;

    if (Url.host === 'localhost' || /192\.168\.1/.test(Url.host) || /.dev/.test(Url.host)) {
        window.localStorage.debug = true;
    } else {
        delete window.localStorage.debug;
        this.env = 'prod';
    }
    this.setFileOptions();
    return this.__constructor();
  };

  /**
   * Seta o arquivo de configuração da aplicação
   * @author Ramon Barros [contato@ramon-barros.com]
   * @data 2016-05-23
   */
  Config.prototype.setFileOptions = function(file) {
    this.file = file || 'config/' + this.env + '.json';
    return this;
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {Config}
   */
  Config.prototype.__constructor = function() {
    console.log('Config:__constructor()');
    return this;
  };

  /**
   * Carrega as opções da aplicação
   * @return {Config}
   */
  Config.prototype.loadOptions = function(callback) {
    console.log('Config:loadOptions');
    var self = this;
    self.options = self.load('app.options');
    if (!self.options) {
      self.getJsonAsync(self.file).then(function(json) {
        self.options = JSON.parse(json);
        self.save('app.options', self.options, 1200);
        Url.setOrigin(self.options.originUrl);
        Url.setBase(self.options.baseUrl);
        Url.setApi(self.options.apiUrl);
        callback(self.options);
      }).catch(function(error) {
        throw error;
      });
    } else {
      Url.setBase(self.options.baseUrl);
      Url.setApi(self.options.apiUrl);
      callback(self.options);
    }
    return this;
  };

  /**
  * Carrega o arquivo de opções.
  * @param  {Function} callback
  * @return {Config}
  */
  Config.prototype.getJsonAsync = function(url) {
    console.log('Config:getJsonAsync');
    return new Promise(function (resolve, reject) {
      console.log('Config:getJsonAsync() > Promise()');
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
  Config.prototype.save = function(key, jsonData, expirationMS) {
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
  Config.prototype.load = function(key) {
    if (typeof (Storage) === 'undefined') {
      return false;
    }
    var record = JSON.parse(window.localStorage.getItem(key));
    if (!record) {
      return false;
    }
    return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
  };

  window.Config = new Config();
  return Config;

}(this));


