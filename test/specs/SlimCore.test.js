module('SlimCore');

test('Set default router', function() {
  expect(2);
  equal(SlimCore.setDefaultRouter('/home'), SlimCore);
  equal(SlimCore.defaultRouter, '/home');
});

test('Set hash', function() {
  expect(6);
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
    SlimCore.get('foo/bar', function(params) {
      ok(true);
      equal(params, undefined);
    });
    SlimCore.setHash('foo/bar');
    equal(window.location.hash, '#/foo/bar');
    SlimCore.setHash('foo/foo');
    SlimCore.setHash('foo/foo');
    var action = 'foo/bar/:id';
    var data = 'foo=bar&bar=foo';
    var urlSplit = action.split('?', 2);
    var pathParts = urlSplit[0].split('/', 50);
    var queryParts = data.split('&', 50);
    var params = SlimCore.getParamsFromRouter(action, pathParts, queryParts);
    propEqual(params, {"foo":"bar","bar":"foo","id":":id"});
  })(mock);
});

test('Render view', function() {
  expect(1);
  SlimCore.render('test.twig', {foo: "bar"}, true);
  equal(JSON.stringify(SlimView.data), '{"foo":"bar"}');
});

test('Redirect', function() {
  expect(1);
  var mock = {
    location: {
        hash:"#/foo/bar/1",
        host:"localhost",
        hostname:"localhost",
        href:"http://localhost/#/foo/bar/1",
        origin:"http://localhost",
        pathname:"#/foo/bar/1",
        port:"",
        protocol:"http:",
        search: ""
    }
  };

  (function(window) {
    SlimCore.get('foo/bar/:id', function(params) {
      ok(true);
      equal(params, undefined);
    });
    SlimCore.redirect('foo/bar/:id', {id:1});
    equal(window.location.hash, '#/foo/bar/1');
  })(mock);
});
