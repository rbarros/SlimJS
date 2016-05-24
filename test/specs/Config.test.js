(function($) {
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

  module('Config');

  test('instance', function() {
    expect(2);
    ok(Config, 'instance');
    equal(Config.options, null);
    Config.setFileOptions('tests/local.json');
    Config.loadOptions(function(options) {
      equal(options, {
        "logo": "images/logo.png",
        "baseUrl": "http://localhost/SlimJS/app/",
        "apiUrl": "http://slimjs.dev/api"
      });
    });
  })
  
}(jQuery));
