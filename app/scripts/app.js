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
      $app.redirect('home');
    });

    /**
     * Página home
     * @param  {string} ) rota
     * @return {function}
     */
    $app.get('home', function() {
      $app.render('views/home.twig', {
        data: [
          {id: 1, name: 'foo'},
          {id: 2, name: 'bar'}
        ]
      });
    });

    /**
     * Formulário de login
     * @param  {string} rota
     * @return {function} callback
     */
    $app.get('login', function() {
      $app.render('views/login.twig', {
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
