/*!
 * Classe $app
 *
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-04-11
 * Copyright (c) 2016 Ramon Barros
 */
(function ($) {
  'use strict';

  var $app = new Slim();

  /**
   * Hooks Before
   * @param  {String}
   * @return {void}
   */
  $app.hook('before', function() {
    //$app.options.version = '1.0.0';
    console.log('SlimCore:hook.before');
  });

  /**
   * Hooks Before Router
   * @param  {String}
   * @return {void}
   */
  $app.hook('before.router', function() {
    //$app.options.version = '1.0.0';
    console.log('SlimCore:hook.before.router');
    $app.view.setData('logo', $app.baseUrl($app.options.logo));
    $app.options.siteKey = '6LcCOx0TAAAAAJmQ2a04SlFJgFQiqQxasRudhRVH';
  });

  /**
   * Hooks Before Dispatch
   * @param  {String}
   * @return {void}
   */
  $app.hook('before.dispatch', function() {
    console.log('SlimCore:hook.before.dispatch');
    $app.options.dispatch = 1;
  });

  /**
   * Hooks After Dispatch
   * @param  {String}
   * @return {void}
   */
  $app.hook('after.dispatch', function() {
    console.log('SlimCore:hook.after.dispatch');
    $app.view.setData('dispatch', $app.options.dispatch);
    $('title').text('Slim.js ' + $app.options.version);
  });

  /**
   * Hooks After Router
   * @param  {String}
   * @return {void}
   */
  $app.hook('after.router', function() {
    console.log('SlimCore:hook.after.router');
    $app.view.setData('siteKey', $app.options.siteKey);
  });

  /**
   * Hooks After
   * @param  {String}
   * @return {void}
   */
  $app.hook('after', function() {
    console.log('SlimCore:hook.after');
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
  }).name('route.home');

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

  $app.get('user/:id', function(id) {
    console.log(id);
    $app.render('views/login.twig', {
      params: id
    });
  }).name('user.edit');

  $app.get('router/:id/param1/:foo/param2/:bar', function(id, foo, bar) {
    console.log(id);
    $app.render('views/params.twig', {
      id: id,
      foo: foo,
      bar: bar
    });
  }).name('router.params');

  $app.run();

}(jQuery));
