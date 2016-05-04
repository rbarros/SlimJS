/*!
 * Classe $app
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
(function ($) {
  'use strict';
  $app.run(function(options) {

    $app.options = options;

    $app.hook('app.before', function() {
      $app.view.setData('logo', $app.baseUrl($app.options.logo));
      $app.view.setData('siteKey', '6LcCOx0TAAAAAJmQ2a04SlFJgFQiqQxasRudhRVH');
    });

    $app.setDefaultRouter('/');

    $app.get('/', function() {
      $app.redirect('login');
    });

    /**
     * Formulário de login
     * @param  {string} ) rota
     * @return {function}
     */
    $app.get('login', function() {
      $app.render('views/signin.twig', {
      });
    });

    // Sistema em manutenção
    // $('body').append('<div class="modal-backdrop fade in white" />');
    // $app.api()
    //     .done(function() {
    //       console.log('ok api');
    //     });

    /**
     * Carregamento das rotas
     */
    $app.routers();
  });
}(jQuery));
