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

    /**
     * Recupera as opções do arquivo config/<env>.json
     * @type {Object}
     */
    $app.options = options;

    /**
     * Hooks
     * @param  {String}
     * @return {void}
     */
    $app.hook('app.before', function() {
      $app.view.setData('logo', $app.baseUrl($app.options.logo));
      $app.view.setData('siteKey', '6LcCOx0TAAAAAJmQ2a04SlFJgFQiqQxasRudhRVH');
    });

    /**
     * Define a rota padrão
     */
    $app.setDefaultRouter('/');

    /**
     * Rota /
     * @param  {String}
     * @return {void}
     */
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
    $app.get('login', function(params) {
      console.log(params);
      $app.render('views/login.twig', {
        params: params
      });
    });

    /**
     * Submit POST
     * @param  {String}
     * @return {void}
     */
    $app.post('login', function(args) {
        alert('post');
        console.log(args);
        console.log('router:'+args.router);
        console.log('method:'+args.method);
        console.log('post:', args.post);
    });

    /**
     * Submit PUT
     * @param  {String}
     * @return {void}
     */
    $app.put('login', function(args) {
      alert('put');
      console.log(args);
      console.log('router:'+args.router);
      console.log('method:'+args.method);
      console.log('put:', args.put);
    });

    /**
     * Submit PATH
     * @param  {String}
     * @return {void}
     */
    $app.patch('login', function() {
      alert('patch');
    });

    /**
     * Submit DELETE
     * @param  {String}
     * @return {void}
     */
    $app.delete('login', function() {
      alert('delete');
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
