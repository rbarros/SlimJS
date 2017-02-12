/*
  ======== A Handy Little QUnit Reference ========
  http://api.qunitjs.com/

  Test methods:
    module(name, {[setup][ ,teardown]})
    test(name, callback)
    expect(numberOfAssertions)
    stop(increment)
    start(decrement)
  Test assertions:
    ok(value, [message])
    equal(actual, expected, [message])
    notEqual(actual, expected, [message])
    deepEqual(actual, expected, [message])
    notDeepEqual(actual, expected, [message])
    strictEqual(actual, expected, [message])
    notStrictEqual(actual, expected, [message])
    throws(block, [expected], [message])
*/

module('SlimConfig');

test('instance', function() {
  expect(2);
  ok(SlimConfig, 'instance');
  equal(SlimConfig.options, null);
});

test('Set file options', function() {
  expect(1);
  SlimConfig.setFileOptions('local.json');
  equal('local.json', SlimConfig.file);
});

test('Load option localstorage', function() {
  expect(5);
  // Storage Mock
  function storageMock() {
    var storage = {};

    return {
      setItem: function(key, value) {
        storage[key] = value || '';
      },
      getItem: function(key) {
        return key in storage ? storage[key] : null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i) {
        var keys = Object.keys(storage);
        return keys[i] || null;
      }
    };
  };
  // mock the localStorage
  window.localStorage = storageMock();
  // mock the sessionStorage
  window.sessionStorage = storageMock();

  SlimConfig.save('app.options', {
    "logo": "images/logo.png",
    "originUrl": null,
    "baseUrl": "/slim.js/app/",
    "apiUrl": "/slim.js/app/api/"
  }, 1200);
  propEqual(SlimConfig.load('app.options'), {
    "logo": "images/logo.png",
    "originUrl": null,
    "baseUrl": "/slim.js/app/",
    "apiUrl": "/slim.js/app/api/"
  });
  equal(SlimConfig.load('app.foo'), false);
  window.Storage = undefined;
  equal(SlimConfig.save(), false);
  equal(SlimConfig.load(), false);
  stop();
  SlimConfig.setFileOptions('local.json');
  SlimConfig.loadOptions(SlimCore, function(options) {
    propEqual(options, {
      "logo": "images/logo.png",
      "originUrl": null,
      "baseUrl": "/slim.js/app/",
      "apiUrl": "/slim.js/app/api/"
    });
    start();
  });
});