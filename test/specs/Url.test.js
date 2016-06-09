(function($) {

  module('Url');

  test('Set baseurl', function() {
    var baseurl = 'http://localhost/app';
    expect(1);
    Url.setBase(baseurl);
    equal(baseurl, Url.baseurl);
  });
  
  test('Get basurl', function() {
    var baseurl = 'http://localhost/app';
    expect(2);
    Url.setBase(baseurl);
    equal(baseurl, Url.baseUrl());
    equal(baseurl + '/foo/bar', Url.baseUrl('/foo/bar'));
  });
  
  test('Set apiurl', function() {
    var apiurl = 'http://localhost/api';
    expect(1);
    Url.setApi(apiurl);
    equal(apiurl, Url.apiurl);
  });
  
  test('Get apiurl', function() {
    var apiurl = 'http://localhost/api';
    expect(2);
    Url.setApi(apiurl);
    equal(apiurl, Url.apiUrl());
    equal(apiurl + '/foo/bar', Url.apiUrl('/foo/bar'));
  });
  
  test('Set clean uri', function() {
    expect(5);
    equal(Url.cleanUri('#/foo/bar'), 'foo/bar');
    equal(Url.cleanUri('#/foo/bar/'), 'foo/bar');
    equal(Url.cleanUri('#//foo//bar//'), 'foo/bar');
    equal(Url.cleanUri('#/foo/bar?a=1&b=2'), 'foo/bar?a=1&b=2');
    equal(Url.cleanUri('//foo//bar?a=1&b[]=1&b[]=2'), 'foo/bar?a=1&b[]=1&b[]=2');
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
      Url.redirect = function(url) {
        window.location.href = url;
      };
      Url.redirect('bar/foo');
      equal(window.location.href, 'bar/foo');
    })(mock);
  });
  
  test('Set system', function() {
    expect(1);
    equal(Url.setSystem('app'), Url.system);
  });
  
  test('Ge Segments', function() {
    expect(2);
    Url.setSystem('app');
    Url.pathname = 'app/#/foo/bar';
    equal(Url.segments(0), 'foo');
    equal(Url.segments(1), 'bar');
  });
  
}(jQuery));
