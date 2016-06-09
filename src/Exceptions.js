/*!
 * Classe Exceptions
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
   */
  var Exceptions = function() {
    return this.__constructor();
  };

  /**
   * Construtor da classe
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {Exceptions}
   */
  Exceptions.prototype.__constructor = function() {
    console.log('Exceptions:__constructor()');
    this.ajax();
    return this;
  };

  /**
   * Retorna mensagem correspondente ao status.
   * @param  {Integer} code
   * @return {String}
   */
  Exceptions.prototype.jsonResponse = function(code) {
    var jsonCodes = [];
    jsonCodes[400] = 'Unrecognized command';
    jsonCodes[401] = 'Permission denied';
    jsonCodes[402] = 'Missing argument';
    jsonCodes[401] = 'Incorrect password';
    jsonCodes[404] = 'Page not found';
    jsonCodes[405] = 'Email not validated';
    jsonCodes[408] = 'Token expired';
    jsonCodes[411] = 'Insufficient privileges';
    jsonCodes[500] = 'Internal server error';
    return jsonCodes[code];
  };

  /**
   * Mensagem de retorno do ajax amigável para o usuário
   * @author Ramon Barros [contato@ramon-barros.com]
   * @date   2016-04-11
   * @return {Exceptions}
   */
  Exceptions.prototype.ajax = function() {
    var self = this;
    // Set up a global AJAX error handler to handle the 401
    // unauthorized responses. If a 401 status code comes back,
    // the user is no longer logged-into the system and can not
    // use it properly.
    $.ajaxSetup({
        statusCode: {
            401: function() {
                $.notify('A sessão foi fechada você será redirecionado para a tela de login!', 'warn');
                // Redirec the to the login page.
                setTimeout(function(){
                    window.location.href = window.location.origin;
                }, 5000);
            }
        }
    });
    $( document ).ajaxError(function(event, jqxhr, settings, thrownError) {
      console.log(event, jqxhr, settings, thrownError);
      $.notify('Desculpe, ocorreu um erro inesperado. ['+self.jsonResponse(jqxhr.status)+']', 'error');
    });
    return this;
  };

  window.Exceptions = new Exceptions();
  return Exceptions;

}(this));
