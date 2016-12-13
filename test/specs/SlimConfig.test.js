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
  expect(3);
  ok(SlimConfig, 'instance');
  equal(SlimConfig.options, null);
  SlimConfig.setFileOptions('local.json');
  equal('local.json', SlimConfig.file);
  SlimConfig.loadOptions(function(options) {
    equal(options, {
      "logo": "images/logo.png",
      "originUrl": null,
      "baseUrl": "/slim.js/app/",
      "apiUrl": "/slim.js/app/api/"
    });
  });
})
