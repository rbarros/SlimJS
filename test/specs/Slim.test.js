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

module('SlimJS', {
  setup: function() {
    this.slim = new Slim();
  }
});

test('instance', function() {
  expect(1);
  ok(this.slim, 'instance');
});

test('Get baseUrl', function() {
  expect(1);
  equal(this.slim.baseUrl('foo/bar'), 'http://localhost/slim.js/app/foo/bar');
});

test('Get apiUrl', function() {
  expect(1);
  equal(this.slim.apiUrl(), 'http://localhost/slim.js/app/api/');
});

// test('Request api', function() {
//   stop();
//   var xhr = this.slim.api('check');
//   xhr.then(function(json) {
//     //console.log(JSON.stringify(json));
//     start();
//   });
// });

// test('Run app', function() {
//   expect(1);
//   this.slim.run();
//   // ok(this.slim, 'instance');
// });