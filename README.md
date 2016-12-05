# Slim.js

## Slim.js is a front-end Framework inspired by the famous Slim Framework

![MIT](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)
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
(function (window) {
  'use strict';

  var $app = new Slim();

  /**
   * Create route hello/:name
   * @param  {string} name
   * @return {void}
   */
  $app.get('/hello/:name', function(name) {
    /**
     * Retrieve options config/<env>.json
     * @type {Object}
     */
    $app.options = options;
    $app.render('views/hello.twig', {
      name: name,
      logo: $app.options.logo
    });
  });
  $app.run();

}(this));
```

## Tests

### Tests coverage
```
$ grunt qunit
```

### Coverage codeclimate
```
$ npm install -g codeclimate-test-reporter
$ npm install grunt-qunit-istanbul
$ CODECLIMATE_REPO_TOKEN=<key> codeclimate-test-reporter < report/lcov.info
```

## License

The Slim.js is licensed under the MIT license. See [License File](LICENSE) for more information.
