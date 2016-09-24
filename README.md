# Slim.js

## Slim JS is a frontend library for integration with the famous Slim Framework

[MIT](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)
![JS](https://img.shields.io/badge/language-JS-yellow.svg)
[![Build Status](https://travis-ci.org/rbarros/slim.js.svg?branch=master)](https://travis-ci.org/rbarros/slim.js)
[![Code Climate](https://codeclimate.com/github/rbarros/slim.js/badges/gpa.svg)](https://codeclimate.com/github/rbarros/slim.js)
[![Test Coverage](https://codeclimate.com/github/rbarros/slim.js/badges/coverage.svg)](https://codeclimate.com/github/rbarros/slim.js/coverage)

Slim is a PHP micro-framework that helps you quickly write simple yet powerful web applications and APIs.

## Installation

Download the latest release [here](https://github.com/rbarros/slim.js/archive/master.zip) and use the files within `dist` folder.

via Bower: <br>
`$ bower install rbarros/slim.js` <br>

## Use

```js

(function ($) {
  'use strict';

  $app.run(function(options) {
    /**
     * Recupera as opções do arquivo config/<env>.json
     * @type {Object}
     */
    $app.options = options;

    $app.get('/hello/:name', function(name) {
        $app.render('views/hello.twig', {
            name: name
        });
    });

    /**
     * Carregamento das rotas
     */
    $app.routers();
  });

}(jQuery));
```

## License

The Slim.js is licensed under the MIT license. See [License File](LICENSE) for more information.
