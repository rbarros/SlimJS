(function($) {

  module('SlimUrl');

  test('Set origin', function() {
    expect(1);
    SlimUrl.setOrigin('http://localhost');
    equal('http://localhost', SlimUrl.baseUrl());
  });

  test('Set baseurl', function() {
    expect(1);
    SlimUrl.setBase('/slim.js');
    equal('http://localhost/slim.js', SlimUrl.baseUrl());
  });

  test('Get baseurl', function() {
    expect(1);
    SlimUrl.setBase('/slim.js');
    equal('http://localhost/slim.js/foo/bar', SlimUrl.baseUrl('/foo/bar'));
  });

  test('Set apiurl', function() {
    expect(1);
    SlimUrl.setApi('/slim.js/api');
    equal('http://localhost/slim.js/api', SlimUrl.apiUrl());
  });

  test('Get apiurl', function() {
    expect(1);
    SlimUrl.setApi('/slim.js/api');
    equal('http://localhost/slim.js/api/foo/bar', SlimUrl.apiUrl('/foo/bar'));
  });

  test('Set clean uri', function() {
    expect(5);
    equal(SlimUrl.cleanUri('#/foo/bar'), 'foo/bar');
    equal(SlimUrl.cleanUri('#/foo/bar/'), 'foo/bar');
    equal(SlimUrl.cleanUri('#//foo//bar//'), 'foo/bar');
    equal(SlimUrl.cleanUri('#/foo/bar?a=1&b=2'), 'foo/bar?a=1&b=2');
    equal(SlimUrl.cleanUri('//foo//bar?a=1&b[]=1&b[]=2'), 'foo/bar?a=1&b[]=1&b[]=2');
  });

  test('Redirect', function() {
    expect(1);
    var mock = {
      location: {
          hash:"",
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
      SlimUrl.redirect = function(url) {
        window.location.href = url;
      };
      SlimUrl.redirect('bar/foo');
      equal(window.location.href, 'bar/foo');
    })(mock);
  });

  test('Set system', function() {
    expect(1);
    equal(SlimUrl.setSystem('app'), SlimUrl.system);
  });

  test('Ge Segments', function() {
    expect(2);
    SlimUrl.setSystem('app');
    SlimUrl.pathname = 'app/#/foo/bar';
    equal(SlimUrl.segments(0), 'foo');
    equal(SlimUrl.segments(1), 'bar');
  });

}(jQuery));
