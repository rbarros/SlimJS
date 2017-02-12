module('SlimCore');

test('Set default router', function() {
  expect(2);
  equal(SlimCore.setDefaultRouter('/home'), SlimCore);
  equal(SlimCore.defaultRouter, '/home');
});

test('Set hash', function() {
  expect(2);
  var mock = {
    location: {
        hash:"#/",
        host:"localhost",
        hostname:"localhost",
        href:"http://localhost/#/",
        origin:"http://localhost",
        pathname:"#/",
        port:"",
        protocol:"http:",
        search: ""
    }
  };

  (function(window) {
    SlimCore.setHash('/');
    equal(window.location.hash, '#/');
  })(mock);

  var mock = {
    location: {
        hash:"#/foo/bar",
        host:"localhost",
        hostname:"localhost",
        href:"http://localhost/#/foo/bar",
        origin:"http://localhost",
        pathname:"#/foo/bar",
        port:"",
        protocol:"http:",
        search: ""
    }
  };

  (function(window) {
    SlimCore.setHash('/foo/bar');
    equal(window.location.hash, '#/foo/bar');
  })(mock);
});