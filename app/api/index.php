<?php
/**
 * This file is part of the Ramon Barros (http://ramon-barros.com)
 *
 * Copyright (c) 2018  Ramon Barros (http://ramon-barros.com)
 *
 * For the full copyright and license information, please view
 * the file license.txt that was distributed with this source code.
 */

/**
 * SlimJS
 * Demo API
 *
 * @package  CMS
 * @author   Ramon Barros <ramon@sagasistemas.com.br>
 */

date_default_timezone_set('America/Sao_Paulo');
session_cache_limiter(false);
session_set_cookie_params(86400);
ini_set('session.gc_maxlifetime', 86400);
session_start();

define('DS', DIRECTORY_SEPARATOR);
define('APP_ROOT', realpath(__DIR__.DS));
define('EXT', '.php');
$time = time();

header('Cache-control: private'); // IE 6 FIX
header('Last-Modified: '.gmdate('D, d M Y H:i:s', $time).'GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *, Cache-Control, Pragma, Origin, Authorization, X-Requested-With, GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *, Content-Type, GET, OPTIONS, X-Token, X-XSRF-TOKEN, X-Requested-With, X-File-Name, X-File-Size, X-File-Last-Modified");

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| This application is installed by the Composer,
| that provides a class loader automatically.
| Use it to seamlessly and feel free to relax.
|
*/
$composer_autoload = APP_ROOT.DS.'vendor'.DS.'autoload.php';
if (!file_exists($composer_autoload)) {
    die('Please use the composer to install http://getcomposer.org');
}
require $composer_autoload;

$app = new \Slim\Slim(array(
    'debug' => true,
    'log.enabled' => true,
    'log.level' =>      \Slim\Log::DEBUG,
));


$app->get('/', function() {
    echo 'Demo API';
});

$app->post('/login', function() use($app) {

    $post = $app->request->post();

    $response = $app->response();
    $body = $response->body();
    $response['Content-Type'] = 'application/json';
    $response->body(json_encode(array(
        'router' => 'login',
        'method' => 'post',
        'post' => $post
    )));
});

$app->put('/login', function() use($app) {

    $put = $app->request->put();
    unset($put['_METHOD']);

    $response = $app->response();
    $body = $response->body();
    $response['Content-Type'] = 'application/json';
    $response->body(json_encode(array(
        'router' => 'login',
        'method' => 'put',
        'put' => $put
    )));
});

$app->run();
